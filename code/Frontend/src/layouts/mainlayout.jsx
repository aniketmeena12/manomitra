import { Outlet } from "react-router-dom";
import Sidebar from "./slider";
import { ImageWithFallback } from "@/components/inputs/imagefallback";
import { DashboardHeader } from "./navbar";

const MainLayout = () => {
  return (
    <div className="relative flex h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1727341746969-ba954b5f572c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTczNDIzNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Calm background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Layout wrapper */}
      <div className="flex flex-col flex-1">
        {/* Header (full width) */}
        <header className="sticky top-0 z-20 w-full shadow-sm">
          <DashboardHeader />
        </header>

        {/* Sidebar + Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          
            <Sidebar />
        

          {/* Content */}
          <main className="flex-1 overflow-auto p-6 relative z-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
