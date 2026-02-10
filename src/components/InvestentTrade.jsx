import React, { useState } from "react";

import { MdPause, MdPlayArrow } from "react-icons/md";

const InvestmentPromo = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = React.useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-24 bg-[#05070A] text-white px-6 font-sans">
      {/* 1. Header Text Section */}
      <div className="max-w-4xl text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
          The best time to invest was 2010. <br />
          <span className="text-[#2962ff]">The second best time is now.</span>
        </h2>
        <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
          Make better decisions with our smart tools, trusted brokers, and
          global community.
        </p>
      </div>

      {/* 2. Video Wrapper with Glow Effect */}
      <div className="relative w-full max-w-[1000px] group">
        {/* Radiant Glow Behind Video */}
        <div className="absolute inset-0 bg-[#2962ff]/10 blur-[120px] rounded-full -z-10" />

        <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-[#0A0C10]">
          {/* Action Button */}
          <button
            onClick={togglePlay}
            className="absolute top-6 left-6 z-20 p-3 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <MdPause size={20} /> : <MdPlayArrow size={20} />}
          </button>

          {/* The Video */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster="https://static.tradingview.com/static/bundles/trading-promo-video-poster.f48552f3926af42aac54.webp"
            muted
            autoPlay
            loop
            playsInline
          >
            <source
              src="https://static.tradingview.com/static/bundles/trading-promo-video.hvc1.8bc71e78d0a69d3ec896.mp4"
              type="video/mp4;codecs=hvc1.1.0.L150.b0"
            />
            <source
              src="https://static.tradingview.com/static/bundles/trading-promo-video.8299cc8f2892d52da3fa.webm"
              type="video/webm"
            />
            <source
              src="https://static.tradingview.com/static/bundles/trading-promo-video.avc1.8c6a31ecbc8313c319a4.mp4"
              type="video/mp4;codecs=avc1"
            />
            Your browser does not support the video tag.
          </video>

          {/* Seamless Vignette Overlay */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.5)]" />
        </div>
      </div>
    </div>
  );
};

export default InvestmentPromo;
