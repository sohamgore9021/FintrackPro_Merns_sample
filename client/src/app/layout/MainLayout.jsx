import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../feature/transaction/ui/components/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#f3f6fa] text-[#101b32]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;