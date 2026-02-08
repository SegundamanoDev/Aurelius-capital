import React from "react";
import { HiOutlineAcademicCap, HiOutlineLockClosed } from "react-icons/hi2";

const courses = [
  { title: "Market Psychology", level: "Beginner", modules: 12 },
  { title: "Advanced Algorithmic Trading", level: "Professional", modules: 24 },
  { title: "Macroeconomic Analysis", level: "Expert", modules: 18 },
];

const Academy = () => {
  return (
    <section className="py-24 bg-[#05070A] px-6 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-sky-400 font-bold uppercase tracking-widest text-sm mb-4">
              Aurelius Academy
            </h2>
            <h3 className="text-4xl font-bold text-white mb-4">
              Elite Financial Education
            </h3>
            <p className="text-gray-400 leading-relaxed">
              We don't just trade for you; we empower you with the same
              frameworks used by institutional desk traders. Exclusive to our
              Silver tier members and above.
            </p>
          </div>
          <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-xl text-white font-bold hover:bg-white/10 transition-all flex items-center gap-2">
            View Curriculum <HiOutlineAcademicCap size={20} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <div
              key={i}
              className="group p-1 bg-linear-to-b from-white/10 to-transparent rounded-2xl"
            >
              <div className="bg-[#0A0E17] p-6 rounded-[calc(1rem-1px)] h-full relative overflow-hidden">
                <div className="flex justify-between items-start mb-10">
                  <div className="p-3 bg-sky-500/10 rounded-lg text-sky-400">
                    <HiOutlineLockClosed size={24} />
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    {course.level}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
                  {course.title}
                </h4>
                <p className="text-gray-500 text-sm">
                  {course.modules} Learning Modules
                </p>

                {/* Progress bar aesthetic */}
                <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-0 group-hover:w-1/3 bg-sky-500 transition-all duration-1000" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Academy;
