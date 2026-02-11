import React from "react";
import {
  HiOutlineShieldCheck,
  HiOutlineCpuChip,
  HiOutlineGlobeAmericas,
  HiOutlineServerStack,
  HiOutlineCheckBadge,
  HiOutlineAcademicCap,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

const About = () => {
  const stats = [
    { label: "Quarterly Volume", value: "$439K+" },
    { label: "Global Users", value: "500K+" },
    { label: "Execution Speed", value: "0.01ms" },
    { label: "Uptime", value: "99.99%" },
  ];

  const values = [
    {
      title: "Institutional Infrastructure",
      desc: "We provide retail traders with the same low-latency execution engines used by Tier-1 hedge funds.",
      icon: <HiOutlineServerStack size={28} />,
    },
    {
      title: "Advanced Security",
      desc: "Multi-sig cold storage and end-to-end encryption ensure your digital assets remain untouchable.",
      icon: <HiOutlineShieldCheck size={28} />,
    },
    {
      title: "AI-Driven Insights",
      desc: "Our proprietary Alpha Protocol uses neural networks to filter market noise into actionable signals.",
      icon: <HiOutlineCpuChip size={28} />,
    },
  ];

  return (
    /* Added overflow-hidden and max-w-full here to kill the horizontal scroll */
    <div className="space-y-20 animate-in fade-in duration-1000 pb-32 overflow-hidden max-w-full">
      {/* 1. HERO SECTION */}
      <section className="text-center max-w-4xl mx-auto pt-10 px-4">
        <h2 className="text-[10px] font-black text-sky-500 uppercase tracking-[0.4em] mb-4">
          The Aurelius Alpha Protocol
        </h2>
        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight uppercase italic">
          Redefining the Edge of{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
            Modern Finance
          </span>
        </h1>
        <p className="mt-6 text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium">
          Aurelius was founded to bridge the gap between institutional
          technology and individual ambition. We provide the speed, depth, and
          intelligence required to navigate today's volatile markets.
        </p>
      </section>

      {/* 2. LIVE STATS GRID */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 max-w-7xl mx-auto">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-[#05070A] border border-white/5 p-8 rounded-[2rem] text-center group hover:border-sky-500/30 transition-all"
          >
            <h3 className="text-2xl md:text-3xl font-black text-white mb-1">
              {stat.value}
            </h3>
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      {/* 3. CORE VALUES / WHY US */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
        {values.map((v, i) => (
          <div key={i} className="space-y-4 p-4">
            <div className="text-sky-500 bg-sky-500/10 w-fit p-4 rounded-2xl">
              {v.icon}
            </div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight">
              {v.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              {v.desc}
            </p>
          </div>
        ))}
      </section>

      {/* 4. REGULATORY & TRUST BANNER */}
      <section className="px-4 max-w-7xl mx-auto">
        <div className="bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest">
              <HiOutlineCheckBadge size={18} /> Fully Verified & Compliant
            </div>
            <h2 className="text-3xl font-black text-white uppercase italic">
              Built on Transparency.
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              We operate with a strict 1:1 reserve policy. Every dollar of
              customer funds is held separately from corporate accounts, audited
              quarterly by Tier-1 accounting firms.
            </p>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-white font-bold text-sm">FCA / ASIC</p>
                <p className="text-[9px] text-gray-600 font-black uppercase tracking-tighter">
                  Licensed
                </p>
              </div>
              <div className="text-center border-l border-white/10 pl-6">
                <p className="text-white font-bold text-sm">SGS / ISO</p>
                <p className="text-[9px] text-gray-600 font-black uppercase tracking-tighter">
                  Certified
                </p>
              </div>
            </div>
          </div>

          {/* Security Graphic - Fixed to prevent overflow */}
          <div className="flex-1 w-full max-w-[400px]">
            <div className="aspect-square bg-sky-500/5 border border-sky-500/10 rounded-full flex items-center justify-center relative overflow-hidden">
              {/* The animate-ping can cause horizontal scrolling if not contained */}
              <div className="absolute inset-4 border border-sky-500/20 rounded-full animate-ping pointer-events-none" />
              <HiOutlineGlobeAmericas
                size={120}
                className="text-sky-500/20 relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="text-center px-4 pb-10">
        <div className="max-w-xl mx-auto space-y-6">
          <HiOutlineAcademicCap size={40} className="mx-auto text-gray-700" />
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
            Ready to enter the arena?
          </h2>
          <p className="text-gray-500 text-xs uppercase font-black tracking-widest">
            Join 180,000+ Institutional-Grade Traders
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-black px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-sky-500 transition-all active:scale-95"
          >
            Create Live Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
