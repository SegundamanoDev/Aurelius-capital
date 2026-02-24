import React, { useState } from "react";
import {
  useGetMyCopiesQuery,
  useGetWalletQuery,
  useUpdateCopyMutation,
  useStopCopyMutation,
} from "../services/traderApi";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import {
  FaUserEdit,
  FaStopCircle,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

// Import the modal component
import AdjustAllocationModal from "../components/modals/AdjustAllocationModal";

const CopyDashboard = () => {
  // --- UI STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCopy, setSelectedCopy] = useState(null);

  // --- API HOOKS ---
  const { data: copyData, isLoading: copyLoading } = useGetMyCopiesQuery();
  const { data: walletData } = useGetWalletQuery();
  const [updateCopy] = useUpdateCopyMutation();
  const [stopCopy] = useStopCopyMutation();

  // --- HANDLERS ---
  const handleOpenAdjustModal = (copy) => {
    setSelectedCopy(copy);
    setIsModalOpen(true);
  };

  const handleStopCopy = async (copyId) => {
    if (
      window.confirm(
        "Are you sure you want to stop copying this trader? All open positions will be closed.",
      )
    ) {
      try {
        await stopCopy(copyId).unwrap();
        toast.success("Stopped copying successfully");
      } catch (err) {
        toast.error(err.data?.message || "Failed to stop copying");
      }
    }
  };

  if (copyLoading)
    return (
      <div className="p-10 animate-pulse text-slate-400 font-medium">
        Loading Portfolio...
      </div>
    );

  return (
    <div className="space-y-8 p-4 md:p-8 bg-slate-50 min-h-screen">
      {/* 1. Header: Total Allocated Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-400 uppercase font-bold mb-1">
            Total Allocated
          </p>
          <h2 className="text-3xl font-black text-slate-900">
            ${walletData?.wallet.allocatedBalance.toLocaleString()}
          </h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-400 uppercase font-bold mb-1">
            Copy PnL (All Time)
          </p>
          <h2
            className={`text-3xl font-black ${walletData?.wallet.totalPnL >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {walletData?.wallet.totalPnL >= 0 ? "+" : ""}$
            {walletData?.wallet.totalPnL}
          </h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center overflow-hidden">
          <div className="h-12 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={copyData?.history}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* A. Active Copying Section */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4 uppercase tracking-tight">
          Active Copying
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {copyData?.copies.map((copy) => (
            <div
              key={copy._id}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:border-blue-200 transition-all"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src={copy.trader.profileImage}
                    className="w-10 h-10 rounded-full border border-slate-100"
                    alt="trader"
                  />
                  <div>
                    <h4 className="font-bold text-slate-800">
                      {copy.trader.username}
                    </h4>
                    <p className="text-[10px] text-slate-400">
                      Allocated: ${copy.allocatedAmount}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenAdjustModal(copy)}
                    className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <FaUserEdit size={16} title="Adjust Allocation" />
                  </button>
                  <button
                    onClick={() => handleStopCopy(copy._id)}
                    className="p-2 bg-slate-50 text-red-400 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <FaStopCircle size={16} title="Stop Copying" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-slate-400">Current PnL</p>
                  <p
                    className={`text-xl font-bold ${copy.currentPnL >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {copy.currentPnL >= 0 ? "+$" : "-$"}
                    {Math.abs(copy.currentPnL)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400">
                    Stop Loss Trigger
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    {copy.stopCopyLossPercent}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* B. Copied Positions Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-white">
          <h3 className="font-bold text-slate-800">Copied Open Positions</h3>
          <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-black uppercase">
            Live Updates
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Asset</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Entry Price</th>
                <th className="px-6 py-4">Current Price</th>
                <th className="px-6 py-4">PnL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {copyData?.positions.map((pos) => (
                <tr
                  key={pos._id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-slate-800">
                    {pos.asset}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${pos.type === "long" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {pos.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">
                    ${pos.entryPrice}
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">
                    ${pos.currentPrice}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm font-bold ${pos.pnl >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    <div className="flex items-center gap-1">
                      {pos.pnl >= 0 ? (
                        <FaArrowUp size={10} />
                      ) : (
                        <FaArrowDown size={10} />
                      )}
                      ${Math.abs(pos.pnl)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!copyData?.positions?.length && (
            <div className="p-10 text-center text-slate-400 text-sm font-medium">
              No open copied positions.
            </div>
          )}
        </div>
      </div>

      {/* --- MODAL RENDERING --- */}
      <AdjustAllocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        copy={selectedCopy}
        userWallet={walletData?.wallet}
        onUpdate={updateCopy}
      />
    </div>
  );
};

export default CopyDashboard;
