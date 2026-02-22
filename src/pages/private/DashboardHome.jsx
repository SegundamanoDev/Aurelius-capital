import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  useGetMyProfileQuery,
  useGetMyTransactionsQuery,
} from "../../api/apiSlice";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineWallet,
  HiOutlineClock,
  HiOutlineArrowsRightLeft,
} from "react-icons/hi2";
import MarketTrading from "../../components/MarketSummary";
import { getSymbol } from "../public/Register";

const DashboardHome = () => {
  const { data: freshUser, isLoading: userLoading } = useGetMyProfileQuery();
  const { user: authUser } = useSelector((state) => state.auth);
  const user = freshUser || authUser;
  const currencySymbol = getSymbol(user?.currency);

  const { data: transactionsData } = useGetMyTransactionsQuery();
  const transactions = transactionsData || [];

  if (userLoading) {
    return (
      /* Using bg-app-bg for loading state */
      <div className="h-screen flex items-center justify-center bg-app-bg">
        <div className="text-sky-500 animate-pulse font-black tracking-widest uppercase text-xs">
          Initializing Secure Terminal...
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Balance",
      value: `${currencySymbol}${(user?.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      subText: "Available for trade",
      icon: <HiOutlineWallet className="text-sky-500" size={24} />,
      color: "border-sky-500/20",
      glow: "shadow-sky-500/5",
    },
    {
      label: "Trading Balance",
      value: `${currencySymbol}${(user?.tradingBalance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      subText: "Active in Market",
      icon: <HiOutlineArrowTrendingUp className="text-emerald-500" size={24} />,
      color: "border-emerald-500/20",
      glow: "shadow-emerald-500/5",
    },
    {
      label: "Staked Amount",
      value: `${currencySymbol}${(user?.stakedAmount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      subText: "Yield Generation",
      icon: <HiOutlineClock className="text-amber-500" size={24} />,
      color: "border-amber-500/20",
      glow: "shadow-amber-500/5",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-main tracking-tight">
            Executive Terminal
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Real-time market analysis for{" "}
            <span className="text-sky-500 font-bold">{user?.username}</span>
          </p>
        </div>
        <div className="flex gap-3">
          {/* Market Live Badge */}
          <div className="bg-card-bg border border-app-border px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-tighter">
              Market Live
            </span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-card-bg p-6 rounded-2xl border ${stat.color} ${stat.glow} shadow-xl hover:bg-white/[0.03] dark:hover:bg-white/[0.02] transition-all group relative overflow-hidden`}
          >
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-[0.2em] font-bold">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-bold mt-3 text-text-main tracking-tight group-hover:translate-x-1 transition-transform">
                  {stat.value}
                </h3>
              </div>
              <div className="p-3 bg-gray-100 dark:bg-white/5 rounded-xl border border-app-border">
                {stat.icon}
              </div>
            </div>
            <p className="text-gray-400 text-xs mt-6 flex items-center gap-2 font-medium">
              <HiOutlineArrowsRightLeft className="text-gray-400" />
              {stat.subText}
            </p>
            {/* Background Icon Decoration */}
            <div className="absolute -right-4 -bottom-4 opacity-[0.05] dark:opacity-[0.03] text-text-main rotate-12">
              {React.cloneElement(stat.icon, { size: 100 })}
            </div>
          </div>
        ))}
      </div>

      {/* Main Trading Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 bg-card-bg border border-app-border rounded-3xl p-1 h-[600px] shadow-2xl overflow-hidden relative group">
          <MarketTrading />
        </div>

        {/* Real-time Activity Feed */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-card-bg border border-app-border rounded-3xl p-6 flex flex-col h-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-text-main font-bold text-lg">Live Feed</h3>
              <span className="text-[10px] bg-sky-500/10 text-sky-500 px-2 py-1 rounded border border-sky-500/20">
                Syncing
              </span>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-2">
              {transactions.length > 0 ? (
                transactions.slice(0, 5).map((tx) => (
                  <div
                    key={tx._id}
                    className="flex items-center justify-between group cursor-default"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-xl flex items-center justify-center border border-app-border ${
                          tx.type === "deposit" ||
                          tx.type === "profit" ||
                          tx.type === "trading_yield"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {tx.type === "withdrawal" ? (
                          <HiOutlineWallet size={18} />
                        ) : (
                          <HiOutlineArrowTrendingUp size={18} />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-text-main font-semibold group-hover:text-sky-500 transition-colors capitalize">
                          {tx.type.replace("_", " ")}
                        </p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-tighter">
                          {new Date(tx.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-bold ${
                          tx.type === "deposit" || tx.type === "profit"
                            ? "text-emerald-500"
                            : "text-text-main"
                        }`}
                      >
                        {tx.type === "deposit" || tx.type === "profit"
                          ? "+"
                          : "-"}
                        {currencySymbol}
                        {tx.amount.toLocaleString()}
                      </p>
                      <p className="text-[9px] text-gray-500 font-bold uppercase">
                        {tx.status}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-20 py-20 text-text-main">
                  <HiOutlineArrowsRightLeft size={48} />
                  <p className="text-xs mt-4">No recent activity</p>
                </div>
              )}
            </div>

            <button className="w-full mt-6 py-4 bg-gray-100 dark:bg-white/5 hover:bg-sky-500 hover:text-white dark:hover:text-black rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all border border-app-border shadow-xl text-text-main">
              Terminal History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
