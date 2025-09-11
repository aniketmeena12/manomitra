import { Outlet } from "react-router-dom";
import Sidebar from "./slider";
import { ImageWithFallback } from "@/components/inputs/imagefallback";
import { DashboardHeader } from "./navbar";

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header (full width) */}
      <div className="relative z-20">
        <DashboardHeader />
      </div>

      {/* Background image */}
      <div className="absolute inset-0 opacity-20 -z-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1727341746969-ba954b5f572c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTczNDIzNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Calm lake with mountains and forest"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main content below header */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Page content */}
        <main className="flex-1 p-4 overflow-auto relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
