import React, { useState } from "react";
import {
  useWithdrawFundsMutation,
  useGetMyWalletQuery,
} from "../../api/apiSlice";

import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { HiOutlineBanknotes, HiOutlineArrowUpRight } from "react-icons/hi2";
import { FaBitcoin, FaPaypal } from "react-icons/fa";

const Withdraw = () => {
  const { user } = useSelector((state) => state.auth);
  // Get wallet data (totalBalance vs freeBalance)
  const { data: walletData, isLoading: isWalletLoading } =
    useGetMyWalletQuery();
  const [withdrawFunds, { isLoading: isWithdrawing }] =
    useWithdrawFundsMutation();

  // Extract values from the new wallet model
  const freeBalance = walletData?.wallet?.freeBalance || 0;
  const isLocked = walletData?.wallet?.isLocked || false;

  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("BTC");
  const [address, setAddress] = useState("");

  const handleWithdraw = async (e) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(amount);

    // Frontend Guardrails
    if (isLocked)
      return toast.error("Your wallet is currently locked. Contact support.");
    if (isNaN(withdrawAmount) || withdrawAmount <= 0)
      return toast.error("Enter a valid amount.");
    if (withdrawAmount > freeBalance)
      return toast.error("Insufficient free balance.");
    if (!address) return toast.error("Please provide your payout address.");

    const loadingToast = toast.loading("Initiating secure withdrawal...");

    try {
      // 1. Backend ACID Transaction
      // The controller handles: balance check, wallet update, and transaction log
      await withdrawFunds({
        amount: withdrawAmount,
        method: method, // Passed to controller for the description/audit
        payoutAddress: address,
      }).unwrap();

      // 2. Email Confirmation
      const emailParams = {
        type: "WITHDRAWAL REQUEST",
        user_name: `${user?.firstName} ${user?.lastName}`,
        user_email: user?.email,
        amount: withdrawAmount,
        asset: method,
        payout_info: address,
        remaining_balance: (freeBalance - withdrawAmount).toFixed(2),
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        emailParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      toast.success("Withdrawal processed successfully!", { id: loadingToast });
      setAmount("");
      setAddress("");
    } catch (err) {
      toast.error(err?.data?.message || "Withdrawal failed.", {
        id: loadingToast,
      });
    }
  };

  if (isWalletLoading)
    return (
      <div className="text-gray-500 uppercase font-black tracking-widest text-center py-20 animate-pulse">
        Syncing Ledger...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
      <div>
        <h1 className="text-3xl font-black text-text-main tracking-tighter italic uppercase">
          Withdraw <span className="text-sky-500">Funds</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1 font-medium">
          Transfer your profits to your preferred external wallet or bank.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Balance Status */}
        <div className="space-y-6">
          <div className="bg-card-bg border border-app-border p-6 rounded-3xl shadow-xl">
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
              Withdrawable Balance
            </p>
            <h2
              className={`text-3xl font-black mt-2 ${isLocked ? "text-red-500" : "text-sky-600"}`}
            >
              ${freeBalance.toLocaleString()}
            </h2>
            {isLocked && (
              <p className="text-[9px] text-red-500 font-bold mt-2 uppercase tracking-tighter">
                Wallet Locked by Security
              </p>
            )}
          </div>

          <div className="bg-amber-500/5 border border-amber-500/20 p-6 rounded-3xl">
            <h4 className="text-amber-600 text-xs font-black uppercase mb-2 italic">
              Audit Protocol
            </h4>
            <p className="text-gray-500 text-[11px] leading-relaxed font-medium">
              Funds are deducted instantly from your free balance. Please ensure
              the {method} address is accurate.
            </p>
          </div>
        </div>

        {/* Withdrawal Form */}
        <div className="md:col-span-2">
          <form
            onSubmit={handleWithdraw}
            className="bg-card-bg border border-app-border p-8 rounded-[2.5rem] shadow-2xl space-y-8"
          >
            {/* Payout Method Tabs */}
            <div className="space-y-4">
              <label className="text-xs text-gray-500 font-black uppercase tracking-widest ml-1">
                Payout Method
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "BTC", label: "Crypto", icon: <FaBitcoin size={18} /> },
                  {
                    id: "PayPal",
                    label: "PayPal",
                    icon: <FaPaypal size={18} />,
                  },
                  {
                    id: "Bank",
                    label: "Bank",
                    icon: <HiOutlineBanknotes size={18} />,
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMethod(item.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                      method === item.id
                        ? "border-sky-500 bg-sky-500/10 text-sky-600"
                        : "border-app-border bg-gray-50 dark:bg-black/20 text-gray-400"
                    }`}
                  >
                    {item.icon}
                    <span className="text-[10px] font-black uppercase">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-xs text-gray-500 font-black uppercase tracking-widest ml-1">
                {method} Destination
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={`Enter your ${method} details`}
                required
                className="w-full bg-gray-50 dark:bg-black/40 border border-app-border p-4 rounded-xl text-text-main outline-none focus:border-sky-500 font-mono text-sm"
              />
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <label className="text-xs text-gray-500 font-black uppercase tracking-widest ml-1">
                Amount (USD)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  required
                  className="w-full bg-gray-50 dark:bg-black/40 border border-app-border p-5 rounded-2xl text-2xl font-black text-text-main outline-none focus:border-sky-500 pl-10"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black text-xl">
                  $
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isWithdrawing || isLocked}
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 text-sm ${
                isWithdrawing || isLocked
                  ? "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                  : "bg-sky-600 hover:bg-sky-500 text-white shadow-xl shadow-sky-500/20 active:scale-95"
              }`}
            >
              {isWithdrawing
                ? "Verifying..."
                : isLocked
                  ? "Wallet Locked"
                  : "Finalize Withdrawal"}
              <HiOutlineArrowUpRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
