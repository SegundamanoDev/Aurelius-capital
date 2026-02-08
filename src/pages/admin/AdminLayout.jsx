import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  HiOutlineSquares2X2,
  HiOutlineUsers,
  HiOutlineArrowDownLeft,
  HiOutlineArrowUpRight,
  HiOutlineClipboardDocumentList,
  HiBars3,
  HiOutlineChartBarSquare,
  HiOutlineCircleStack, // New Icon for Ledger
} from "react-icons/hi2";
import { HiMenuAlt3 } from "react-icons/hi";

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Admin Console", icon: <HiOutlineSquares2X2 />, path: "/admin" },
    { name: "Manage Users", icon: <HiOutlineUsers />, path: "/admin/users" },
    {
      name: "Financial Ledger",
      icon: <HiOutlineCircleStack />,
      path: "/admin/ledger",
    }, // NEW
    {
      name: "Master Traders",
      icon: <HiOutlineChartBarSquare />,
      path: "/admin/traders",
    },
    {
      name: "Deposit Requests",
      icon: <HiOutlineArrowDownLeft />,
      path: "/admin/deposits",
    },
    {
      name: "Withdrawal Claims",
      icon: <HiOutlineArrowUpRight />,
      path: "/admin/withdrawals",
    },
    {
      name: "Investment Logs",
      icon: <HiOutlineClipboardDocumentList />,
      path: "/admin/investments",
    },
  ];

  return (
    <div className="flex h-screen bg-[#020408] text-white overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-[110] w-64 bg-[#05070A] border-r border-white/5 transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <span className="font-black text-xl tracking-tighter text-sky-500 italic">
            AURELIUS{" "}
            <span className="text-white/20 not-italic font-light">|</span> ADMIN
          </span>
          <button
            className="md:hidden text-gray-400"
            onClick={() => setSidebarOpen(false)}
          >
            <HiBars3 size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-1.5 overflow-y-auto h-[calc(100vh-80px)] scrollbar-hide">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-4 p-3.5 rounded-xl text-[13px] font-bold transition-all ${location.pathname === item.path ? "bg-sky-500 text-black shadow-lg shadow-sky-500/20" : "text-gray-500 hover:bg-white/5 hover:text-gray-300"}`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-20 border-b border-white/5 bg-[#05070A]/50 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 flex items-center justify-between">
          <button
            className="md:hidden p-2.5 bg-white/5 rounded-xl text-sky-500"
            onClick={() => setSidebarOpen(true)}
          >
            <HiMenuAlt3 size={24} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <div className="hidden sm:block text-right">
              <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">
                Node Status
              </p>
              <p className="text-emerald-500 text-[11px] font-bold flex items-center justify-end gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Operational
              </p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-sky-500 to-indigo-600 flex items-center justify-center font-black text-black shadow-lg shadow-sky-500/20">
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-10 scrollbar-hide">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
