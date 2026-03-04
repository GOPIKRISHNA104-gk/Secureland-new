import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA51_NedComYatnp9kXj_yyam15irSJen4",
    authDomain: "land-748e6.firebaseapp.com",
    projectId: "land-748e6",
    storageBucket: "land-748e6.firebasestorage.app",
    messagingSenderId: "477127955438",
    appId: "1:477127955438:web:a037fad06bf9d32e8ff4ff"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
