import React from "react";
import DashboardSidebar from "@/Components/dashboard/DashboardSidebar";

export default function TrainerDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#090D1A] text-white flex flex-col md:flex-row">
      {/* Reusable Sidebar component dynamically tracks the trainer session */}
     

      {/* Content Injection Main Wrapper */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}