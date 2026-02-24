import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoWarningOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Import for navigation
import { useStartCopyingMutation } from "../api/apiSlice";

const CopyModal = ({ isOpen, onClose, trader, userWallet }) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(trader?.minCopyAmount || 100);
  const [stopLoss, setStopLoss] = useState(20);
  const [copyOpen, setCopyOpen] = useState(false);

  const [startCopy, { isLoading }] = useStartCopyingMutation();

  const hasFunds = userWallet?.freeBalance >= amount;

  const handleConfirm = async () => {
    try {
      await startCopy({
        traderId: trader._id,
        allocationAmount: Number(amount),
        stopCopyLossPercent: Number(stopLoss),
        copyOpenTrades: copyOpen,
      }).unwrap();

      toast.success(`Successfully copying ${trader.username}`);
      onClose();
    } catch (err) {
      toast.error(err.data?.message || "Failed to start copying");
    }
  };

  const handleGoToDeposit = () => {
    onClose(); // Close modal first
    navigate("/dashboard/deposit"); // Redirect to deposit
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          /* Dark Mode Classes Added Below */
          className="bg-white dark:bg-[#0F172A] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-transparent dark:border-slate-800"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Copy Settings
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Trader: {trader?.username}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <IoClose
                size={24}
                className="text-slate-500 dark:text-slate-400"
              />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {!hasFunds ? (
              <div className="space-y-4 text-center py-4">
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto">
                  <IoWarningOutline
                    size={32}
                    className="text-amber-600 dark:text-amber-500"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    Insufficient Funds
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 px-6">
                    You need at least{" "}
                    <span className="font-bold text-slate-900 dark:text-white">
                      ${amount}
                    </span>{" "}
                    to copy this trader. Current balance:{" "}
                    <span className="font-bold text-red-500">
                      ${userWallet?.freeBalance || 0}
                    </span>
                  </p>
                </div>
                <button
                  onClick={handleGoToDeposit}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 transition-colors"
                >
                  Go to Deposit
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Allocation Input */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Amount to Allocate
                    </label>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                      Avail: ${userWallet?.freeBalance}
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">
                      $
                    </span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-lg text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Stop Loss Slider */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Stop Copy Loss
                    </label>
                    <span className="text-sm font-bold text-red-500">
                      {stopLoss}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="95"
                    step="5"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 italic">
                    Stop copying automatically if total loss reaches {stopLoss}%
                  </p>
                </div>

                {/* Toggle Switches */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Copy Open Positions
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase">
                      Immediate Market Entry
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={copyOpen}
                      onChange={() => setCopyOpen(!copyOpen)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Disclaimer */}
                <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center leading-relaxed">
                  By clicking Confirm, you acknowledge that trading involves
                  risk of capital loss.
                </p>

                <button
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 dark:shadow-none hover:scale-[1.02] active:scale-[0.98] transition-all disabled:bg-slate-300 dark:disabled:bg-slate-800"
                >
                  {isLoading ? "Processing..." : `Confirm Copy ($${amount})`}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CopyModal;
