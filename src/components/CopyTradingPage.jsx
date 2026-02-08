import React from "react";
import {
  HiOutlineUserGroup,
  HiOutlineChartBarSquare,
  HiOutlineCpuChip,
  HiOutlineShieldCheck,
  HiOutlineArrowPathRoundedSquare,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

const CopyTradingPage = () => {
  return (
    <div className="bg-[#05070A] text-slate-300 min-h-screen pb-32 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <HiOutlineUserGroup className="text-sky-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
              Social Trading Protocol
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.85] uppercase italic tracking-tighter mb-8">
            The Power of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
              Mirror Execution.
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed font-medium">
            Copy trading allows you to directly copy the positions taken by
            seasoned experts. When they move, you move. Automatically. In
            real-time.
          </p>
        </div>
      </section>

      {/* 2. THE CORE CONCEPT */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center mb-32">
        <div className="space-y-6">
          <h2 className="text-3xl font-black text-white uppercase italic">
            It's all in the name.
          </h2>
          <p className="leading-relaxed">
            Decide the amount you wish to invest and simply copy everything they
            do automatically. When that trader makes a trade, your account makes
            that same trade as well. You get the identical returns on each trade
            as your chosen trader.
          </p>
          <div className="p-6 bg-white/[0.02] border-l-4 border-sky-500 rounded-r-2xl">
            <p className="italic text-sky-400 font-medium">
              "No advanced knowledge of the financial market is required to take
              part. Capitalize on the skills of veterans while maintaining 100%
              control of your funds."
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
            <h3 className="text-white font-black text-3xl mb-2">1 in 3</h3>
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Find stocks over-complex
            </p>
          </div>
          <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
            <h3 className="text-white font-black text-3xl mb-2">25%</h3>
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Considering Copy Trading
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW THE COPIER WORKS (THE BLUEPRINT) */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="bg-[#0A0C10] border border-white/5 rounded-[3rem] overflow-hidden">
          <div className="grid lg:grid-cols-3">
            <div className="p-12 border-b lg:border-b-0 lg:border-r border-white/5">
              <HiOutlineCpuChip className="text-sky-500 text-4xl mb-6" />
              <h3 className="text-xl font-black text-white uppercase italic mb-4">
                Zero Input Required
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                There are no codes to run or signals to manually input. Our
                software handles the trade copying automatically on your behalf.
              </p>
            </div>
            <div className="p-12 border-b lg:border-b-0 lg:border-r border-white/5">
              <HiOutlineArrowPathRoundedSquare className="text-emerald-500 text-4xl mb-6" />
              <h3 className="text-xl font-black text-white uppercase italic mb-4">
                Percentage Allocation
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                If your expert takes a position for 10% of their account, the
                copier executes a trade in your account for 10% of your account
                value.
              </p>
            </div>
            <div className="p-12">
              <HiOutlineShieldCheck className="text-indigo-500 text-4xl mb-6" />
              <h3 className="text-xl font-black text-white uppercase italic mb-4">
                Account Segregation
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Unlike managing funds in one account, we believe segregation is
                the only way. You stay in control of your funds at all times.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TECHNICAL DETAILS SECTION */}
      <section className="max-w-5xl mx-auto px-6 mb-32 space-y-20">
        <div className="text-center">
          <h2 className="text-4xl font-black text-white uppercase italic mb-6">
            Who are the experts?
          </h2>
          <p className="text-gray-400 leading-relaxed">
            We carefully select expert applicants. We get to know them as
            traders and examine their performance over time. We look for social
            proof and consistent history to confirm competence. Every expert has
            an individual performance page for full transparency.
          </p>
        </div>

        <div className="bg-sky-500/5 border border-sky-500/10 rounded-[2.5rem] p-10 md:p-16">
          <h3 className="text-2xl font-black text-white uppercase italic mb-8 flex items-center gap-4">
            <span className="w-12 h-1px bg-sky-500" /> Essential Requirements
          </h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <p className="text-white font-bold uppercase tracking-widest text-xs text-sky-500">
                Base Currency
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                You must have enough available base currency. We recommend
                maintaining at least 10% or higher in available base currency to
                avoid missed trades during rapid executions.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-white font-bold uppercase tracking-widest text-xs text-sky-500">
                Minimum Liquidity
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                To meet exchange minimums (approx. $10/trade), an account total
                value of $300 (at 100% allocation) is necessary to mirror a 5%
                expert order effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="text-center px-6">
        <div className="max-w-2xl mx-auto py-20 border-t border-white/5">
          <h2 className="text-3xl font-black text-white uppercase italic mb-8">
            Ready to follow the experts?
          </h2>
          <Link
            to="/register"
            className="inline-block bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-sky-500 transition-all"
          >
            Join the Alpha Copier
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CopyTradingPage;
