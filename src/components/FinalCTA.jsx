import React from "react";
import {
  HiOutlineArrowRight,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-32 bg-white dark:bg-[#0a0c10] border-t border-gray-100 dark:border-white/5 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {/* The Hook */}
        <h2 className="text-5xl md:text-8xl font-black text-gray-900 dark:text-white leading-none uppercase italic tracking-tighter mb-4">
          Market <span className="text-sky-600">Maturity</span>
          <br /> Starts Here.
        </h2>

        <p className="max-w-xl text-gray-500 dark:text-gray-400 text-sm md:text-base font-medium leading-relaxed mb-12 uppercase tracking-wide">
          Join an elite network of institutional traders and verified
          specialists. Access deep liquidity and real-time social sentiment
          data.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
          {/* Primary Action: Conversion */}
          <Link
            to="/register"
            className="group w-full sm:w-auto py-5 px-10 bg-sky-600 hover:bg-sky-500 text-white font-bold uppercase text-[11px] tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-sky-600/20 active:scale-[0.98] flex items-center justify-center gap-3"
          >
            Open Live Account
            <HiOutlineArrowRight
              className="group-hover:translate-x-1 transition-transform"
              size={18}
            />
          </Link>

          {/* Secondary Action: Support/Trust */}
          <Link
            to="/contact"
            className="w-full sm:w-auto bg-transparent border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white px-10 py-5 rounded-lg font-bold uppercase text-[11px] tracking-[0.2em] hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-3"
          >
            <HiOutlineChatBubbleLeftRight size={18} /> Speak with an Advisor
          </Link>
        </div>

        {/* Brand/Security Footer */}
        <div className="mt-16 flex items-center gap-4 opacity-40">
          <div className="h-[1px] w-8 bg-gray-400" />
          <p className="text-[9px] text-gray-900 dark:text-white font-bold uppercase tracking-[0.4em]">
            Aurelius Alpha Terminal • Secure Node Verified
          </p>
          <div className="h-[1px] w-8 bg-gray-400" />
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
