import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full bg-[#05070A] flex flex-col items-center pt-32 pb-24 overflow-hidden">
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
            className="w-full h-auto object-cover opacity-50"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05070A]/40 to-[#05070A]" />
      </div>

      {/* LAYER 2: HERO TEXT */}
      <div className="relative z-20 text-center max-w-4xl px-6 mb-8 mt-12">
        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-4">
          Aurelius-Capital Where The World <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2962ff] to-[#91f6ff]">
            Does Markets.
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed">
          Join thousands of traders and investors taking the future into their
          own hands.
        </p>
      </div>

      {/* LAYER 3: THE VIDEO CONTAINER WITH ROUND GLOW */}
      <div className="relative z-10 w-full max-w-[1100px] px-6 mb-16">
        {/* THE GLOW DIV: This sits behind the video */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-[#2962ff]/30 blur-[100px] rounded-full pointer-events-none" />

        {/* THE VIDEO FRAME */}
        <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden border border-white/20 bg-[#0A0C10]/60 backdrop-blur-2xl shadow-[0_0_50px_rgba(41,98,255,0.15)]">
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
            <source
              src="https://static.tradingview.com/static/bundles/platform.avc1.a1288e5d4288511366aa.mp4"
              type="video/mp4;codecs=avc1"
            />
          </video>

          {/* Internal shadow for depth */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(5,7,10,0.9)]" />
        </div>
      </div>

      {/* LAYER 4: START TRADING BUTTON */}
      <div className="relative z-20 flex justify-center w-full">
        <div className="absolute -z-10 w-64 h-24 bg-[#2962ff]/30 blur-[60px] rounded-full" />

        <Link
          to="/register"
          className="px-14 py-5 bg-[#2962ff] hover:bg-[#1e4bd8] text-white font-black uppercase text-[12px] tracking-[0.25em] rounded-full transition-all shadow-[0_15px_40px_rgba(41,98,255,0.4)] hover:scale-105 active:scale-95"
        >
          Start Trading
        </Link>
      </div>
    </section>
  );
};

export default Hero;
