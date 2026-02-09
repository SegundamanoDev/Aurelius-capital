import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full bg-[#05070A] flex flex-col items-center pt-40 overflow-hidden">
      {/* LAYER 1: THE AURORA BACKDROP (Institutional Grade) */}
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
        {/* Deep vignetting to blend edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05070A]/40 to-[#05070A]" />
      </div>

      {/* LAYER 2: PORTABLE HERO TEXT */}
      <div className="relative z-20 text-center max-w-4xl px-6 mb-16">
        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-6">
          Where the world <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2962ff] to-[#91f6ff]">
            does markets.
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed mb-10">
          Join millions of traders and investors taking the future into their
          own hands.
        </p>

        <div className="flex justify-center">
          <Link
            to="/register"
            className="px-12 py-4 bg-[#2962ff] hover:bg-[#1e4bd8] text-white font-black uppercase text-[11px] tracking-[0.2em] rounded-full transition-all shadow-[0_0_30px_rgba(41,98,255,0.2)] hover:scale-105"
          >
            Start Trading
          </Link>
        </div>
      </div>

      {/* LAYER 3: THE VIDEO CONTAINER */}
      <div className="relative z-10 w-full max-w-[1100px] px-6">
        <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#0A0C10]/60 backdrop-blur-xl shadow-2xl">
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

          {/* Seamless Edge Blending */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(5,7,10,0.8)]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
