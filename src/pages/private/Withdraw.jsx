import React, { useState } from "react";
import {
  useWithdrawFundsMutation,
  useGetMyProfileQuery,
} from "../../api/apiSlice"; // Import the query
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { HiOutlineBanknotes, HiOutlineArrowUpRight } from "react-icons/hi2";
import { FaBitcoin, FaPaypal } from "react-icons/fa";

const Withdraw = () => {
  // 1. Hooks and API
  const { data: user, isLoading: isProfileLoading } = useGetMyProfileQuery(); // Fetch live user data
  const [withdrawFunds, { isLoading: isWithdrawing }] =
    useWithdrawFundsMutation();

  // Use live balance from the query result
  const balance = user?.balance || 0;

  // 2. Local State
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("BTC");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async (e) => {
    e.preventDefault();

    const withdrawAmount = parseFloat(amount);

    // 1. Local Validations
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
      // 2. Backend Call
      const result = await withdrawFunds({
        amount: withdrawAmount,
        method: method,
        payoutAddress: address,
      }).unwrap();

      // 3. EmailJS Notification
      const emailParams = {
        type: "WITHDRAWAL REQUEST",
        user_name: `${user?.firstName} ${user?.lastName}`,
        user_email: user?.email,
        amount: withdrawAmount,
        asset: method,
        // Live balance after withdrawal lock for the admin to see
        current_balance: (balance - withdrawAmount).toLocaleString(),
        proof_link: `PAYOUT ADDRESS: ${address}`,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        emailParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      // 4. Success Handling
      toast.success("Withdrawal request submitted for approval!", {
        id: loadingToast,
      });

      // 5. Reset Form State
      setAmount("");
      setAddress("");
    } catch (err) {
      console.error("Withdrawal Error:", err);
      toast.error(err?.data?.message || "Failed to process withdrawal.", {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
  };

  // Show a loading state if the profile is still fetching
  if (isProfileLoading)
    return (
      <div className="text-white text-center py-20">Syncing Ledger...</div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tighter italic uppercase">
          Withdraw <span className="text-sky-500">Funds</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Transfer your profits to your preferred external wallet or bank.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left: Balance Card */}
        <div className="space-y-6">
          <div className="bg-[#05070A] border border-white/5 p-6 rounded-3xl shadow-xl">
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
              Available Balance
            </p>
            <h2 className="text-3xl font-bold text-sky-400 mt-2">
              ${balance.toLocaleString()}
            </h2>
          </div>

          <div className="bg-amber-500/5 border border-amber-500/10 p-6 rounded-3xl">
            <h4 className="text-amber-500 text-xs font-bold uppercase mb-2">
              Verification Notice
            </h4>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              Withdrawals are processed after internal security audits. Ensure
              your payout address is correct.
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="md:col-span-2">
          <form
            onSubmit={handleWithdraw}
            className="bg-[#05070A] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl space-y-8"
          >
            {/* Payout Method Tabs */}
            <div className="space-y-4">
              <label className="text-xs text-gray-500 font-bold uppercase">
                Payout Method
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "BTC", label: "Crypto", icon: <FaBitcoin /> },
                  { id: "PayPal", label: "PayPal", icon: <FaPaypal /> },
                  { id: "Bank", label: "Bank", icon: <HiOutlineBanknotes /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMethod(item.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                      method === item.id
                        ? "border-sky-500 bg-sky-500/10 text-sky-400"
                        : "border-white/5 bg-black/20 text-gray-500 hover:bg-white/5"
                    }`}
                  >
                    {item.icon}
                    <span className="text-[10px] font-bold uppercase">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Address Input */}
            <div className="space-y-2">
              <label className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                {method} Receiving Address / Account
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={`Enter your ${method} details`}
                required
                className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-sky-500 transition-all font-mono text-sm"
              />
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <label className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                Amount (USD)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  required
                  className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-2xl font-bold text-white outline-none focus:border-sky-500 transition-all pl-10"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-bold">
                  $
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isWithdrawing || loading}
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                isWithdrawing || loading
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-sky-500 hover:bg-sky-400 text-black shadow-lg shadow-sky-500/20 active:scale-[0.98]"
              }`}
            >
              {isWithdrawing || loading ? "Submitting..." : "Request Payout"}{" "}
              <HiOutlineArrowUpRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
