import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../features/authSlice";
import {
  HiOutlineSquares2X2,
  HiOutlineUsers,
  HiOutlineArrowDownLeft,
  HiOutlineArrowUpRight,
  HiOutlineChartBarSquare,
  HiOutlineCircleStack,
  HiOutlinePower,
  HiOutlineArrowsRightLeft,
  HiOutlineShieldCheck,
  HiOutlineSun,
  HiOutlineMoon,
} from "react-icons/hi2";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(
    localStorage.getItem("admin-theme") === "dark",
  );

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  // Toggle Theme Logic
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("admin-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("admin-theme", "light");
    }
  }, [isDark]);

  const initials = user
    ? `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`.toUpperCase()
    : "??";

  const menuItems = [
    { name: "Admin Console", icon: <HiOutlineSquares2X2 />, path: "/admin" },
    {
      name: "Compliance Queue",
      icon: <HiOutlineShieldCheck />,
      path: "/admin/kyc",
    },
    { name: "Manage Users", icon: <HiOutlineUsers />, path: "/admin/users" },
    {
      name: "Financial Ledger",
      icon: <HiOutlineCircleStack />,
      path: "/admin/ledger",
    },
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
      name: "Transactions",
      icon: <HiOutlineArrowsRightLeft />,
      path: "/admin/transactions",
    },
  ];

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#020408] text-slate-900 dark:text-white overflow-hidden font-sans transition-colors duration-300">
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-[110] w-64 bg-white dark:bg-[#05070A] border-r border-slate-200 dark:border-white/5 transition-transform duration-300 md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
          <span className="font-black text-xl tracking-tighter text-sky-600 dark:text-sky-500 italic">
            AURELIUS{" "}
            <span className="text-slate-300 dark:text-white/20 not-italic font-light">
              |
            </span>{" "}
            ADMIN
          </span>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-160px)] scrollbar-hide">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-4 p-3.5 rounded-xl text-[13px] font-bold transition-all ${
                  isActive
                    ? "bg-sky-600 dark:bg-sky-500 text-white dark:text-black shadow-lg shadow-sky-500/20"
                    : "text-slate-500 dark:text-gray-500 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-gray-300"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-slate-100 dark:border-white/5 bg-white dark:bg-[#05070A]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full p-3.5 rounded-xl text-[13px] font-bold text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
          >
            <HiOutlinePower className="text-xl" />
            Terminal Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-20 border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-[#05070A]/50 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 flex items-center justify-between transition-colors">
          <button
            className="md:hidden p-2.5 bg-slate-100 dark:bg-white/5 rounded-xl text-sky-600 dark:text-sky-500"
            onClick={() => setSidebarOpen(true)}
          >
            <HiOutlineMenuAlt3 size={24} />
          </button>

          <div className="flex items-center gap-3 ml-auto">
            {/* THEME TOGGLE BUTTON */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-500 transition-all border border-transparent hover:border-sky-500/30"
            >
              {isDark ? (
                <HiOutlineSun size={20} />
              ) : (
                <HiOutlineMoon size={20} />
              )}
            </button>

            <div className="h-8 w-px bg-slate-200 dark:bg-white/10 mx-1 hidden sm:block" />

            <div className="hidden sm:block text-right">
              <p className="text-[9px] text-slate-400 dark:text-gray-500 font-black uppercase tracking-widest leading-none mb-1">
                Operator
              </p>
              <p className="text-slate-900 dark:text-white text-[11px] font-bold">
                {user ? `${user.firstName} ${user.lastName}` : "Node Auth"}
              </p>
            </div>

            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center font-black text-white dark:text-black shadow-lg shadow-sky-500/20">
              {initials}
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
