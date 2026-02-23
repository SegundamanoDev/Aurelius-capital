import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi2";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full bg-[#05070A] flex flex-col items-center pt-32 pb-24 overflow-hidden selection:bg-sky-500/30">
      {/* LAYER 1: THE AURORA BACKDROP */}
      <div className="absolute inset-0 z-0 flex justify-center items-start overflow-hidden pointer-events-none">
        <picture role="presentation" className="w-full h-full max-w-[2560px]">
          <source
            media="all and (min-width: 2560px)"
            type="image/webp"
            srcSet="https://static.tradingview.com/static/bundles/aurora-large.b76b06787b54bf7e8d56.webp"
          />
          <img
            crossOrigin="anonymous"
            src="https://static.tradingview.com/static/bundles/aurora.9fb1100135d77f0193c8.webp"
            role="presentation"
            alt=""
            className="w-full h-auto object-cover opacity-40 mix-blend-screen"
          />
        </picture>
        {/* Superior Vignette for focus */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05070A]/20 to-[#05070A] opacity-90" />
      </div>

      {/* LAYER 2: HERO TEXT & ACTIONS */}
      <div className="relative z-20 text-center max-w-5xl px-6 mb-16 mt-12 flex flex-col items-center">
        {/* Badge Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          Institutional Terminal Live
        </div>

        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8 uppercase italic">
          Aurelius Capital <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
            Market Intelligence.
          </span>
        </h1>

        <p className="text-gray-400 text-base md:text-lg font-medium max-w-xl mx-auto leading-relaxed mb-10 tracking-tight">
          The global standard for high-frequency analysis and elite social
          sentiment. Stop trading the noise—start trading the signal.
        </p>

        {/* PRIMARY CALLS TO ACTION */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            to="/register"
            className="px-10 py-5 bg-white text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-xl hover:bg-sky-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Access Terminal <HiOutlineArrowRight size={14} />
          </Link>
          <Link
            to="/copy-trading"
            className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase text-[11px] tracking-[0.2em] rounded-xl hover:bg-white/10 transition-all backdrop-blur-md"
          >
            Explore Markets
          </Link>
        </div>
      </div>

      {/* LAYER 3: THE VIDEO CONTAINER WITH ROUND GLOW */}
      <div className="relative z-10 w-full max-w-[1200px] px-6">
        {/* Dynamic Glow: Pulsing softly */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] bg-sky-500/20 blur-[120px] rounded-full pointer-events-none animate-pulse" />

        {/* THE VIDEO FRAME */}
        <div className="relative aspect-video w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 bg-[#0A0C10]/40 backdrop-blur-3xl shadow-2xl shadow-black">
          <video
            className="w-full h-full object-cover"
            muted
            autoPlay
            loop
            playsInline
            disableRemotePlayback
          >
            <source
              src="https://static.tradingview.com/static/bundles/platform.hvc1.2eb9c1a66bd5b9118729.mp4"
              type="video/mp4;codecs=hvc1.1.0.L150.b0"
            />
            <source
              src="https://static.tradingview.com/static/bundles/platform.fd56916942650780b1f8.webm"
              type="video/webm"
            />
          </video>

          {/* Superior HUD Overlay effect */}
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-[2rem] md:rounded-[3rem]" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#05070A] via-transparent to-transparent opacity-60" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
