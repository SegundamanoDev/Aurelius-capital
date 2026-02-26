import React from "react";

const Community = () => {
  return (
    <section className="relative flex flex-col items-center justify-center w-full py-24 px-6 bg-white dark:bg-[#0a0c10] transition-colors duration-300 overflow-hidden">
      {/* 1. Header Section */}
      <div className="max-w-4xl text-center mb-16 relative z-10">
        <h2 className="text-sky-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-4">
          Collaborative Intelligence
        </h2>

        <h3 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9] text-gray-900 dark:text-white uppercase italic">
          The Social Network <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
            For Global Finance.
          </span>
        </h3>

        <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-3xl mx-auto">
          Stop trading in the dark. Connect with the elite, copy the bold, and
          turn every market move into a shared victory. The future isn't just
          digital it's collaborative.
        </p>
      </div>

      {/* 2. Visual Container */}
      <div className="relative w-full max-w-5xl flex justify-center group">
        {/* Dynamic Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-sky-500/20 dark:bg-blue-600/10 blur-[100px] rounded-full -z-10 group-hover:bg-sky-500/30 transition-all duration-700"></div>

        {/* The Graphic */}
        <div className="relative p-4 md:p-8 bg-white/5 dark:bg-transparent rounded-[3rem] border border-gray-100 dark:border-white/5 backdrop-blur-sm">
          <img
            className="w-full h-auto object-contain max-h-[500px] drop-shadow-2xl"
            src="https://static.tradingview.com/static/bundles/social-network-img.dfa7144962fd44266dbd.svg"
            alt="Aurelius Social Network"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default Community;
