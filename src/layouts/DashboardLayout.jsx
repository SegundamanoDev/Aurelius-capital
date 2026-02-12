import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../features/authSlice";
import {
  HiOutlineHome,
  HiOutlineCreditCard,
  // HiOutlineChartBar,
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineUsers,
  // HiOutlineShieldCheck,
  HiMenuAlt3,
  HiX,
} from "react-icons/hi";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. Pull real user data from Redux
  const { user } = useSelector((state) => state.auth);

  // 2. Helper to get user initials (e.g., "John Doe" -> "JD")
  const getInitials = () => {
    if (!user) return "??";
    return `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase();
  };

  // 3. Handle Logout
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const menuItems = [
    { name: "Overview", icon: <HiOutlineHome />, path: "/dashboard" },
    {
      name: "Deposit",
      icon: <HiOutlineCreditCard />,
      path: "/dashboard/deposit",
    },
    {
      name: "Withdraw",
      icon: <HiOutlineCreditCard />,
      path: "/dashboard/withdraw",
    },
    // {
    //   name: "Pricing",
    //   icon: <HiOutlineCreditCard />,
    //   path: "/dashboard/pricing",
    // },
    // { name: "Trade", icon: <HiOutlineChartBar />, path: "/dashboard/trade" },
    {
      name: "Copy Trading",
      icon: <HiOutlineUsers />,
      path: "/dashboard/copy-trade",
    },
    {
      name: "Transactions",
      icon: <HiOutlineArrowsRightLeft />,
      path: "/dashboard/transactions",
    },
    // {
    //   name: "Upgrade",
    //   icon: <HiOutlineShieldCheck />,
    //   path: "/dashboard/upgrade",
    // },
    { name: "Profile", icon: <HiOutlineUser />, path: "/dashboard/profile" },
  ];

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-[#020408] text-white overflow-hidden relative">
      {/* --- SIDEBAR --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-[100] w-64 bg-[#05070A] border-r border-white/5 transition-transform duration-300 transform md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <h1 className="text-xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
            AURELIUS
          </h1>
          <button className="md:hidden text-gray-400" onClick={toggleSidebar}>
            <HiX size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all font-medium group ${isActive ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" : "text-gray-500 hover:bg-white/5 hover:text-white"}`}
              >
                <span
                  className={`text-xl ${isActive ? "text-sky-400" : "group-hover:text-white"}`}
                >
                  {item.icon}
                </span>
                <span className="text-sm">{item.name}</span>
                {item.name === "Upgrade" && user?.accountType === "vip" && (
                  <span className="ml-auto text-[8px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-black uppercase">
                    VIP
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 text-red-400 hover:bg-red-500/5 rounded-xl transition-all group"
          >
            <HiOutlineLogout
              size={24}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-[#05070A]/50 backdrop-blur-md z-50">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 text-white bg-white/5 rounded-lg border border-white/10"
            >
              <HiMenuAlt3 size={24} />
            </button>
            <h2 className="hidden sm:block text-xs font-black uppercase tracking-[0.2em] text-gray-500">
              Terminal <span className="text-sky-500/50">//</span>{" "}
              {user?.accountType || "User"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden xs:block">
              <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">
                Net Equity
              </p>
              <p className="text-sky-400 font-bold text-sm">
                {user?.currency}
                {(user?.balance || 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-sky-500 to-emerald-500 flex items-center justify-center font-bold text-white shadow-lg shadow-sky-500/20 text-xs">
              {getInitials()}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8 scrollbar-hide">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
