import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FaChartLine, FaHistory, FaUsers } from "react-icons/fa";
import {
  useGetTraderByIdQuery,
  useGetMyCopiesQuery,
  useGetMyWalletQuery,
} from "../api/apiSlice";
import CopyModal from "../components/CopyModal";

const TraderProfile = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetTraderByIdQuery(id);
  const { data: walletData } = useGetMyWalletQuery();
  const { data: copiesData } = useGetMyCopiesQuery();
  const userWallet = walletData?.wallet || {};
  const profile = data?.data?.profile || {};

  const isAlreadyCopying = useMemo(() => {
    if (!copiesData?.data || !id) return false;
    return copiesData.data.some((copy) => copy.trader?._id === id);
  }, [copiesData, id]);

  const formattedHistory = useMemo(() => {
    const history = data?.data?.profile?.recentHistory;
    if (!history || !Array.isArray(history)) return [];

    return history.map((item) => ({
      pnl: Number(item.pnl) || 0,
      displayDate: new Date(item.closedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    }));
  }, [data]);

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
  if (isLoading) {
    return (
      <div className="p-10 text-center text-slate-500">Loading Profile...</div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#05070A] pb-20">
      <CopyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        trader={profile}
        userWallet={userWallet}
      />
      {/* HEADER */}
      <div className="bg-white dark:bg-[#0D1117] border-b border-slate-200 dark:border-slate-800 p-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <img
              src={profile.profileImage || "/avatar.png"}
              className="w-20 h-20 rounded-full border-4 border-blue-50 dark:border-slate-700"
              alt="Trader"
            />
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {profile.username || "Unknown Trader"}
              </h1>
              <span className="inline-block mt-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs px-2 py-1 rounded-full font-bold">
                {profile.tradingStyle || "Swing"}
              </span>
            </div>
          </div>

          {isAlreadyCopying ? (
            <div className="flex flex-col items-center md:items-end gap-2">
              <button
                disabled
                className="w-full md:w-auto px-12 py-4 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl font-bold text-lg cursor-default flex items-center gap-2"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                ACTIVE COPYING
              </button>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                Check Dashboard to manage allocation
              </p>
            </div>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto px-12 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 active:scale-95"
            >
              COPY THIS TRADER
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8 min-w-0">
          {/* EQUITY CURVE */}
          <div className="bg-white dark:bg-[#0D1117] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="flex items-center gap-2 font-bold text-slate-800 dark:text-white mb-6">
              <FaChartLine className="text-blue-500" />
              Performance (Equity Curve)
            </h3>

            {formattedHistory.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={formattedHistory}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#334155"
                    opacity={0.1}
                  />
                  <XAxis
                    dataKey="displayDate"
                    stroke="#94a3b8"
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={12}
                    tickFormatter={(value) => `$${value}`}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#161B22",
                      borderRadius: "8px",
                      borderColor: "#334155",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="pnl"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-slate-400 italic">
                No performance data yet.
              </div>
            )}
          </div>

          {/* PORTFOLIO + STRATEGY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ASSET ALLOCATION */}
            <div className="bg-white dark:bg-[#0D1117] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 min-w-0">
              <h3 className="font-bold text-slate-800 dark:text-white mb-4">
                Asset Allocation
              </h3>

              {profile.assetAllocation?.length > 0 ? (
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={profile.assetAllocation}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {profile.assetAllocation.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[220px] flex items-center justify-center text-slate-400 italic text-sm">
                  No asset data.
                </div>
              )}
            </div>

            {/* STRATEGY */}
            <div className="bg-white dark:bg-[#0D1117] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-800 dark:text-white mb-4">
                Strategy Description
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {profile.bio || "No strategy description provided."}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE STATS */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0D1117] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <FaHistory className="text-blue-500" />
              Trading Stats
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <StatBox label="Total Trades" value={profile.totalTrades || 0} />
              <StatBox label="Win Rate" value={`${profile.winRate || 0}%`} />
              <StatBox
                label="Profit Factor"
                value={profile.profitFactor || 0}
              />
              <StatBox label="Sharpe Ratio" value={profile.sharpeRatio || 0} />
              <StatBox
                label="Avg Duration"
                value={`${profile.avgTradeDuration || 0}m`}
              />
              <StatBox
                label="Max Drawdown"
                value={`-${profile.maxDrawdown || 0}%`}
                color="text-red-500"
              />
            </div>
          </div>

          <div className="bg-blue-600 p-6 rounded-2xl shadow-lg text-white">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <FaUsers />
              Copier Community
            </h3>

            <p className="text-2xl font-bold">
              {profile.followersCount || 0} Copiers
            </p>

            <p className="text-xl font-bold mt-2">
              ${(profile.totalCopiedCapital || 0).toLocaleString()} AUM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatBox = ({
  label,
  value,
  color = "text-slate-900 dark:text-white",
}) => (
  <div className="p-3 bg-slate-50 dark:bg-[#161B22] rounded-xl border border-slate-100 dark:border-slate-700">
    <p className="text-[10px] text-slate-400 uppercase font-bold">{label}</p>
    <p className={`text-sm font-bold ${color}`}>{value}</p>
  </div>
);

export default TraderProfile;
