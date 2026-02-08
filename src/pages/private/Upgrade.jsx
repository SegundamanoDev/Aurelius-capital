import React from "react";
import {
  HiOutlineCheckBadge,
  HiOutlineBolt,
  HiOutlineGlobeAlt,
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
} from "react-icons/hi2";

const Upgrade = () => {
  const tiers = [
    {
      name: "Standard",
      price: "Free",
      description:
        "Essential tools for the retail trader starting their journey.",
      features: [
        "Basic Charting",
        "Standard Support",
        "Manual Withdrawals",
        "Basic Copy Trading",
      ],
      button: "Current Plan",
      featured: false,
      color: "border-white/10",
    },
    {
      name: "Silver Pro",
      price: "$499",
      period: "/month",
      description:
        "Advanced algorithms and faster execution for growing portfolios.",
      features: [
        "Priority Support",
        "Reduced Trading Fees",
        "Auto-Profit Reinvestment",
        "5 Master Trader Slots",
      ],
      button: "Upgrade to Pro",
      featured: true,
      color: "border-sky-500/50",
    },
    {
      name: "Gold Institutional",
      price: "$1,999",
      period: "/month",
      description:
        "The ultimate terminal experience for high-net-worth investors.",
      features: [
        "1-on-1 Account Manager",
        "Zero Fee Withdrawals",
        "Unlimited Copy Trading",
        "Insider Market Signals",
        "VIP Events Access",
      ],
      button: "Go Institutional",
      featured: false,
      color: "border-amber-500/50",
    },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
          Elevate Your Terminal
        </h1>
        <p className="text-gray-500 text-sm">
          Unlock institutional-grade features, lower fees, and dedicated
          support. Choose the tier that matches your ambition.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {tiers.map((tier, i) => (
          <div
            key={i}
            className={`relative bg-[#05070A] border ${tier.color} rounded-[2.5rem] p-8 transition-all hover:translate-y-[-8px] flex flex-col h-full ${tier.featured ? "shadow-[0_0_40px_rgba(14,165,233,0.1)] bg-gradient-to-b from-sky-500/[0.03] to-transparent" : ""}`}
          >
            {tier.featured && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-500 text-black text-[10px] font-black uppercase px-4 py-1.5 rounded-full tracking-widest shadow-lg shadow-sky-500/40">
                Most Popular
              </span>
            )}

            <div className="mb-8">
              <h3
                className={`text-xl font-black uppercase italic ${tier.name.includes("Gold") ? "text-amber-500" : "text-white"}`}
              >
                {tier.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white tracking-tighter">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-gray-500 font-bold text-sm">
                    {tier.period}
                  </span>
                )}
              </div>
              <p className="mt-4 text-xs text-gray-500 leading-relaxed font-medium">
                {tier.description}
              </p>
            </div>

            <div className="space-y-4 mb-10 flex-grow">
              {tier.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <HiOutlineCheckBadge
                    className={tier.featured ? "text-sky-500" : "text-gray-600"}
                    size={18}
                  />
                  <span className="text-xs text-gray-300 font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <button
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all ${
                tier.button === "Current Plan"
                  ? "bg-white/5 text-gray-500 cursor-default"
                  : tier.name.includes("Gold")
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20 hover:bg-amber-400"
                    : "bg-sky-500 text-black shadow-lg shadow-sky-500/20 hover:bg-sky-400"
              }`}
            >
              {tier.button}
            </button>
          </div>
        ))}
      </div>

      {/* Feature Showcase (Visual Trust) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
        {[
          {
            icon: <HiOutlineBolt />,
            title: "Instant Execution",
            desc: "Latency reduced by 40% on Pro+ tiers.",
          },
          {
            icon: <HiOutlineGlobeAlt />,
            title: "Global Markets",
            desc: "Access to 50+ international exchanges.",
          },
          {
            icon: <HiOutlineUserGroup />,
            title: "VIP Community",
            desc: "Exclusive signal groups for Institutional.",
          },
          {
            icon: <HiOutlineAcademicCap />,
            title: "Expert Analysis",
            desc: "Weekly market deep-dives from pros.",
          },
        ].map((item, i) => (
          <div key={i} className="p-6 border-l border-white/5 space-y-3">
            <div className="text-sky-500">{item.icon}</div>
            <h5 className="text-white font-bold text-sm uppercase tracking-tight">
              {item.title}
            </h5>
            <p className="text-xs text-gray-500 leading-tight">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upgrade;
