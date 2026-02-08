import React from "react";
import {
  HiOutlineShieldCheck,
  HiOutlineArrowRight,
  HiOutlineLockClosed,
} from "react-icons/hi2";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[#05070A] flex flex-col justify-center px-6 overflow-hidden pt-20">
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-500/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* LEFT COLUMN: THE STORY */}
        <div className="lg:col-span-8 space-y-10">
          <div className="space-y-4">
            <h2 className="text-white/30 text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
              The best time to <br /> invest was 2009.
            </h2>
            <h1 className="text-6xl md:text-9xl font-black text-white uppercase italic tracking-tighter leading-[0.8] animate-in fade-in slide-in-from-left duration-1000">
              The second <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400">
                best time is now.
              </span>
            </h1>
          </div>

          <p className="max-w-xl text-gray-500 text-base md:text-lg font-medium leading-relaxed">
            Market cycles don't wait for permission. Access institutional-grade
            liquidity and neural-link execution engines to capture the next wave
            of global wealth.
          </p>

          <div className="flex flex-wrap gap-5">
            <button className="px-10 py-5 bg-white text-black rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] hover:bg-sky-500 transition-all active:scale-95 flex items-center gap-3">
              Start Trading Now <HiOutlineArrowRight size={18} />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] hover:bg-white/10 transition-all backdrop-blur-md">
              View Markets
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: THE CONFIDENCE */}
        <div className="lg:col-span-4 relative group">
          <div className="bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 p-10 rounded-[3.5rem] backdrop-blur-3xl space-y-8 relative z-10">
            <div className="w-16 h-16 bg-sky-500/20 rounded-3xl flex items-center justify-center text-sky-500 mb-6">
              <HiOutlineShieldCheck size={32} />
            </div>

            <h3 className="text-2xl font-black text-white uppercase italic leading-tight">
              Trade Confidently <br /> & Securely.
            </h3>

            <p className="text-sm text-gray-500 font-medium">
              Your assets are protected by military-grade AES-256 encryption and
              Tier-1 regulated custody protocols.
            </p>

            <ul className="space-y-3">
              {[
                { label: "SGS Audited", icon: <HiOutlineLockClosed /> },
                { label: "1:1 Reserve Ratio", icon: <HiOutlineShieldCheck /> },
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest"
                >
                  <span className="text-sky-500">{item.icon}</span> {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual glow behind the confidence card */}
          <div className="absolute inset-0 bg-sky-500/10 blur-3xl rounded-[3.5rem] -z-10 group-hover:bg-sky-500/20 transition-all duration-700" />
        </div>
      </div>

      {/* FOOTER TICKER (SUBTLE) */}
      <div className="absolute bottom-10 left-0 w-full overflow-hidden opacity-20 hover:opacity-50 transition-opacity">
        <div className="flex gap-20 animate-marquee whitespace-nowrap text-[10px] font-black text-white uppercase tracking-[0.5em]">
          <span>Institutional Liquidity</span>
          <span>•</span>
          <span>Zero-Latency Execution</span>
          <span>•</span>
          <span>Global Compliance</span>
          <span>•</span>
          <span>Neural Analysis v3.0</span>
          <span>•</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
