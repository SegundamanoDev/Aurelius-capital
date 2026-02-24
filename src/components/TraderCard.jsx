import { LineChart, Line, ResponsiveContainer } from "recharts";
import { HiBadgeCheck } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const TraderCard = ({ trader }) => {
  const navigate = useNavigate();

  // Fallback for the chart data
  const chartData = trader.monthlyROI || [];

  return (
    <div className="bg-white dark:bg-[#0D1117] rounded-2xl shadow-md border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all duration-300 p-5 flex flex-col">
      {/* 1. Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <img
            src={trader.profileImage || "/avatar.png"}
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-50 dark:border-slate-700"
            alt={trader.username}
          />
          <div>
            <div className="flex items-center gap-1">
              <h3 className="font-bold text-slate-800 dark:text-white transition-colors">
                {trader.username}
              </h3>
              {trader.verified && (
                <HiBadgeCheck className="text-blue-500 text-lg" />
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {trader.followersCount} Copiers
            </p>
          </div>
        </div>

        {/* Risk Badge with Dark Mode logic */}
        <div
          className={`px-2 py-1 rounded text-xs font-bold ${
            trader.riskScore < 4
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
          }`}
        >
          Risk {trader.riskScore}/10
        </div>
      </div>

      {/* 2. ROI & Chart Section */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Total ROI
          </p>
          <p className="text-xl font-bold text-green-500">
            +{trader.totalROI}%
          </p>
        </div>

        <div className="h-[50px] w-full min-w-[100px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="roi"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Stats Divider Section */}
      <div className="flex justify-between py-3 border-t border-slate-50 dark:border-slate-800 text-sm">
        <span className="text-slate-500 dark:text-slate-400">
          Win Rate:{" "}
          <b className="text-slate-700 dark:text-slate-200">
            {trader.winRate}%
          </b>
        </span>
        <span className="text-slate-500 dark:text-slate-400">
          Max DD:{" "}
          <b className="text-slate-700 dark:text-slate-200">
            -{trader.maxDrawdown}%
          </b>
        </span>
      </div>

      {/* 4. Action Buttons */}
      <div className="mt-auto pt-4 flex gap-2">
        <Link
          to={`/dashboard/trader/${trader._id}`}
          className="flex-1 text-center py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          View Profile
        </Link>
        <button
          onClick={() => navigate(`/dashboard/trader/${trader._id}`)}
          className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md shadow-blue-200 dark:shadow-none transition-all"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default TraderCard;
