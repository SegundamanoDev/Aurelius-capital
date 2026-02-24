import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaPlus, FaMinus } from "react-icons/fa";
import { toast } from "react-hot-toast";

const AdjustAllocationModal = ({
  isOpen,
  onClose,
  copy,
  userWallet,
  onUpdate,
}) => {
  const [newAmount, setNewAmount] = useState(0);
  const [mode, setMode] = useState("increase"); // 'increase' or 'decrease'

  useEffect(() => {
    if (copy) setNewAmount(copy.allocatedAmount);
  }, [copy, isOpen]);

  const difference = Math.abs(newAmount - copy?.allocatedAmount);

  const handleUpdate = async () => {
    // Validation
    if (mode === "increase" && difference > userWallet.freeBalance) {
      return toast.error("Insufficient free balance in main wallet");
    }
    if (mode === "decrease" && newAmount < copy.trader.minCopyAmount) {
      return toast.error(
        `Minimum allocation for this trader is $${copy.trader.minCopyAmount}`,
      );
    }

    try {
      // This calls your PUT /api/copy/:id backend route
      await onUpdate(copy._id, { newAllocation: Number(newAmount) });
      toast.success("Allocation adjusted successfully");
      onClose();
    } catch (err) {
      toast.error("Failed to adjust allocation");
    }
  };

  if (!isOpen || !copy) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl border border-slate-100"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-slate-900">Adjust Funds</h2>
            <button
              onClick={onClose}
              className="p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600"
            >
              <IoClose size={20} />
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-2xl mb-8">
            <button
              onClick={() => setMode("increase")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${mode === "increase" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400"}`}
            >
              <FaPlus size={12} /> Add
            </button>
            <button
              onClick={() => setMode("decrease")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${mode === "decrease" ? "bg-white text-red-600 shadow-sm" : "text-slate-400"}`}
            >
              <FaMinus size={12} /> Remove
            </button>
          </div>

          {/* Amount Display */}
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              New Allocation Amount
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setNewAmount((prev) => Math.max(0, prev - 50))}
                className="w-12 h-12 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50"
              >
                -
              </button>
              <span className="text-5xl font-black text-slate-900">
                ${newAmount}
              </span>
              <button
                onClick={() => setNewAmount((prev) => prev + 50)}
                className="w-12 h-12 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Impact Info */}
          <div className="bg-slate-50 rounded-3xl p-6 space-y-4 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">
                Current Allocation:
              </span>
              <span className="text-slate-900 font-bold">
                ${copy.allocatedAmount}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">
                {mode === "increase"
                  ? "Deducting from Wallet:"
                  : "Returning to Wallet:"}
              </span>
              <span
                className={`font-black ${mode === "increase" ? "text-blue-600" : "text-green-600"}`}
              >
                ${difference}
              </span>
            </div>
          </div>

          <button
            onClick={handleUpdate}
            className={`w-full py-5 rounded-3xl font-black text-lg shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${mode === "increase" ? "bg-blue-600 text-white shadow-blue-200" : "bg-slate-900 text-white shadow-slate-200"}`}
          >
            Confirm Adjustment
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdjustAllocationModal;
