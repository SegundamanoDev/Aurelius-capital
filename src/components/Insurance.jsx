import React from "react";
import {
  HiOutlineShieldCheck,
  HiOutlineHomeModern,
  HiOutlineBanknotes,
  HiOutlineLockClosed,
} from "react-icons/hi2";

const Insurance = () => {
  const protections = [
    {
      title: "Segregated Client Accounts",
      desc: "Client funds are held in fully segregated accounts and are never merged with company operating funds or used for proprietary investments. This strict separation ensures that client capital remains protected from company liabilities.",
      icon: <HiOutlineLockClosed />,
    },
    {
      title: "Tier 1 Banking",
      desc: "All client funds are held with reputable Tier 1 banking institutions, ensuring the highest standards of financial strength, liquidity, and oversight under strict regulatory supervision.",
      icon: <HiOutlineHomeModern />,
    },
    {
      title: "Strong Capital Position",
      desc: "With over USD 32 million in paid-up capital, we maintain a strong financial foundation. This base demonstrates resilience and the ability to meet obligations under all market conditions.",
      icon: <HiOutlineBanknotes />,
    },
    {
      title: "FDIC Insurance Protection",
      desc: "Funds held with Tier 1 banks are FDIC insured, providing an additional layer of protection alongside advanced encryption and secure infrastructure protocols.",
      icon: <HiOutlineShieldCheck />,
    },
  ];

  return (
    <div className="bg-[#05070A] text-slate-300 min-h-screen pb-32 overflow-hidden">
      {/* 1. SECURE HEADER */}
      <section className="relative pt-24 pb-20 px-6 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-emerald-500/10 text-emerald-500 p-4 rounded-full animate-pulse">
              <HiOutlineShieldCheck size={48} />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter">
            Capital{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500">
              Protection.
            </span>
          </h1>
          <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto">
            The Aurelius Alpha Protocol operates under a Fortress Mandate. Your
            assets are shielded by Tier-1 banking infrastructure and
            institutional-grade insurance.
          </p>
        </div>
      </section>

      {/* 2. CORE PROTECTIONS GRID */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden">
          {protections.map((p, i) => (
            <div
              key={i}
              className="p-12 md:p-16 bg-[#05070A] hover:bg-white/[0.02] transition-colors group"
            >
              <div className="text-sky-500 mb-8 transform group-hover:scale-110 transition-transform duration-500">
                {React.cloneElement(p.icon, { size: 40 })}
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic mb-4">
                {p.title}
              </h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CAPITAL VERIFICATION BANNER */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-sky-500/20 rounded-[2.5rem] blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative bg-[#0A0C10] border border-white/10 rounded-[2.5rem] p-10 md:p-16 text-center">
            <h2 className="text-sm font-black text-emerald-500 uppercase tracking-[0.5em] mb-4">
              Verified Capital Reserve
            </h2>
            <div className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
              $32,000,000<span className="text-sky-500 text-3xl">+</span>
            </div>
            <p className="text-gray-500 max-w-xl mx-auto text-sm uppercase font-black tracking-widest">
              Total Paid-up Capital Base for Global Operations
            </p>
          </div>
        </div>
      </section>

      {/* 4. TRUST FOOTNOTE */}
      <section className="mt-24 text-center px-6">
        <div className="max-w-3xl mx-auto border-t border-white/5 pt-12">
          <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em] leading-loose">
            Aurelius strictly adheres to ISO 27001 data protection standards.
            Insurance coverage is subject to specific Tier-1 bank policy limits
            and regional regulatory jurisdictions.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Insurance;
