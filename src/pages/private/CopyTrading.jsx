import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useGetTradersQuery } from "../../api/apiSlice";
import TraderCard from "../../components/TraderCard";

const CopyTradePage = () => {
  const [filters, setFilters] = useState({ search: "", sort: "totalROI" });
  const { data, isLoading } = useGetTradersQuery(filters);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#05070A] p-4 md:p-8 transition-colors duration-300">
      {/* A. Top Section: Filters */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Copy Top Traders
        </h1>

        <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-[#0D1117] p-4 rounded-xl shadow-sm border border-transparent dark:border-slate-800 transition-colors">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search traders..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-[#161B22] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>

          <select
            className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-[#161B22] text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          >
            <option value="totalROI">Most Profitable</option>
            <option value="riskScore">Lowest Risk</option>
            <option value="followersCount">Most Copied</option>
          </select>
        </div>
      </div>

      {/* B. Trader Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-72 bg-slate-200 dark:bg-[#161B22] animate-pulse rounded-2xl"
              />
            ))
          : data?.data.map((trader) => (
              <TraderCard key={trader._id} trader={trader} />
            ))}
      </div>
    </div>
  );
};

export default CopyTradePage;
