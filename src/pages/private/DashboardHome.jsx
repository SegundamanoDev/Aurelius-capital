import React from "react";
import { useSelector } from "react-redux";
import {
  useGetMyProfileQuery,
  useGetMyTransactionsQuery,
  useGetMyWalletQuery,
  useGetMyCopiesQuery, // Ensure this is in your apiSlice
} from "../../api/apiSlice";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineWallet,
  HiOutlineArrowsRightLeft,
  HiOutlineBanknotes,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { getSymbol } from "../public/Register";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  // 1. Data Fetching
  const { data: freshUser, isLoading: userLoading } = useGetMyProfileQuery();
  const { data: walletData, isLoading: walletLoading } = useGetMyWalletQuery();
  const { data: transactionsData } = useGetMyTransactionsQuery();
  const { data: copiesData, isLoading: copiesLoading } = useGetMyCopiesQuery();

  const { user: authUser } = useSelector((state) => state.auth);

  // 2. Data Normalization (Prevents 'undefined' errors)
  const user = freshUser || authUser;
  const wallet = walletData?.wallet || {};
  const transactions = transactionsData || [];
  const activeCopies = copiesData?.data || [];
  const liveCurrency = wallet?.currency || user?.currency || "USD";
  const currencySymbol = getSymbol(liveCurrency);

  // Formatting Helper
  const fNum = (val) =>
    `${currencySymbol}${(val || 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const stats = [
    {
      label: "Total Equity",
      value: fNum(wallet.totalBalance),
      subText: "Net Account Value",
      icon: <HiOutlineWallet size={24} />,
      color: "border-sky-500/20",
      accent: "bg-sky-500",
    },
    {
      label: "Available Funds",
      value: fNum(wallet.freeBalance),
      subText: "Ready to Withdraw",
      icon: <HiOutlineBanknotes size={24} />,
      color: "border-indigo-500/20",
      accent: "bg-indigo-500",
    },
    {
      label: "In-Trade Capital",
      value: fNum(wallet.allocatedBalance),
      subText: "Currently Allocated",
      icon: <HiOutlineChartBar size={24} />,
      color: "border-purple-500/20",
      accent: "bg-purple-500",
    },
    {
      label: "Total Profits",
      value: fNum(wallet.totalProfits),
      subText: "Lifetime Results",
      icon: <HiOutlineArrowTrendingUp size={24} />,
      color: "border-emerald-500/20",
      accent: "bg-emerald-500",
    },
    {
      label: "Total Deposits",
      value: fNum(wallet.totalDeposits),
      subText: "Cumulative Inflow",
      icon: <HiOutlineBanknotes size={24} />,
      color: "border-amber-500/20",
      accent: "bg-amber-500",
    },
    {
      label: "Total Withdrawn",
      value: fNum(wallet.totalWithdrawals),
      subText: "Cumulative Outflow",
      icon: <HiOutlineArrowsRightLeft size={24} />,
      color: "border-rose-500/20",
      accent: "bg-rose-500",
    },
  ];

  if (userLoading || walletLoading || copiesLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-app-bg">
        <div className="text-sky-500 animate-pulse font-black tracking-widest uppercase text-xs">
          Synchronizing Ledger Data...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1600px] mx-auto p-4">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-main tracking-tight">
            Portfolio Overview
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Real-time tracking for{" "}
            <span className="text-sky-500 font-bold">
              {user?.firstName} {user?.lastName}
            </span>
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

      {/* --- STAT CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`group relative bg-card-bg rounded-[2rem] border ${stat.color} p-1 transition-all duration-500 hover:-translate-y-1 shadow-xl hover:shadow-2xl`}
          >
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-[2rem] ${stat.accent}`}
            />
            <div className="relative bg-card-bg rounded-[1.9rem] p-6 h-full flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black">
                    {stat.label}
                  </p>
                  <h3 className="text-2xl xl:text-3xl font-bold text-text-main tracking-tight">
                    {stat.value}
                  </h3>
                </div>
                <div
                  className={`p-3 rounded-2xl border border-app-border bg-gray-50 dark:bg-white/5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${stat.accent.replace("bg-", "text-")}`}
                >
                  {stat.icon}
                </div>
              </div>
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`flex h-1.5 w-1.5 rounded-full ${stat.accent} opacity-50`}
                  />
                  <p className="text-gray-400 text-[10px] font-bold italic tracking-wide">
                    {stat.subText}
                  </p>
                </div>
                <div className="h-1 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${stat.accent} opacity-40 w-full transform -translate-x-[30%] group-hover:translate-x-0 transition-transform duration-1000 ease-in-out`}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: Copy Portfolio */}
        <div className="lg:col-span-8">
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
                          {copy.allocatedAmount?.toLocaleString()}
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
                <div className="py-20 text-center opacity-30 italic text-sm">
                  No active copy trades found.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Activity Logs */}
        <div className="lg:col-span-4">
          <div className="bg-card-bg border border-app-border rounded-3xl p-6 shadow-2xl h-full flex flex-col">
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
                        <HiOutlineWallet size={18} />
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
                        className={`text-sm font-bold ${tx.type === "deposit" || tx.type === "profit" ? "text-emerald-500" : "text-text-main"}`}
                      >
                        {tx.type === "deposit" || tx.type === "profit"
                          ? "+"
                          : "-"}
                        {currencySymbol}
                        {tx.amount?.toLocaleString()}
                      </p>
                      <p className="text-[9px] uppercase font-bold text-gray-500">
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
            <Link
              to="/dashboard/transactions"
              className="w-full mt-auto pt-6 text-sky-500 text-[10px] font-black uppercase tracking-widest hover:underline"
            >
              View Detailed Ledger
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
