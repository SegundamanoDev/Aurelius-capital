import React, { useState, useEffect } from "react";
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
} from "../../api/apiSlice"; // Adjust path

const TradeController = () => {
  // 1. Fetch real user data (Replace with a specific 'useGetProfileQuery' if you have one)
  // For now, we assume your auth state or a profile query provides the balance
  const { data: users } = useGetAllUsersQuery();
  const currentUser = users?.[0]; // Mocking selection of current user

  const [purchaseService, { isLoading }] = usePurchaseServiceMutation();

  const [amount, setAmount] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");
  const [warningType, setWarningType] = useState("");

  const handleAction = async (type) => {
    const numericAmount = parseFloat(amount);
    const userBalance = currentUser?.balance || 0;

    if (type === "buy") {
      // Check for zero or low funds
      if (userBalance <= 0 || !numericAmount || numericAmount > userBalance) {
        setWarningMsg(
          "Insufficient Funds: Your main wallet balance is too low. Please deposit funds to begin trading.",
        );
        setWarningType("funds");
        setShowWarning(true);
        return;
      }

      try {
        // Trigger Backend Transaction
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
      // Check for the 'Premium' or 'Ultimate' account type you defined in pricing
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
        // Handle actual sell logic if they are pro
        alert("Sell Order Executed");
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 font-sans pb-20">
      {/* RISK WARNING SECTION */}
      <div className="bg-[#1e222d] border-l-4 border-amber-500 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-amber-500/10 rounded-lg shrink-0">
              <MdWarningAmber className="text-amber-500" size={28} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-1">
                Risk Disclosure
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Trading involves significant risk. If you are a beginner, we
                suggest copying a professional.
              </p>
            </div>
          </div>
          <Link
            to="/dashboard/copy-trade"
            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold text-sm rounded-lg hover:bg-gray-200 transition-all"
          >
            <MdGroups size={20} /> Copy Trader
          </Link>
        </div>
      </div>

      {/* BALANCE CARD (Live Data) */}
      <div className="bg-[#131722] border border-[#363a45] rounded-2xl p-6 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#2962ff]/10 rounded-full">
            <MdAccountBalanceWallet className="text-[#2962ff]" size={28} />
          </div>
          <div>
            <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">
              Main Wallet Balance
            </p>
            <h2 className="text-3xl font-black text-white">
              ${currentUser?.balance?.toLocaleString() || "0.00"}
            </h2>
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">
            Trading Capital
          </p>
          <h2 className="text-xl font-bold text-[#2962ff]">
            ${currentUser?.tradingBalance?.toLocaleString() || "0.00"}
          </h2>
        </div>
      </div>

      {/* TRADE INPUT */}
      <div className="bg-[#131722] border border-[#363a45] rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-end shadow-2xl">
        <div className="flex-grow w-full">
          <label className="block text-gray-400 text-[10px] font-bold mb-3 uppercase tracking-widest">
            Trade Amount (USD)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isLoading}
            className="w-full bg-[#1e222d] border border-[#363a45] rounded-xl py-4 px-4 text-white font-bold focus:border-[#2962ff] focus:outline-none"
            placeholder="0.00"
          />
        </div>
        <div className="flex-col md:flex gap-4 w-full md:w-auto">
          <button
            disabled={isLoading}
            onClick={() => handleAction("buy")}
            className="flex-1 md:w-40 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-all uppercase text-xs"
          >
            {isLoading ? "Processing..." : "Buy"}
          </button>
          <button
            disabled={isLoading}
            onClick={() => handleAction("sell")}
            className="flex-1 md:w-40 py-4 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl transition-all uppercase text-xs"
          >
            Sell
          </button>
        </div>
      </div>

      {/* WARNING MODAL (Same as before) */}
      {showWarning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#1e222d] border border-[#363a45] max-w-md w-full rounded-2xl p-8 relative">
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
                to={warningType === "funds" ? "/deposit" : "/pricing"}
                className="w-full py-4 bg-[#2962ff] text-white font-bold rounded-xl text-center"
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
