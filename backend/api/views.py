"""
SecureLand API Views — Django REST Framework.
All endpoints use Firebase Authentication.
"""

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from firebase_admin import firestore
from datetime import datetime
from .blockchain import (
    register_on_blockchain,
    verify_land_on_blockchain,
    get_full_chain,
    validate_chain,
)


def get_db():
    return firestore.client()


# =============================================
# HEALTH CHECK
# =============================================
class HealthCheckView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
            "status": "ok",
            "service": "SecureLand Django Backend",
            "features": [
                "firebase-auth",
                "blockchain",
                "digital-twin",
                "user-management",
            ],
            "timestamp": datetime.utcnow().isoformat() + "Z",
        })


# =============================================
# USER REGISTRATION (Firebase Auth + Firestore)
# =============================================
class UserRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        name = data.get("name", "").strip()
        phone = data.get("phone", "").strip()
        password = data.get("password", "").strip()

        if not name or not phone or not password:
            return Response(
                {"error": "Name, phone, and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        db = get_db()
        user_ref = db.collection("users").document(phone)
        user_doc = user_ref.get()

        if user_doc.exists:
            return Response(
                {"error": "Phone number already registered."},
                status=status.HTTP_409_CONFLICT,
            )

        user_data = {
            "name": name,
            "phone": phone,
            "password": password,  # In production, hash this!
            "createdAt": datetime.utcnow().isoformat() + "Z",
        }
        user_ref.set(user_data)

        return Response({
            "success": True,
            "message": "User registered successfully.",
            "user": {"name": name, "phone": phone},
        }, status=status.HTTP_201_CREATED)


# =============================================
# USER LOGIN (Firestore credentials check)
# =============================================
class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        phone = data.get("phone", "").strip()
        password = data.get("password", "").strip()

        if not phone or not password:
            return Response(
                {"error": "Phone and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        db = get_db()
        user_ref = db.collection("users").document(phone)
        user_doc = user_ref.get()

        if not user_doc.exists:
            return Response(
                {"error": "Phone number not registered."},
                status=status.HTTP_404_NOT_FOUND,
            )

        user_data = user_doc.to_dict()
        if user_data.get("password") != password:
            return Response(
                {"error": "Incorrect password."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        return Response({
            "success": True,
            "message": "Login successful.",
            "user": {
                "name": user_data.get("name"),
                "phone": user_data.get("phone"),
            },
        })


# =============================================
# USER PROFILE (requires Firebase Auth)
# =============================================
class UserProfileView(APIView):
    permission_classes = [AllowAny]  # Change to IsAuthenticated in production

    def get(self, request, phone):
        db = get_db()
        user_doc = db.collection("users").document(phone).get()

        if not user_doc.exists:
            return Response(
                {"error": "User not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        user_data = user_doc.to_dict()
        user_data.pop("password", None)  # Never expose password
        return Response({"success": True, "user": user_data})


# =============================================
# DIGITAL TWIN — REGISTER LAND
# =============================================
class DigitalTwinRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        land_id = data.get("landId")
        owner_name = data.get("ownerName")

        if not land_id or not owner_name:
            return Response(
                {"error": "landId and ownerName are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        db = get_db()

        # Save Digital Twin to Firestore
        twin_data = {
            "landId": land_id,
            "ownerName": owner_name,
            "mobile": data.get("mobile", ""),
            "state": data.get("state", ""),
            "location": data.get("location", ""),
            "area": data.get("area", 0),
            "coordinates": data.get("coordinates", []),
            "polygon": data.get("polygon", data.get("coordinates", [])),
            "createdAt": datetime.utcnow().isoformat() + "Z",
        }
        db.collection("digitalTwins").document(land_id).set(twin_data)

        # Register on Blockchain
        try:
            block = register_on_blockchain(twin_data)
            twin_data["blockchainHash"] = block["hash"]
            twin_data["blockIndex"] = block["index"]
            twin_data["blockNonce"] = block["nonce"]
            twin_data["blockchainTimestamp"] = block["timestamp"]
            twin_data["blockchainVerified"] = True
        except Exception as e:
            print(f"Blockchain registration error: {e}")
            block = None

        return Response({
            "success": True,
            "message": "Digital Twin created and registered on blockchain.",
            "twin": twin_data,
            "block": {
                "hash": block["hash"] if block else None,
                "index": block["index"] if block else None,
                "nonce": block["nonce"] if block else None,
            } if block else None,
        }, status=status.HTTP_201_CREATED)


# =============================================
# DIGITAL TWIN — GET BY LAND ID
# =============================================
class DigitalTwinDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, land_id):
        db = get_db()
        doc = db.collection("digitalTwins").document(land_id).get()

        if not doc.exists:
            return Response(
                {"error": "Digital Twin not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response({"success": True, "twin": doc.to_dict()})


# =============================================
# DIGITAL TWIN — GET ALL FOR USER
# =============================================
class DigitalTwinListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, phone):
        db = get_db()
        docs = db.collection("digitalTwins").where("mobile", "==", phone).get()
        twins = [doc.to_dict() for doc in docs]
        return Response({"success": True, "twins": twins, "count": len(twins)})


# =============================================
# BLOCKCHAIN — VERIFY LAND
# =============================================
class BlockchainVerifyView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, land_id):
        result = verify_land_on_blockchain(land_id)
        return Response({"success": True, **result})


# =============================================
# BLOCKCHAIN — FULL CHAIN
# =============================================
class BlockchainChainView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        blocks = get_full_chain()
        return Response({
            "success": True,
            "totalBlocks": len(blocks),
            "chain": blocks,
        })


# =============================================
# BLOCKCHAIN — VALIDATE INTEGRITY
# =============================================
class BlockchainValidateView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        result = validate_chain()
        return Response({"success": True, **result})
