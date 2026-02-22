import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../features/authSlice";
import {
  HiOutlineHome,
  HiOutlineCreditCard,
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineUsers,
  HiMenuAlt3,
  HiX,
  HiOutlineSun,
  HiOutlineMoon,
} from "react-icons/hi";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const getInitials = () => {
    if (!user) return "??";
    return `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase();
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  // Toggle Theme Function
  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
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
    { name: "Profile", icon: <HiOutlineUser />, path: "/dashboard/profile" },
  ];

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    /* Changed bg-[#020408] to bg-app-bg and text-white to text-text-main */
    <div className="flex h-screen bg-app-bg text-text-main overflow-hidden relative transition-colors duration-500">
      {/* --- SIDEBAR --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-[100] w-64 bg-card-bg border-r border-app-border transition-transform duration-300 transform md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-app-border">
          <h1 className="text-xl font-bold bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent">
            AURELIUS
          </h1>
          <button className="md:hidden text-gray-500" onClick={toggleSidebar}>
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
                className={`flex items-center gap-4 p-4 rounded-xl transition-all font-medium group ${
                  isActive
                    ? "bg-sky-500/10 text-sky-500 border border-sky-500/20"
                    : "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-text-main"
                }`}
              >
                <span
                  className={`text-xl ${isActive ? "text-sky-500" : "group-hover:text-sky-500"}`}
                >
                  {item.icon}
                </span>
                <span className="text-sm">{item.name}</span>
                {item.name === "Upgrade" && user?.accountType === "vip" && (
                  <span className="ml-auto text-[8px] bg-emerald-500/20 text-emerald-500 px-1.5 py-0.5 rounded font-black uppercase">
                    VIP
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-app-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 text-red-500 hover:bg-red-500/5 rounded-xl transition-all group"
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
        {/* Header updated with Backdrop Blur and Theme Toggle */}
        <header className="h-20 border-b border-app-border flex items-center justify-between px-4 md:px-8 bg-card-bg/50 backdrop-blur-md z-50">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 text-text-main bg-gray-100 dark:bg-white/5 rounded-lg border border-app-border"
            >
              <HiMenuAlt3 size={24} />
            </button>
            <h2 className="hidden sm:block text-xs font-black uppercase tracking-[0.2em] text-gray-500">
              Terminal <span className="text-sky-500/50">//</span>{" "}
              {user?.accountType || "User"}
            </h2>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 border border-app-border text-gray-500 hover:text-sky-500 transition-all"
            >
              {isDark ? (
                <HiOutlineSun size={20} />
              ) : (
                <HiOutlineMoon size={20} />
              )}
            </button>

            <div className="text-right hidden xs:block">
              <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">
                Net Equity
              </p>
              <p className="text-sky-500 font-bold text-sm">
                {user?.currency}{" "}
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

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8 scrollbar-hide bg-app-bg">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
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
