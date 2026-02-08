import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  HiCheckCircle,
  HiOutlineSignal,
  HiOutlineCpuChip,
  HiOutlineLockClosed,
  HiOutlineClock,
  HiOutlineWallet,
} from "react-icons/hi2";

const InvestmentPlans = () => {
  // 1. MOCK USER STATE
  const [user, setUser] = useState({
    balance: 4500.0, // Initial Mock Balance
    activeProtocols: [],
  });

  const tradingPlans = [
    {
      name: "Bronze Protocol",
      price: 1000.0,
      spread: "1.2 pips",
      leverage: "1:500",
      color: "from-orange-700 to-orange-900",
    },
    {
      name: "Silver Protocol",
      price: 5000.0,
      spread: "0.8 pips",
      leverage: "1:500",
      color: "from-slate-400 to-slate-600",
      recommended: true,
    },
    {
      name: "Gold Protocol",
      price: 10000.0,
      spread: "0.8 pips",
      leverage: "1:500",
      color: "from-yellow-500 to-amber-700",
      extra: "No Swap Fees",
    },
  ];

  const signalPlans = [
    {
      name: "Bronze Signal",
      price: 1000.0,
      strength: "+5% Strength",
      color: "border-orange-900/30",
    },
    {
      name: "Silver Signal",
      price: 2000.0,
      strength: "+15% Strength",
      color: "border-slate-500/30",
    },
    {
      name: "Gold Signal",
      price: 4000.0,
      strength: "+25% Strength",
      color: "border-yellow-600/30",
      recommended: true,
    },
  ];

  const stakingPlans = [
    { id: 1, days: "30 Days", return: "5% Return", cost: 500 }, // Mock cost for staking
    { id: 2, days: "60 Days", return: "10% Return", cost: 1000 },
    { id: 3, days: "90 Days", return: "15% Return", cost: 2000 },
    { id: 4, days: "180 Days", return: "20% Return", cost: 5000 },
    { id: 5, days: "360 Days", return: "25% Return", cost: 10000 },
  ];

  // 2. CORE LOGIC HANDLER
  const handlePurchase = (planName, price, type) => {
    // Check for Insufficient Funds
    if (user.balance < price) {
      toast.error(
        (t) => (
          <span className="flex flex-col">
            <b className="uppercase text-[10px] tracking-widest">
              Insufficient Funds
            </b>
            <span className="text-xs">
              You need ${(price - user.balance).toLocaleString()} more to
              initialize this {type}.
            </span>
          </span>
        ),
        {
          style: {
            border: "1px solid #ef4444",
            background: "#05070A",
            color: "#fff",
          },
        },
      );
      return;
    }

    // Process Transaction (Mocking Loading)
    const loadId = toast.loading(`Initializing ${planName}...`);

    setTimeout(() => {
      setUser((prev) => ({
        ...prev,
        balance: prev.balance - price,
        activeProtocols: [...prev.activeProtocols, planName],
      }));

      toast.dismiss(loadId);

      // Success Message with Expert Notification
      toast.success(
        (t) => (
          <span className="flex flex-col">
            <b className="uppercase text-[10px] tracking-widest text-emerald-500">
              Protocol Activated
            </b>
            <span className="text-xs">
              Funds deducted. Our expert desk is now managing your positions.
            </span>
          </span>
        ),
        {
          icon: "⚡",
          duration: 5000,
          style: {
            border: "1px solid #10b981",
            background: "#05070A",
            color: "#fff",
          },
        },
      );
    }, 1500);
  };

  return (
    <div className="bg-[#05070A] text-slate-300 min-h-screen pb-32 pt-24 px-6 overflow-hidden">
      {/* FLOATING BALANCE WIDGET */}
      <div className="fixed top-28 right-6 z-50 bg-[#0A0C10] border border-white/10 p-4 rounded-2xl backdrop-blur-xl flex items-center gap-4 shadow-2xl">
        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
          <HiOutlineWallet size={20} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">
            Capital Reserve
          </p>
          <p className="text-xl font-black text-white font-mono">
            ${user.balance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* SECTION 1: TRADING PLANS */}
      <section className="max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="text-sky-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">
            Execution Layer
          </h2>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
            Trading <span className="text-gray-600">Plans.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tradingPlans.map((plan, i) => (
            <div
              key={i}
              className={`p-8 rounded-[2rem] border ${plan.recommended ? "border-sky-500/50 bg-[#0A0C10]" : "border-white/5 bg-white/[0.02]"} transition-all`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} mb-6`}
              />
              <h3 className="text-xl font-black text-white uppercase italic mb-2">
                {plan.name}
              </h3>
              <p className="text-3xl font-black text-white mb-8">
                ${plan.price.toLocaleString()}
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex justify-between text-xs font-bold uppercase tracking-tight">
                  <span className="text-gray-500">Leverage 1:500</span>
                  <HiCheckCircle className="text-emerald-500" />
                </li>
                <li className="flex justify-between text-xs font-bold uppercase tracking-tight">
                  <span className="text-gray-500">
                    Spreads from {plan.spread}
                  </span>
                  <HiCheckCircle className="text-emerald-500" />
                </li>
              </ul>
              <button
                onClick={() => handlePurchase(plan.name, plan.price, "Plan")}
                className="w-full py-4 rounded-xl bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-sky-500 hover:text-white transition-all"
              >
                Fund Trading
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: SIGNALS */}
      <section className="max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
            <HiOutlineSignal className="animate-pulse" /> Neural Intelligence
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
            Signal <span className="text-gray-600">Intelligence.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {signalPlans.map((plan, i) => (
            <div
              key={i}
              className={`p-8 rounded-[2rem] border ${plan.color} bg-[#0A0C10] relative group overflow-hidden`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                <HiOutlineCpuChip size={100} />
              </div>
              <h3 className="text-lg font-black text-white uppercase italic mb-1">
                {plan.name}
              </h3>
              <p className="text-2xl font-black text-white mb-6">
                ${plan.price.toLocaleString()}
              </p>
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl mb-8 border border-white/5">
                <div className="p-2 bg-amber-500/20 rounded-lg text-amber-500">
                  <HiOutlineSignal />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-500">
                    Precision Boost
                  </p>
                  <p className="text-sm font-bold text-white">
                    {plan.strength}
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  handlePurchase(plan.name, plan.price, "Signal Tier")
                }
                className="w-full py-4 rounded-xl border border-white/10 text-white font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all"
              >
                Purchase Signals Plan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: STAKING PROTOCOL */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
            <HiOutlineLockClosed /> Vault Protocol
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
            Asset <span className="text-gray-600">Staking.</span>
          </h2>
        </div>

        <div className="bg-[#0A0C10] border border-indigo-500/20 rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
          <div className="relative z-10">
            <div className="grid gap-4 mb-12">
              {stakingPlans.map((plan, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <HiOutlineClock
                      className="text-indigo-400 group-hover:rotate-12 transition-transform"
                      size={20}
                    />
                    <span className="text-white font-black uppercase italic tracking-tight">
                      {plan.days}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-emerald-500 font-mono font-bold text-lg">
                      {plan.return}
                    </span>
                    <HiCheckCircle className="text-emerald-500/50" size={18} />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() =>
                handlePurchase("Vault Staking", 2500, "Staking Vault")
              }
              className="w-full py-6 rounded-2xl bg-indigo-600 text-white font-black uppercase text-xs tracking-[0.3em] hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20 active:scale-[0.98]"
            >
              Fund Staking Vault
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvestmentPlans;
