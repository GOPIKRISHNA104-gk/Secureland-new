import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import AppSidebar from "./AppSidebar";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative w-full overflow-x-hidden">
      {/* High-tech subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-background/80 pointer-events-none z-0" />

      <div className="z-10 flex flex-col w-full h-full">
        <Navbar />
        <div className="flex flex-1 w-full max-w-[1600px] mx-auto">
          <AppSidebar />
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto max-w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
