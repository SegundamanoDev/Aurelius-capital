import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestWithdrawal } from "../../features/userSlice";
import { HiOutlineBanknotes, HiOutlineArrowUpRight } from "react-icons/hi2";
import { FaBitcoin, FaPaypal } from "react-icons/fa";

const Withdraw = () => {
  const dispatch = useDispatch();
  const { balance } = useSelector((state) => state.user);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("btc");

  const handleWithdraw = (e) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(amount);

    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      return alert("Please enter a valid amount.");
    }
    if (withdrawAmount > balance) {
      return alert("Insufficient funds in your trading balance.");
    }

    dispatch(requestWithdrawal(withdrawAmount));
    alert(
      `Withdrawal request for $${withdrawAmount} has been sent to admin for approval.`,
    );
    setAmount("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Withdraw Funds
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Transfer your profits to your preferred external wallet or bank.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left: Balance Info */}
        <div className="space-y-6">
          <div className="bg-[#05070A] border border-white/5 p-6 rounded-3xl shadow-xl">
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
              Withdrawable Balance
            </p>
            <h2 className="text-3xl font-bold text-sky-400 mt-2">
              ${balance.toLocaleString()}
            </h2>
          </div>

          <div className="bg-sky-500/5 border border-sky-500/10 p-6 rounded-3xl">
            <h4 className="text-white text-xs font-bold uppercase mb-2">
              Notice
            </h4>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              Withdrawal requests are typically processed within 24 hours.
              Ensure your wallet details in the profile are correct.
            </p>
          </div>
        </div>

        {/* Right: Withdrawal Form */}
        <div className="md:col-span-2">
          <form
            onSubmit={handleWithdraw}
            className="bg-[#05070A] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl space-y-8"
          >
            {/* Method Toggle */}
            <div className="space-y-4">
              <label className="text-xs text-gray-500 font-bold uppercase">
                Payout Method
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "btc", label: "Crypto", icon: <FaBitcoin /> },
                  { id: "paypal", label: "PayPal", icon: <FaPaypal /> },
                  { id: "bank", label: "Bank", icon: <HiOutlineBanknotes /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMethod(item.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                      method === item.id
                        ? "border-sky-500 bg-sky-500/10 text-sky-400"
                        : "border-white/5 bg-black/20 text-gray-500"
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

            {/* Amount Input */}
            <div className="space-y-2">
              <label className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                Amount to Withdraw (USD)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-2xl font-bold text-white outline-none focus:border-sky-500 transition-all pl-10"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-bold">
                  $
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-sky-500 hover:bg-sky-400 text-black font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2"
            >
              Request Payout <HiOutlineArrowUpRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
