import React from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
} from "recharts";
import {
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineCircleStack,
  HiOutlineArrowUpRight,
  HiOutlineArrowDownLeft,
  HiOutlineArrowTrendingUp,
} from "react-icons/hi2";

// --- MOCK DATA ---
const PERFORMANCE_DATA = [
  { date: "Mon", value: 42000 },
  { date: "Tue", value: 45000 },
  { date: "Wed", value: 43500 },
  { date: "Thu", value: 48000 },
  { date: "Fri", value: 52000 },
  { date: "Sat", value: 50000 },
  { date: "Sun", value: 54231 },
];

const ALLOCATION_DATA = [
  { name: "Crypto", value: 65, color: "#0ea5e9" }, // sky-500
  { name: "Forex", value: 20, color: "#10b981" }, // emerald-500
  { name: "Commodities", value: 15, color: "#6366f1" }, // indigo-500
];

const HOLDINGS = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    amount: "0.42",
    entry: "58,200",
    current: "64,231",
    pnl: "+12.4%",
    status: "up",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    amount: "4.5",
    entry: "3,650",
    current: "3,452",
    pnl: "-5.4%",
    status: "down",
  },
  {
    symbol: "XAU",
    name: "Gold",
    amount: "10oz",
    entry: "2,280",
    current: "2,321",
    pnl: "+1.8%",
    status: "up",
  },
];

const Portfolio = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-1000 pb-20">
      {/* 1. PERFORMANCE HERO SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#05070A] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
                Total Portfolio Value
              </p>
              <h1 className="text-4xl font-black text-white mt-1">
                $54,231.00
              </h1>
              <div className="flex gap-4 mt-2">
                <span className="flex items-center text-emerald-500 text-[11px] font-bold">
                  <HiOutlineArrowUpRight className="mr-1" /> +$2,431.12 (Today)
                </span>
                <span className="text-gray-600 text-[11px] font-bold uppercase tracking-widest">
                  All Time: +24.5%
                </span>
              </div>
            </div>
            <div className="p-3 bg-sky-500/10 rounded-2xl text-sky-500">
              <HiOutlineArrowTrendingUp size={24} />
            </div>
          </div>

          {/* Equity Curve Chart */}
          <div className="h-[200px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PERFORMANCE_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0ea5e9"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. ASSET ALLOCATION (Visuals) */}
        <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center justify-center">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4 w-full">
            Asset Allocation
          </p>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ALLOCATION_DATA}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {ALLOCATION_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <ReTooltip
                  contentStyle={{
                    backgroundColor: "#05070A",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                  }}
                  itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 w-full mt-4">
            {ALLOCATION_DATA.map((item) => (
              <div key={item.name} className="text-center">
                <p className="text-[9px] font-black text-gray-500 uppercase">
                  {item.name}
                </p>
                <p className="text-xs font-bold text-white">{item.value}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. ALPHA ANALYTICS & RISK METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            label: "Sharpe Ratio",
            val: "2.41",
            desc: "Excellent risk-adjusted return",
            icon: <HiOutlineShieldCheck />,
          },
          {
            label: "Max Drawdown",
            val: "12.4%",
            desc: "Peak-to-trough decline",
            icon: <HiOutlineClock />,
          },
          {
            label: "Staking Rewards",
            val: "+$124.50",
            desc: "Passive income (30d)",
            icon: <HiOutlineCircleStack />,
          },
        ].map((metric, i) => (
          <div
            key={i}
            className="bg-[#05070A] border border-white/5 rounded-3xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sky-500">{metric.icon}</span>
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                {metric.label}
              </span>
            </div>
            <h4 className="text-xl font-black text-white italic">
              {metric.val}
            </h4>
            <p className="text-[9px] text-gray-600 font-bold uppercase mt-1">
              {metric.desc}
            </p>
          </div>
        ))}
      </div>

      {/* 4. HOLDINGS TABLE */}
      <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em]">
            Active Holdings
          </h3>
          <button className="text-[10px] font-black text-sky-500 uppercase tracking-widest hover:underline">
            Download CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[10px] text-gray-500 uppercase font-black">
                <th className="px-8 py-4">Asset</th>
                <th className="px-8 py-4">Position Size</th>
                <th className="px-8 py-4">Avg Entry</th>
                <th className="px-8 py-4">Market Price</th>
                <th className="px-8 py-4 text-right">Unrealized P&L</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {HOLDINGS.map((asset, i) => (
                <tr
                  key={i}
                  className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-black text-[10px] text-sky-500">
                        {asset.symbol}
                      </div>
                      <div>
                        <p className="font-bold text-white">{asset.name}</p>
                        <p className="text-[10px] text-gray-500 font-bold">
                          {asset.symbol}/USDT
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 font-mono font-bold text-white">
                    {asset.amount}
                  </td>
                  <td className="px-8 py-5 font-mono text-gray-400">
                    ${asset.entry}
                  </td>
                  <td className="px-8 py-5 font-mono text-white">
                    ${asset.current}
                  </td>
                  <td
                    className={`px-8 py-5 text-right font-black ${asset.status === "up" ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {asset.pnl}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
