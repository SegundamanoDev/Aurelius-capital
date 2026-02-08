import React from "react";

const logos = ["Bloomberg", "CNBC", "Forbes", "Reuters", "Nasdaq", "CoinDesk"];

const LogoTicker = () => {
  return (
    <div className="py-12 bg-[#05070A] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em]">
          Global Institutional Partners
        </p>
      </div>

      {/* Infinite Scroll Container */}
      <div className="flex w-full overflow-hidden">
        <div className="flex animate-infinite-scroll whitespace-nowrap gap-20 items-center">
          {/* Duplicate the array to ensure seamless looping */}
          {[...logos, ...logos].map((logo, index) => (
            <span
              key={index}
              className="text-2xl md:text-4xl font-bold text-gray-700 hover:text-gray-400 transition-colors cursor-default grayscale"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoTicker;
