import React, { useState, useRef } from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";

const MarketTrading = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-black flex items-center justify-center">
      {/* Background Ambient Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
        muted
        autoPlay
        loop
        playsInline
      >
        <source
          src="https://static.tradingview.com/static/bundles/background.dc7fcc856e675d21a9fd.webm"
          type="video/webm"
        />
        <source
          src="https://static.tradingview.com/static/bundles/background.avc1.f6076ddaee9de28a4e79.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1e222d] opacity-60" />

      {/* Main Content / Foreground Video */}
      <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            autoPlay
            loop
            playsInline
          >
            <source
              src="https://static.tradingview.com/static/bundles/platform.fd56916942650780b1f8.webm"
              type="video/webm"
            />
            <source
              src="https://static.tradingview.com/static/bundles/platform.avc1.a1288e5d4288511366aa.mp4"
              type="video/mp4"
            />
          </video>

          {/* Control Button */}
          <button
            onClick={togglePlay}
            className="absolute bottom-4 left-4 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <MdPause size={20} /> : <MdPlayArrow size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketTrading;
