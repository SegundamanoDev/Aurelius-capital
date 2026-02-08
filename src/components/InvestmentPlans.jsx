import React from "react";
import { HiCheckCircle } from "react-icons/hi2";

const plans = [
  {
    name: "Starter",
    range: "$500 - $4,999",
    roi: "1.5%",
    duration: "Daily",
    features: ["Standard Support", "AI Market Analysis", "Weekly Reports"],
    popular: false,
    color: "border-slate-800",
  },
  {
    name: "Professional",
    range: "$5,000 - $24,999",
    roi: "2.8%",
    duration: "Daily",
    features: [
      "Priority Support",
      "Advanced AI Signals",
      "Daily Reports",
      "Dedicated Manager",
    ],
    popular: true,
    color: "border-sky-500/50",
  },
  {
    name: "Institutional",
    range: "$25,000+",
    roi: "4.5%",
    duration: "Daily",
    features: [
      "24/7 VIP Support",
      "Custom Algorithmic Tiers",
      "Instant Withdrawals",
      "Legal Consultation",
    ],
    popular: false,
    color: "border-slate-800",
  },
];

const InvestmentPlans = () => {
  return (
    <section className="py-24 bg-[#05070A] px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sky-400 font-bold uppercase tracking-widest text-sm mb-4">
            Investment Portfolios
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tailored Growth Tiers
          </h3>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Choose a portfolio that aligns with your financial goals. Our AI
            models optimize returns based on your selected liquidity tier.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative p-8 rounded-3xl border bg-white/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 ${plan.color} ${plan.popular ? "shadow-[0_0_40px_-10px_rgba(14,165,233,0.3)]" : ""}`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full tracking-widest">
                  Most Popular
                </span>
              )}

              <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
              <p className="text-gray-500 text-sm mb-6">{plan.range}</p>

              <div className="mb-8">
                <span className="text-5xl font-bold text-white">
                  {plan.roi}
                </span>
                <span className="text-gray-400 ml-2">/ {plan.duration}</span>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-sm text-gray-400"
                  >
                    <HiCheckCircle
                      className="text-sky-400 flex-shrink-0"
                      size={18}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? "bg-sky-500 text-white hover:bg-sky-400" : "bg-white/10 text-white hover:bg-white/20"}`}
              >
                Invest Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentPlans;
