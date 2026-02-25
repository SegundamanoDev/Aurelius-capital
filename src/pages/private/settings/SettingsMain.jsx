import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  HiOutlineShieldCheck,
  HiOutlineCreditCard,
  HiOutlineUserCircle,
  HiOutlineChevronRight,
} from "react-icons/hi2";

const SettingsMain = () => {
  const location = useLocation();

  const subNav = [
    {
      name: "Security",
      path: "/dashboard/settings",
      icon: <HiOutlineShieldCheck />,
      description: "2FA & Password",
    },
    {
      name: "Financial",
      path: "/dashboard/settings/financial",
      icon: <HiOutlineCreditCard />,
      description: "Wallets & Currency",
    },
    {
      name: "Profile & KYC",
      path: "/dashboard/settings/profile",
      icon: <HiOutlineUserCircle />,
      description: "Identity & Bio",
    },
  ];

  // Helper to check if a route is active
  const isTabActive = (path) => {
    if (path === "/dashboard/settings") {
      return location.pathname === "/dashboard/settings";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* --- HEADER --- */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter dark:text-white text-slate-900">
          Control <span className="text-sky-500">Center</span>
        </h1>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
          Account Configuration & Security Protocol
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- SETTINGS SIDEBAR --- */}
        <aside className="w-full lg:w-72 flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
          {subNav.map((item) => {
            const active = isTabActive(item.path);
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`
                  flex items-center gap-4 px-5 py-4 rounded-[1.5rem] transition-all duration-300 min-w-[200px] lg:min-w-0 border
                  ${
                    active
                      ? "bg-sky-500 text-black border-sky-400 shadow-lg shadow-sky-500/20 scale-[1.02]"
                      : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/5 text-gray-500 hover:border-sky-500/30"
                  }
                `}
              >
                <span
                  className={`text-2xl ${active ? "text-black" : "text-sky-500"}`}
                >
                  {item.icon}
                </span>
                <div className="flex flex-col items-start text-left">
                  <span className="text-[11px] font-black uppercase tracking-wider leading-none">
                    {item.name}
                  </span>
                  <span
                    className={`text-[9px] mt-1 font-medium ${active ? "text-black/60" : "text-gray-400"}`}
                  >
                    {item.description}
                  </span>
                </div>
                {active && (
                  <HiOutlineChevronRight className="ml-auto hidden lg:block" />
                )}
              </NavLink>
            );
          })}
        </aside>

        {/* --- CONTENT WINDOW --- */}
        <div className="flex-1 min-w-0">
          <div className="bg-white dark:bg-[#0A0C10] border border-slate-200 dark:border-white/5 rounded-[2.5rem] shadow-2xl shadow-black/5 overflow-hidden">
            {/* The individual sub-pages (Security, Financial, Profile) inject here */}
            <div className="p-6 md:p-10">
              <Outlet />
            </div>
          </div>

          {/* Footer Note */}
          <p className="mt-6 text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest opacity-50">
            Aurelius Secure Encryption Active // TLS 1.3
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsMain;
