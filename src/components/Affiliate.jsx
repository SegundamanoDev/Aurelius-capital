import React from "react";
import { HiOutlineUserGroup, HiOutlineCurrencyDollar } from "react-icons/hi2";

const Affiliate = () => {
  return (
    <section className="py-24 bg-[#05070A] px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-linear-to-br from-slate-900 to-[#05070A] border border-white/5 rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
          {/* Subtle background icon */}
          <HiOutlineUserGroup className="absolute -right-10 -bottom-10 text-white/2 text-[300px] pointer-events-none" />

          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sky-500 text-[10px] font-bold uppercase tracking-widest">
              Partnership Program
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Earn <span className="text-sky-500 text-6xl">6%</span> <br />
              in Passive Rewards.
            </h3>
            <p className="text-gray-400 text-lg">
              Introduce your network to the future of AI-driven capital
              management. Our multi-tier affiliate system rewards you for every
              successful portfolio allocation in your circle.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-sky-500 hover:bg-sky-500 text-black px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/10">
                Get Referral Link
              </button>
              <div className="flex items-center gap-3 text-white/60 px-4">
                <HiOutlineCurrencyDollar className="text-sky-500 text-2xl" />
                <span className="text-sm font-medium">
                  Instant Payouts to Wallet
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-sm">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center backdrop-blur-sm"
                >
                  <div className="h-8 w-8 bg-sky-500/20 rounded-full mx-auto mb-3" />
                  <div className="h-2 w-12 bg-white/20 rounded-full mx-auto mb-2" />
                  <div className="h-2 w-8 bg-white/10 rounded-full mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Affiliate;
