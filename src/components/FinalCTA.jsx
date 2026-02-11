import React from "react";
import {
  HiOutlineArrowRight,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-32  overflow-hidden">
      <div className=" space-y-8 flex flex-col items-center">
        <h2 className="text-4xl md:text-7xl  leading-[0.85] uppercase italic tracking-tighter">
          Ready to trade?
        </h2>

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
    </section>
  );
};

export default FinalCTA;
