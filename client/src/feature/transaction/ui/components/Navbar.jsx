import React from "react";
import { NavLink } from "react-router";
import { LayoutDashboard, Settings, LogOut, Wallet } from "lucide-react";
import { useContext } from "react";
import { useAuth } from "../../../auth/hooks/useAuthHook";
import { MyStore } from "../../../../app/context/MyContext";


const Navbar = () => {
  const { user } = useContext(MyStore);
  const { logout } = useAuth();

  const navClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? "bg-[#101b32] text-white"
        : "text-[#63708a] hover:bg-[#edf1f6] hover:text-[#101b32]"
    }`;

  return (
    <nav className="w-full bg-white border-b border-[#dfe5ed]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-18 min-h-[72px] flex items-center justify-between gap-6">
        
        {/* Logo */}
        <NavLink
          to="/home"
          className="flex items-center gap-2.5 shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-[#101b32] flex items-center justify-center">
            <Wallet size={19} className="text-white" />
          </div>

          <span className="text-xl font-bold tracking-tight">
            FinTrack<span className="text-[#101b32]">Pro</span>
          </span>
        </NavLink>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <NavLink to="/home" className={navClass} end>
            <LayoutDashboard size={17} />
            <span className="hidden sm:block">Dashboard</span>
          </NavLink>

          <NavLink to="/home/profile" className={navClass}>
            <Settings size={17} />
            <span className="hidden sm:block">Settings</span>
          </NavLink>
        </div>

        {/* User + Logout */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-semibold">
              {user?.name || "User"}
            </span>
            <span className="text-xs text-[#8792a8]">
              Personal Account
            </span>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#cbd2dc] text-sm font-medium hover:bg-[#101b32] hover:text-white hover:border-[#101b32] transition"
          >
            <LogOut size={16} />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;