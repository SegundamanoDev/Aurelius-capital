import React from "react";
import { useSelector } from "react-redux";
import {
  useGetMyProfileQuery,
  useGetMyTransactionsQuery,
  useGetMyWalletQuery,
  useGetMyCopiesQuery,
} from "../../api/apiSlice";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineWallet,
  HiOutlineArrowsRightLeft,
  HiOutlineLockClosed,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { getSymbol } from "../public/Register";

const DashboardHome = () => {
  // 1. Fetching live data from all streams
  const { data: freshUser, isLoading: userLoading } = useGetMyProfileQuery();
  const { data: walletData, isLoading: walletLoading } = useGetMyWalletQuery();
  const { data: transactionsData } = useGetMyTransactionsQuery();
  const { data: copiesData } = useGetMyCopiesQuery();

  const { user: authUser } = useSelector((state) => state.auth);

  // Data Normalization
  const user = freshUser || authUser;
  const wallet = walletData?.wallet || {};
  const transactions = transactionsData || [];
  const activeCopies = copiesData?.data || [];

  // --- CURRENCY LOGIC: Priority is Wallet -> Fresh User -> Auth Fallback ---
  const liveCurrency = wallet?.currency || user?.currency || "USD";
  const currencySymbol = getSymbol(liveCurrency);

  // 2. Formatting Stats for the Wallet Engine
  const stats = [
    {
      label: "Total Equity",
      value: `${currencySymbol}${(wallet?.totalBalance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      subText: `Total Account Value (${liveCurrency})`,
      icon: <HiOutlineWallet className="text-sky-500" size={24} />,
      color: "border-sky-500/20",
      glow: "shadow-sky-500/5",
    },
    {
      label: "Available Cash",
      value: `${currencySymbol}${(wallet?.freeBalance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      subText: "Ready to invest/withdraw",
      icon: <HiOutlineArrowsRightLeft className="text-emerald-500" size={24} />,
      color: "border-emerald-500/20",
      glow: "shadow-emerald-500/5",
    },
    {
      label: "Allocated Capital",
      value: `${currencySymbol}${(wallet?.allocatedBalance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      subText: "Currently following traders",
      icon: <HiOutlineLockClosed className="text-amber-500" size={24} />,
      color: "border-amber-500/20",
      glow: "shadow-amber-500/5",
    },
  ];

  if (userLoading || walletLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-app-bg">
        <div className="text-sky-500 animate-pulse font-black tracking-widest uppercase text-xs">
          Synchronizing Ledger Data...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1600px] mx-auto">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-main tracking-tight">
            Executive Terminal
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Real-time tracking for{" "}
            <span className="text-sky-500 font-bold">{user?.username}</span>
          </p>
        </div>
        <div className="bg-card-bg border border-app-border px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm self-start">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">
            Live Node Active •{" "}
            <span className="text-sky-500">{liveCurrency}</span>
          </span>
        </div>
      </div>

      {/* --- WALLET STATS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-card-bg p-6 rounded-2xl border ${stat.color} ${stat.glow} shadow-xl relative overflow-hidden group`}
          >
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-bold mt-2 text-text-main tracking-tight">
                  {stat.value}
                </h3>
              </div>
              <div className="p-3 bg-gray-100 dark:bg-white/5 rounded-xl border border-app-border">
                {stat.icon}
              </div>
            </div>
            <p className="text-gray-400 text-[10px] mt-6 flex items-center gap-2 font-medium italic">
              {stat.subText}
            </p>
          </div>
        ))}
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: Copy Portfolio (Active Traders) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-card-bg border border-app-border rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-text-main font-bold text-lg flex items-center gap-2">
                <HiOutlineChartBar className="text-sky-500" /> Active Copying
                Portfolio
              </h3>
              <span className="text-[10px] bg-sky-500/10 text-sky-500 px-3 py-1 rounded-full border border-sky-500/20 font-bold uppercase">
                {activeCopies.length} Active
              </span>
            </div>

            <div className="overflow-x-auto">
              {activeCopies.length > 0 ? (
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-500 text-[10px] uppercase tracking-wider border-b border-app-border">
                      <th className="pb-4">Trader</th>
                      <th className="pb-4">Allocated</th>
                      <th className="pb-4">Remaining</th>
                      <th className="pb-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-app-border">
                    {activeCopies.map((copy) => (
                      <tr
                        key={copy._id}
                        className="group hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={copy.trader?.profileImage || "/avatar.png"}
                              alt="trader"
                              className="w-8 h-8 rounded-full border border-app-border"
                            />
                            <span className="text-sm font-bold text-text-main">
                              {copy.trader?.username}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 text-sm font-medium text-text-main">
                          {currencySymbol}
                          {copy.allocatedAmount.toLocaleString()}
                        </td>
                        <td className="py-4 text-sm font-medium text-emerald-500">
                          {currencySymbol}
                          {copy.remainingAllocation.toLocaleString()}
                        </td>
                        <td className="py-4">
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20 uppercase font-black tracking-tighter">
                            Trading
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="py-20 text-center opacity-30">
                  <p className="text-sm">No active copy trades found.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Live Transaction Feed */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-card-bg border border-app-border rounded-3xl p-6 flex flex-col shadow-2xl h-full">
            <h3 className="text-text-main font-bold text-lg mb-6">
              Activity Logs
            </h3>
            <div className="space-y-6 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
              {transactions.length > 0 ? (
                transactions.slice(0, 6).map((tx) => (
                  <div
                    key={tx._id}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-xl flex items-center justify-center border border-app-border ${
                          tx.type === "deposit" || tx.type === "profit"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {tx.type === "deposit" || tx.type === "profit" ? (
                          <HiOutlineWallet size={18} />
                        ) : (
                          <HiOutlineArrowTrendingUp size={18} />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-text-main font-bold capitalize">
                          {tx.type}
                        </p>
                        <p className="text-[10px] text-gray-500">
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
                      <p
                        className={`text-[9px] uppercase font-bold ${
                          tx.status === "completed"
                            ? "text-gray-500"
                            : "text-amber-500"
                        }`}
                      >
                        {tx.status}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-10 text-gray-500 text-xs italic">
                  No activity recorded yet.
                </p>
              )}
            </div>
            <button className="w-full mt-auto pt-6 text-sky-500 text-[10px] font-black uppercase tracking-widest hover:underline">
              View Detailed Ledger
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
