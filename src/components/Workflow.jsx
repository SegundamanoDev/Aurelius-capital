import React from "react";

const steps = [
  {
    title: "Institutional Onboarding",
    desc: "Complete our secure, multi-tier verification process to gain full access to the trading terminal.",
  },
  {
    title: "Capital Allocation",
    desc: "Fund your account through our encrypted gateway using global fiat channels or digital assets.",
  },
  {
    title: "Strategic Execution",
    desc: "Execute trades with deep liquidity and institutional execution speeds across all major markets.",
  },
];

const Workflow = () => {
  return (
    <section className="py-24 bg-white dark:bg-[#0a0c10] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-sky-600 text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Operational Protocol
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            A streamlined path to <br className="hidden md:block" /> global
            market access.
          </h3>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {steps.map((step, i) => (
            <div key={i} className="group relative flex flex-col">
              {/* Animated Top Border */}
              <div className="w-full h-[1px] bg-gray-200 dark:bg-white/10 mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-0 bg-sky-600 group-hover:w-full transition-all duration-700 ease-in-out" />
              </div>

              {/* Content */}
              <div className="flex flex-col">
                <h4 className="text-gray-900 dark:text-white text-xl font-bold mb-4 tracking-tight group-hover:text-sky-600 transition-colors duration-300">
                  {step.title}
                </h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>

              {/* Sub-label */}
              <div className="mt-10 flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">
                  Phase 0{i + 1}
                </span>
                <div className="h-[1px] w-4 bg-gray-300 dark:bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;
