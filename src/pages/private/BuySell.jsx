import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdClose,
  MdAccountBalanceWallet,
  MdErrorOutline,
  MdLock,
  MdWarningAmber,
  MdGroups,
} from "react-icons/md";
import {
  usePurchaseServiceMutation,
  useGetAllUsersQuery,
} from "../../api/apiSlice";

const TradeController = () => {
  const { data: users } = useGetAllUsersQuery();
  const currentUser = users?.[0];

  const [purchaseService, { isLoading }] = usePurchaseServiceMutation();

  const [amount, setAmount] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");
  const [warningType, setWarningType] = useState("");

  const handleAction = async (type) => {
    const numericAmount = parseFloat(amount);
    const userBalance = currentUser?.balance || 0;

    if (type === "buy") {
      if (userBalance <= 0 || !numericAmount || numericAmount > userBalance) {
        setWarningMsg(
          "Insufficient Funds: Your main wallet balance is too low. Please deposit funds to begin trading.",
        );
        setWarningType("funds");
        setShowWarning(true);
        return;
      }

      try {
        await purchaseService({
          type: "trading_fund",
          amount: numericAmount,
          description: `Market Buy Order: ${numericAmount} USD`,
          details: { platform: "Internal Terminal" },
        }).unwrap();
        setAmount("");
        alert("Trade Executed: Funds moved to Trading Balance.");
      } catch (err) {
        alert(err.data?.message || "Transaction Failed");
      }
    }

    if (type === "sell") {
      if (
        currentUser?.accountType === "Essential" ||
        currentUser?.accountType === "Plus"
      ) {
        setWarningMsg(
          "Feature Restricted: 'Sell' orders are only available for Premium and Ultimate account holders. Please upgrade to unlock.",
        );
        setWarningType("upgrade");
        setShowWarning(true);
      } else {
        alert("Sell Order Executed");
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8 font-sans pb-20">
      {/* RISK WARNING SECTION */}
      <div className="bg-[#1e222d] border-l-4 border-amber-500 rounded-xl p-5 md:p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-amber-500/10 rounded-lg shrink-0">
              <MdWarningAmber className="text-amber-500" size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold text-base md:text-lg mb-1">
                Risk Disclosure
              </h3>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                Trading involves significant risk. If you are a beginner, we
                suggest copying a professional.
              </p>
            </div>
          </div>
          <Link
            to="/dashboard/copy-trade"
            className="w-full lg:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold text-sm rounded-lg hover:bg-gray-200 transition-all"
          >
            <MdGroups size={20} /> Copy Trader
          </Link>
        </div>
      </div>

      {/* BALANCE CARD (Updated for Mobile Stacking) */}
      <div className="bg-[#131722] border border-[#363a45] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4 w-full">
          <div className="p-3 bg-[#2962ff]/10 rounded-full shrink-0">
            <MdAccountBalanceWallet className="text-[#2962ff]" size={28} />
          </div>
          <div className="overflow-hidden">
            <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold truncate">
              Main Wallet Balance
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-white truncate">
              ${currentUser?.balance?.toLocaleString() || "0.00"}
            </h2>
          </div>
        </div>
        <div className="text-left sm:text-right w-full sm:w-auto pt-4 sm:pt-0 border-t border-gray-800 sm:border-none">
          <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">
            Trading Capital
          </p>
          <h2 className="text-xl font-bold text-[#2962ff]">
            ${currentUser?.tradingBalance?.toLocaleString() || "0.00"}
          </h2>
        </div>
      </div>

      {/* TRADE INPUT & BUTTONS (Mobile Column Layout) */}
      <div className="bg-[#131722] border border-[#363a45] rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl">
        <div className="w-full">
          <label className="block text-gray-400 text-[10px] font-bold mb-3 uppercase tracking-widest">
            Trade Amount (USD)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
              $
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isLoading}
              className="w-full bg-[#1e222d] border border-[#363a45] rounded-xl py-4 pl-8 pr-4 text-white font-bold focus:border-[#2962ff] focus:outline-none text-lg"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Buttons: Column on mobile, Row on medium screens */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <button
            disabled={isLoading}
            onClick={() => handleAction("buy")}
            className="w-full md:flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-all uppercase text-sm shadow-lg shadow-emerald-900/20 active:scale-[0.98]"
          >
            {isLoading ? "Processing..." : "Buy"}
          </button>
          <button
            disabled={isLoading}
            onClick={() => handleAction("sell")}
            className="w-full md:flex-1 py-4 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl transition-all uppercase text-sm shadow-lg shadow-rose-900/20 active:scale-[0.98]"
          >
            Sell
          </button>
        </div>
      </div>

      {/* WARNING MODAL (Responsive Width) */}
      {showWarning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/80 backdrop-blur-md">
          <div className="bg-[#1e222d] border border-[#363a45] max-w-sm w-full rounded-2xl p-6 md:p-8 relative">
            <button
              onClick={() => setShowWarning(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <MdClose size={24} />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-rose-500/10 rounded-full mb-4">
                {warningType === "funds" ? (
                  <MdErrorOutline className="text-rose-500" size={40} />
                ) : (
                  <MdLock className="text-[#2962ff]" size={40} />
                )}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {warningType === "funds"
                  ? "Insufficient Funds"
                  : "Upgrade Required"}
              </h3>
              <p className="text-gray-400 text-sm mb-6">{warningMsg}</p>
              <Link
                to={
                  warningType === "funds"
                    ? "/dashboard/deposit"
                    : "/dashboard/pricing"
                }
                className="w-full py-4 bg-[#2962ff] text-white font-bold rounded-xl text-center shadow-lg shadow-blue-900/30"
              >
                {warningType === "funds" ? "Go to Deposit" : "View Plans"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeController;
