import React from "react";
import {
  HiOutlineShieldCheck,
  HiOutlineLightBulb,
  HiOutlineGlobeAlt,
  HiOutlineArrowTrendingUp, // Corrected name for hi2
} from "react-icons/hi2";

const features = [
  {
    title: "Military-Grade Security",
    desc: "Your assets are shielded by multi-sig cold storage and end-to-end encryption protocols.",
    icon: <HiOutlineShieldCheck className="text-sky-400" />,
    bg: "bg-sky-500/5",
  },
  {
    title: "AI-Driven Insights",
    desc: "Proprietary neural networks analyze 24/7 market sentiment to identify high-yield opportunities.",
    icon: <HiOutlineLightBulb className="text-emerald-400" />,
    bg: "bg-emerald-500/5",
  },
  {
    title: "Global Compliance",
    desc: "Fully regulated frameworks ensure your investments are handled with absolute transparency.",
    icon: <HiOutlineGlobeAlt className="text-purple-400" />,
    bg: "bg-purple-500/5",
  },
  {
    title: "Compound Growth",
    desc: "Our automated rebalancing engine optimizes your portfolio to maximize long-term wealth.",
    icon: <HiOutlineArrowTrendingUp className="text-amber-400" />, // Updated here
    bg: "bg-amber-500/5",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-[#05070A] px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-sky-400 font-bold uppercase tracking-widest text-sm mb-4">
            Why Aurelius?
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white max-w-2xl mx-auto leading-tight">
            Built for the modern investor who demands{" "}
            <span className="text-gray-500">superior performance.</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className={`p-8 rounded-3xl border border-white/5 ${f.bg} hover:border-white/10 transition-all group`}
            >
              <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{f.title}</h4>
              <p className="text-gray-500 leading-relaxed text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
