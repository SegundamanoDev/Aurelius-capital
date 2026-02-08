import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineSquares2X2, // Replaces HiOutlineViewGrid
  HiOutlineChartBar,
  HiOutlineWallet, // Now available in hi2
  HiOutlineArrowsRightLeft, // Replaces HiOutlineSwitchHorizontal
  HiOutlineShieldCheck,
  HiOutlineArrowLeftOnRectangle, // Replaces HiOutlineLogout
  HiXMark, // Replaces HiX
} from "react-icons/hi2";
import { RiCopperCoinLine } from "react-icons/ri";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <HiOutlineViewGrid />, path: "/dashboard" },
    { name: "Investments", icon: <HiOutlineChartBar />, path: "/invest" },
    { name: "Wallet", icon: <HiOutlineWallet />, path: "/wallet" },
    {
      name: "Transactions",
      icon: <HiOutlineSwitchHorizontal />,
      path: "/transactions",
    },
    { name: "Security", icon: <HiOutlineShieldCheck />, path: "/security" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-100 lg:hidden transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-72 bg-[#05070A] border-r border-white/5 z-110 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between mb-10">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-sky-500 p-1.5 rounded-lg">
                <RiCopperCoinLine className="text-white text-xl" />
              </div>
              <span className="text-lg font-bold text-white uppercase tracking-wider">
                Aurelius
              </span>
            </Link>
            <button
              className="lg:hidden text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              <HiX size={24} />
            </button>
          </div>

          {/* Balance Widget (Exclusive for Aurelius Capital) */}
          <div className="bg-linear-to-br from-sky-500/10 to-emerald-500/10 border border-white/10 rounded-2xl p-4 mb-8">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
              Total Balance
            </p>
            <h3 className="text-xl font-bold text-white mt-1">$42,650.00</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                +12.5%
              </span>
              <span className="text-[10px] text-gray-500">this month</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span
                    className={`text-xl ${isActive ? "text-white" : "text-gray-500 group-hover:text-sky-400"}`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-white/5">
            <button className="flex items-center gap-4 px-4 py-3 w-full text-gray-400 hover:text-red-400 transition-colors">
              <HiOutlineLogout size={20} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar; // This line fixes your error
