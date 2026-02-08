import React from "react";

const steps = [
  {
    id: "01",
    title: "Create Account",
    desc: "Complete our secure verification process to unlock your dashboard.",
  },
  {
    id: "02",
    title: "Allocate Capital",
    desc: "Deposit funds via our secure encrypted gateway using crypto or fiat.",
  },
  {
    id: "03",
    title: "Deploy AI",
    desc: "Select your preferred tier and let our algorithms begin market analysis.",
  },
  {
    id: "04",
    title: "Harvest Gains",
    desc: "Watch your portfolio grow in real-time and withdraw at your convenience.",
  },
];

const Workflow = () => {
  return (
    <section className="py-24 bg-[#05070A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              {/* Animated Number Background */}
              <div className="absolute -top-10 -left-4 text-8xl font-black text-white/3 group-hover:text-sky-500/5 transition-colors">
                {step.id}
              </div>

              <div className="relative z-10">
                <div className="h-1 w-12 bg-sky-500 mb-6 group-hover:w-24 transition-all duration-500" />
                <h4 className="text-xl font-bold text-white mb-4">
                  {step.title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;
