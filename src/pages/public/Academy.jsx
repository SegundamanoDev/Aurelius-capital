import React from "react";
import {
  HiOutlinePlayCircle,
  HiOutlineBookOpen,
  HiOutlineAcademicCap,
  HiOutlineLightBulb,
  HiOutlineSignal,
  HiOutlineChevronRight,
  HiOutlineClock,
} from "react-icons/hi2";

const Academy = () => {
  const categories = [
    "All Levels",
    "Technical Analysis",
    "Risk Management",
    "Psychology",
    "Forex Mastery",
  ];

  const courses = [
    {
      title: "Introduction to Liquidity Pools",
      level: "Beginner",
      duration: "45 min",
      lessons: 12,
      thumbnail: "LP",
      category: "Technical Analysis",
      progress: 0,
    },
    {
      title: "Advanced Fibonacci Retracement",
      level: "Intermediate",
      duration: "1h 20min",
      lessons: 8,
      thumbnail: "FB",
      category: "Technical Analysis",
      progress: 65,
    },
    {
      title: "The Psychology of Large Scale Drawdowns",
      level: "Professional",
      duration: "2h 15min",
      lessons: 15,
      thumbnail: "PSY",
      category: "Psychology",
      progress: 0,
    },
    {
      title: "Algorithmic Hedging Strategies",
      level: "Professional",
      duration: "3h 45min",
      lessons: 22,
      thumbnail: "ALG",
      category: "Risk Management",
      progress: 10,
    },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-32 px-4 md:px-0">
      {/* 1. ACADEMY HERO */}
      <section className="relative bg-[#05070A] border border-white/5 rounded-[3rem] p-10 md:p-16 overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-sky-500 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
            <HiOutlineAcademicCap size={18} /> Elite Trading Education
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase italic">
            Master the <span className="text-sky-500">Markets</span> <br />
            with Institutional Intelligence.
          </h1>
          <p className="mt-4 text-gray-400 font-medium text-sm leading-relaxed">
            From basic candle patterns to complex algorithmic strategies. Unlock
            the same knowledge used by floor traders at the world's leading
            desks.
          </p>
          <div className="flex gap-4 mt-8">
            <button className="bg-sky-500 text-black px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-sky-400 transition-all">
              Start Learning
            </button>
            <button className="border border-white/10 text-white px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-white/5 transition-all">
              Browse Library
            </button>
          </div>
        </div>
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-sky-500/5 blur-[120px] rounded-full -mr-20 -mt-20" />
      </section>

      {/* 2. CATEGORY FILTER */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {categories.map((cat, i) => (
          <button
            key={i}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
              i === 0
                ? "bg-white text-black border-white"
                : "text-gray-500 border-white/5 hover:border-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. COURSE GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {courses.map((course, i) => (
          <div
            key={i}
            className="group bg-[#05070A] border border-white/5 rounded-[2.5rem] p-4 hover:border-sky-500/30 transition-all flex flex-col md:flex-row gap-6"
          >
            {/* Thumbnail Placeholder */}
            <div className="w-full md:w-48 h-48 bg-white/5 rounded-[2rem] flex flex-col items-center justify-center relative overflow-hidden group-hover:bg-white/10 transition-colors">
              <span className="text-3xl font-black text-white/10 italic tracking-tighter">
                {course.thumbnail}
              </span>
              <HiOutlinePlayCircle
                size={48}
                className="text-white/20 absolute group-hover:text-sky-500/80 transition-all group-hover:scale-110"
              />
              {course.progress > 0 && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
                  <div
                    className="h-full bg-sky-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              )}
            </div>

            {/* Course Content */}
            <div className="flex-1 py-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`text-[9px] font-black uppercase px-2 py-1 rounded border ${
                      course.level === "Professional"
                        ? "border-red-500/50 text-red-500"
                        : "border-sky-500/50 text-sky-500"
                    }`}
                  >
                    {course.level}
                  </span>
                  <span className="text-[10px] text-gray-600 font-bold uppercase">
                    {course.category}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white leading-snug group-hover:text-sky-500 transition-colors">
                  {course.title}
                </h3>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-[10px] text-gray-500 font-bold uppercase">
                    <HiOutlineClock size={14} /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-gray-500 font-bold uppercase">
                    <HiOutlineBookOpen size={14} /> {course.lessons} Lessons
                  </span>
                </div>
                <HiOutlineChevronRight className="text-gray-700 group-hover:text-white transition-all group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 4. DAILY BRIEF / NEWSLETTER BOX */}
      <section className="bg-sky-500/5 border border-sky-500/10 rounded-[3rem] p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sky-500 font-black text-[10px] uppercase tracking-widest">
              <HiOutlineSignal className="animate-pulse" /> Live Market
              Intelligence
            </div>
            <h2 className="text-3xl font-black text-white uppercase italic">
              The Daily Alpha Brief.
            </h2>
            <p className="text-gray-400 text-sm font-medium">
              Join 50,000+ traders receiving institutional analysis, sentiment
              heatmaps, and high-probability setups directly in their inbox
              every morning.
            </p>
          </div>
          <div className=" md:flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-sky-500 transition-all"
            />
            <button className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-sky-500 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academy;
