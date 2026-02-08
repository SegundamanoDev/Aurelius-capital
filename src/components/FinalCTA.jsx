import React from "react";

const FinalCTA = () => {
  return (
    <section className="py-20 bg-[#05070A] px-6">
      <div className="max-w-5xl mx-auto relative overflow-hidden rounded-[40px] bg-linear-to-r from-sky-600 to-indigo-600 p-12 md:p-20 text-center">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to redefine your <br className="hidden md:block" /> financial
            future?
          </h2>
          <p className="text-sky-100 text-lg mb-10 max-w-xl mx-auto opacity-90">
            Join over 124,000 investors leveraging our proprietary AI to build
            sustainable, long-term wealth.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-sky-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-xl">
              Get Started Now
            </button>
            <button className="bg-sky-700/30 backdrop-blur-md border border-sky-400/30 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-sky-700/50 transition-all">
              Contact Advisor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
