import React from "react";
import {
  HiOutlineArrowRight,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-32 bg-[#05070A] px-6 relative overflow-hidden">
      {/* Subtle Background Glows to maintain depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sky-500/5 blur-[120px] rounded-full" />

      <div className="max-w-6xl mx-auto relative group">
        {/* The Outer Border Glow Effect */}
        <div className="absolute -inset-px bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-emerald-500/20 rounded-[3rem] blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

        {/* Main Card Container */}
        <div className="relative overflow-hidden rounded-[3rem] bg-[#0A0C10] border border-white/5 p-12 md:p-24 text-center">
          {/* Decorative Grid Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 leading-[0.85] uppercase italic tracking-tighter">
              Ready to trade?
            </h2>

            <p className="text-white text-sm md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              Get started with an easy-to-follow guide to trading tools or head
              straight to Supercharts and experience the power of chart trading.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6">
              <Link
                to="/register"
                className="group w-full sm:w-auto bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] hover:bg-sky-500 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-2xl shadow-sky-500/10"
              >
                Get Started Now{" "}
                <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/contact"
                className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-12 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] hover:bg-white/10 transition-all backdrop-blur-md flex items-center justify-center gap-3"
              >
                <HiOutlineChatBubbleLeftRight size={18} /> Contact Advisor
              </Link>
            </div>

            {/* Subtle disclaimer below buttons */}
            <p className="pt-8 text-[9px] text-gray-700 font-black uppercase tracking-[0.3em]">
              Aurelius Alpha Terminal • Secured Access Only
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
