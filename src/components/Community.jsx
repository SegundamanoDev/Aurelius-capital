import React from "react";

const Community = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-16 text-white font-sans px-4">
      {/* 1. Text Header Section */}
      <div className="max-w-3xl text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
          The social network for your finance life
        </h2>
        <p className="text-lg md:text-xl text-[#d1d4dc] leading-relaxed">
          Get creative with world markets by participating in the largest social
          network on the web for traders and investors.
        </p>
      </div>

      {/* 2. Image Container */}
      <div className="imgContainer-viUW_oAk img-Z8oryCMQ relative w-full max-w-4xl flex justify-center">
        <img
          className="imgPhone-viUW_oAk onlyPhone-viUW_oAk w-full h-auto object-contain"
          src="https://static.tradingview.com/static/bundles/social-network-img.dfa7144962fd44266dbd.svg"
          alt="Social network"
          loading="lazy"
        />

        {/* Decorative Glow behind the SVG to match the Globe theme */}
        <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full -z-10"></div>
      </div>
    </div>
  );
};

export default Community;
