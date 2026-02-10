import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useGetMyTransactionsQuery } from "../../api/apiSlice";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineWallet,
  HiOutlineClock,
  HiOutlineArrowsRightLeft,
} from "react-icons/hi2";
import MarketTrading from "../../components/MarketSummary";

const DashboardHome = () => {
  const container = useRef();

  // 1. Pull User data from the correct Redux state (auth)
  const { user } = useSelector((state) => state.auth);

  // 2. Fetch real transactions from the API
  const { data: transactionsData, isLoading: txLoading } =
    useGetMyTransactionsQuery();
  const transactions = transactionsData || [];

  // 3. Map real data to stats
  // We use optional chaining (?.) in case data hasn't loaded yet
  const stats = [
    {
      label: "Total Balance",
      value: `$${(user?.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      subText: "Available for trade",
      icon: <HiOutlineWallet className="text-sky-400" size={24} />,
      color: "border-sky-500/20",
      glow: "shadow-sky-500/5",
    },
    {
      label: "Trading Balance",
      value: `$${(user?.tradingBalance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      subText: "Active in Market",
      icon: <HiOutlineArrowTrendingUp className="text-emerald-400" size={24} />,
      color: "border-emerald-500/20",
      glow: "shadow-emerald-500/5",
    },
    {
      label: "Staked Amount",
      value: `$${(user?.stakedAmount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      subText: "Yield Generation",
      icon: <HiOutlineClock className="text-amber-400" size={24} />,
      color: "border-amber-500/20",
      glow: "shadow-amber-500/5",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Executive Terminal
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Real-time market analysis and portfolio performance.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-[#05070A] border border-white/5 px-4 py-2 rounded-xl flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-gray-300 uppercase tracking-tighter">
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
            className={`bg-[#05070A] p-6 rounded-2xl border ${stat.color} ${stat.glow} shadow-xl hover:bg-white/2transition-all group relative overflow-hidden`}
          >
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-[0.2em] font-bold">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-bold mt-3 text-white tracking-tight group-hover:translate-x-1 transition-transform">
                  {stat.value}
                </h3>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                {stat.icon}
              </div>
            </div>
            <p className="text-gray-400 text-xs mt-6 flex items-center gap-2 font-medium">
              <HiOutlineArrowsRightLeft className="text-gray-600" />
              {stat.subText}
            </p>
            {/* Subtle Background Decoration */}
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] text-white rotate-12">
              {React.cloneElement(stat.icon, { size: 100 })}
            </div>
          </div>
        ))}
      </div>

      {/* Main Trading Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* TradingView Integrated Chart */}
        <div className="lg:col-span-3 bg-[#05070A] border border-white/5 rounded-3xl p-1 h-[600px] shadow-2xl overflow-hidden relative group">
          <MarketTrading />
        </div>

        {/* Real-time Activity Feed */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-[#05070A] border border-white/5 rounded-3xl p-6 flex flex-col h-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg">Live Feed</h3>
              <span className="text-[10px] bg-sky-500/10 text-sky-400 px-2 py-1 rounded border border-sky-500/20">
                Syncing
              </span>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-2">
              {transactions.length > 0 ? (
                transactions.slice(0, 5).map(
                  (
                    tx, // Show only last 5
                  ) => (
                    <div
                      key={tx._id}
                      className="flex items-center justify-between group cursor-default"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-10 w-10 rounded-xl flex items-center justify-center border border-white/5 ${
                            tx.type === "deposit" || tx.type === "profit"
                              ? "bg-emerald-500/10 text-emerald-500"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {tx.type === "withdrawal" ? (
                            <HiOutlineWallet size={18} />
                          ) : (
                            <HiOutlineArrowTrendingUp size={18} />
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-white font-semibold group-hover:text-sky-400 transition-colors capitalize">
                            {tx.type}
                          </p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-tighter">
                            {new Date(tx.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-sm font-bold ${tx.type === "deposit" ? "text-emerald-500" : "text-gray-300"}`}
                        >
                          {tx.type === "deposit" ? "+" : "-"}$
                          {tx.amount.toLocaleString()}
                        </p>
                        <p className="text-[9px] text-gray-600 font-bold uppercase">
                          {tx.status}
                        </p>
                      </div>
                    </div>
                  ),
                )
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-20 py-20">
                  <HiOutlineArrowsRightLeft size={48} />
                  <p className="text-xs mt-4">No recent activity</p>
                </div>
              )}
            </div>

            <button className="w-full mt-6 py-4 bg-white/5 hover:bg-sky-500 hover:text-black rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all border border-white/5 shadow-xl">
              Terminal History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
