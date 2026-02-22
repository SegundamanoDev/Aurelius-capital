import React, { useState } from "react";
import {
  useWithdrawFundsMutation,
  useGetMyProfileQuery,
} from "../../api/apiSlice";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { HiOutlineBanknotes, HiOutlineArrowUpRight } from "react-icons/hi2";
import { FaBitcoin, FaPaypal } from "react-icons/fa";

const Withdraw = () => {
  const { data: user, isLoading: isProfileLoading } = useGetMyProfileQuery();
  const [withdrawFunds, { isLoading: isWithdrawing }] =
    useWithdrawFundsMutation();

  const balance = user?.balance || 0;

  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("BTC");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(amount);

    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      return toast.error("Please enter a valid amount.");
    }
    if (withdrawAmount > balance) {
      return toast.error("Insufficient funds in your trading balance.");
    }
    if (!address) {
      return toast.error("Please provide your payout address.");
    }

    const loadingToast = toast.loading("Processing withdrawal request...");
    setLoading(true);

    try {
      await withdrawFunds({
        amount: withdrawAmount,
        method: method,
        payoutAddress: address,
      }).unwrap();

      const emailParams = {
        type: "WITHDRAWAL REQUEST",
        user_name: `${user?.firstName} ${user?.lastName}`,
        user_email: user?.email,
        amount: withdrawAmount,
        asset: method,
        current_balance: (balance - withdrawAmount).toLocaleString(),
        proof_link: `PAYOUT ADDRESS: ${address}`,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        emailParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      toast.success("Withdrawal request submitted for approval!", {
        id: loadingToast,
      });

      setAmount("");
      setAddress("");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to process withdrawal.", {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
  };

  if (isProfileLoading)
    return (
      <div className="text-gray-500 uppercase font-black tracking-widest text-center py-20 animate-pulse">
        Syncing Ledger...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20 transition-colors duration-500">
      <div>
        <h1 className="text-3xl font-black text-text-main tracking-tighter italic uppercase">
          Withdraw <span className="text-sky-500">Funds</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1 font-medium">
          Transfer your profits to your preferred external wallet or bank.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left: Info Cards */}
        <div className="space-y-6">
          <div className="bg-card-bg border border-app-border p-6 rounded-3xl shadow-xl shadow-black/5">
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
              Available Balance
            </p>
            <h2 className="text-3xl font-black text-sky-600 dark:text-sky-400 mt-2">
              ${balance.toLocaleString()}
            </h2>
          </div>

          <div className="bg-amber-500/5 border border-amber-500/20 p-6 rounded-3xl">
            <h4 className="text-amber-600 dark:text-amber-500 text-xs font-black uppercase mb-2">
              Verification Notice
            </h4>
            <p className="text-gray-500 dark:text-gray-400 text-[11px] leading-relaxed font-medium">
              Withdrawals are processed after internal security audits. Ensure
              your payout address is correct to avoid permanent loss of funds.
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="md:col-span-2">
          <form
            onSubmit={handleWithdraw}
            className="bg-card-bg border border-app-border p-8 rounded-[2.5rem] shadow-2xl shadow-black/5 space-y-8"
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
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-300 ${
                      method === item.id
                        ? "border-sky-500 bg-sky-500/10 text-sky-600 dark:text-sky-400 shadow-inner"
                        : "border-app-border bg-gray-50 dark:bg-black/20 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
                    }`}
                  >
                    {item.icon}
                    <span className="text-[10px] font-black uppercase tracking-tighter">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Address Input */}
            <div className="space-y-2">
              <label className="text-xs text-gray-500 font-black uppercase tracking-widest ml-1">
                {method} Receiving Address / Account
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={`Enter your ${method} details`}
                required
                className="w-full bg-gray-50 dark:bg-black/40 border border-app-border p-4 rounded-xl text-text-main outline-none focus:border-sky-500 transition-all font-mono text-sm placeholder:text-gray-400"
              />
            </div>

            {/* Amount Input */}
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
                  className="w-full bg-gray-50 dark:bg-black/40 border border-app-border p-5 rounded-2xl text-2xl font-black text-text-main outline-none focus:border-sky-500 transition-all pl-10 placeholder:text-gray-300"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black text-xl">
                  $
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isWithdrawing || loading}
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 text-sm ${
                isWithdrawing || loading
                  ? "bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  : "bg-sky-600 hover:bg-sky-500 text-white shadow-xl shadow-sky-500/20 active:scale-[0.98]"
              }`}
            >
              {isWithdrawing || loading ? "Processing..." : "Request Payout"}
              <HiOutlineArrowUpRight
                size={20}
                className={isWithdrawing ? "animate-pulse" : ""}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
