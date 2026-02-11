import React from "react";
import {
  HiOutlineShieldCheck,
  HiOutlineCpuChip, // Changed for a more tech feel
  HiOutlineGlobeAlt,
  HiOutlineChartBar, // Changed for a terminal feel
} from "react-icons/hi2";

const features = [
  {
    title: "Institutional Security",
    desc: "Your capital is shielded by multi-sig cold storage and enterprise-grade end-to-end encryption protocols.",
    icon: <HiOutlineShieldCheck />,
    tag: "Secured",
  },
  {
    title: "Alpha Intelligence",
    desc: "Proprietary neural networks analyze global market sentiment 24/7 to identify high-probability entry points.",
    icon: <HiOutlineCpuChip />,
    tag: "AI-Powered",
  },
  {
    title: "Global Compliance",
    desc: "Operating within fully regulated frameworks to ensure absolute transparency and investor protection.",
    icon: <HiOutlineGlobeAlt />,
    tag: "Regulated",
  },
  {
    title: "Neural Rebalancing",
    desc: "Our automated engine optimizes your portfolio in real-time, capturing growth while mitigating downside risk.",
    icon: <HiOutlineChartBar />,
    tag: "High Yield",
  },
];

const Features = () => {
  return (
    <section className="py-32 bg-[#05070A] px-6 relative overflow-hidden">
      {/* Background visual element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px " />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="!text-sky-500 font-black uppercase tracking-[0.4em] text-[10px]">
              The Alpha Protocol
            </h2>
            <h3 className="text-4xl md:text-6xl font-black text-white leading-[0.9] uppercase italic tracking-tighter">
              Engineered for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                Performance.
              </span>
            </h3>
          </div>
          <p className="max-w-md text-gray-500 text-sm font-medium leading-relaxed border-l border-white/10 pl-8">
            Aurelius provides the infrastructure of the elite. Move away from
            retail noise and execute with the precision of a Tier-1 institution.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-10 transition-all duration-500 group relative border-b-1 border-gray-800"
            >
              {/* Top Row: Icon & Tag */}
              <div className="flex justify-between items-start mb-12">
                <div className="text-sky-500 text-3xl group-hover:scale-110 transition-transform duration-500">
                  {f.icon}
                </div>
                <span className="font-mono text-[9px] font-black text-gray-600 uppercase tracking-widest border border-white/10 px-2 py-1 rounded">
                  {f.tag}
                </span>
              </div>

              {/* Text Content */}
              <div className="space-y-4">
                <h4 className="text-lg font-black text-white uppercase italic tracking-tight group-hover:text-sky-500 transition-colors">
                  {f.title}
                </h4>
                <p className="text-gray-500 leading-relaxed text-xs font-medium">
                  {f.desc}
                </p>
              </div>

              {/* Hover Decoration */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-sky-500 group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
