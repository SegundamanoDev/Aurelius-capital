import React from "react";
import {
  HiOutlineShieldCheck,
  HiOutlineCpuChip,
  HiOutlineChartPie,
} from "react-icons/hi2";

const pillars = [
  {
    title: "Fortress-Level Security",
    desc: "Your assets are shielded by multi-layer AES-256 encryption and cold-storage protocols, ensuring institutional-grade protection.",
    icon: <HiOutlineShieldCheck className="text-sky-400" size={32} />,
    bgImage:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
  },
  {
    title: "Neural Market Synthesis",
    desc: "Our proprietary AI doesn't just trade—it evolves. It processes millions of global data points per second to find inefficiencies.",
    icon: <HiOutlineCpuChip className="text-emerald-400" size={32} />,
    bgImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
  },
  {
    title: "Absolute Transparency",
    desc: "Experience zero hidden fees and real-time audit logs. Every movement of your capital is tracked and visible 24/7.",
    icon: <HiOutlineChartPie className="text-amber-400" size={32} />,
    bgImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
  },
];

const Overview = () => {
  return (
    <section className="bg-[#05070A] py-0">
      {pillars.map((item, index) => (
        <div
          key={index}
          className="relative h-[60vh] md:h-[70vh] w-full flex items-center overflow-hidden border-b border-white/5"
        >
          {/* Background Image with Parallax-like effect */}
          <div
            className="absolute inset-0 bg-fixed bg-cover bg-center"
            style={{ backgroundImage: `url(${item.bgImage})` }}
          />

          {/* Linear Gradient Overlay (Dark to Transparent) */}
          <div className="absolute inset-0 bg-linear-to-r from-[#05070A] via-[#05070A]/90 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-xl space-y-4 transform hover:translate-x-2 transition-transform duration-500">
              <div className="bg-white/5 w-fit p-3 rounded-2xl backdrop-blur-md border border-white/10">
                {item.icon}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                {item.title}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                {item.desc}
              </p>
              <button className="text-sky-400 font-semibold flex items-center gap-2 group mt-4">
                Learn more about our tech
                <span className="group-hover:translate-x-2 transition-transform">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Overview;
