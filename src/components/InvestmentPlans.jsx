import React, { useState } from "react";
import {
  MdCheck,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import InvestmentPromo from "./InvestentTrade";

const PricingCard = ({ plan }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Number of features to show initially
  const initialLimit = 6;
  const displayFeatures = isExpanded
    ? plan.features
    : plan.features.slice(0, initialLimit);

  return (
    <div className="relative group p-[1px] rounded-2xl transition-all duration-500">
      {/* 1. THE ALL-ROUND GLOW: Dynamic height based on content */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2962ff]/30 via-[#2962ff]/10 to-transparent blur-[30px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

      {/* 2. THE CARD CONTENT */}
      <div className="flex flex-col h-full bg-[#131722] border border-[#363a45] rounded-2xl overflow-hidden relative z-10 group-hover:border-[#2962ff]/50 transition-all duration-300 shadow-2xl">
        {/* Header Section */}
        <div className="p-6 border-b border-[#363a45] bg-[#171b26]/50">
          <h3 className="text-xl font-bold mb-2 text-white">{plan.name}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-white">
              ${plan.price}
            </span>
          </div>
        </div>

        {/* Action Section */}
        <div className="p-6">
          <button className="w-full py-3.5 bg-[#2962ff] hover:bg-[#1e4bd8] text-white font-extrabold rounded-xl transition-all mb-3 shadow-lg shadow-[#2962ff]/20 active:scale-[0.98]">
            Get Now
          </button>
        </div>

        {/* Feature List (Separated by borders) */}
        <div className="flex-grow">
          {displayFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-6 py-4 border-b border-[#363a45] last:border-0 text-[13px] hover:bg-white/5 transition-colors"
            >
              <MdCheck className="text-[#2962ff] flex-shrink-0" size={18} />
              <span className="text-gray-300">{feature}</span>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-5 w-full flex items-center justify-center gap-2 text-[11px] text-gray-400 hover:text-white uppercase tracking-widest font-bold bg-[#171b26] transition-colors border-t border-[#363a45]"
        >
          {isExpanded ? (
            <>
              Show Less <MdKeyboardArrowUp size={18} />
            </>
          ) : (
            <>
              View All Features <MdKeyboardArrowDown size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const PricingSection = () => {
  const plans = [
    {
      name: "Essential",
      price: "500.95",
      save: "24",
      features: [
        "2 charts per tab",
        "5 indicators per chart",
        "10K historical bars",
        "20 price alerts",
        "No ads",
        "Volume profile",
        "Custom timeframes",
        "Bar Replay",
        "Chart data export",
      ],
    },
    {
      name: "Plus",
      price: "1,500.29",
      save: "68",
      features: [
        "4 charts per tab",
        "10 indicators per chart",
        "10K historical bars",
        "100 price alerts",
        "Custom Range Bars",
        "Multiple watchlists",
        "Volume footprint",
        "Volume candles",
      ],
    },
    {
      name: "Premium",
      price: "2,700.49",
      save: "138",
      features: [
        "8 charts per tab",
        "25 indicators per chart",
        "20K historical bars",
        "400 price alerts",
        "Second-based intervals",
        "Tick-based intervals",
        "Auto Chart Patterns",
      ],
    },
    {
      name: "Ultimate",
      price: "4,000.95",
      save: "480",
      features: [
        "16 charts per tab",
        "50 indicators per chart",
        "40K historical bars",
        "1,000 price alerts",
        "First priority support",
        "Invite-only scripts",
        "Custom formulas",
      ],
    },
  ];

  return (
    <div className="bg-[#05070A] py-24 px-6 font-sans">
      {/* NEW UPDATED HEADING */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
          Plans for every level of ambition
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          Scale your trading with tools designed for precision and speed.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan) => (
          <PricingCard key={plan.name} plan={plan} />
        ))}
      </div>
      <InvestmentPromo />
    </div>
  );
};

export default PricingSection;
