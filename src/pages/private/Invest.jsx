import React from "react";
import TradeController from "./BuySell";

const MadeToTradeVedio = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-20 bg-[#05070A] px-6">
      {/* Container for the Video Card */}
      <div className="relative group w-full max-w-[800px]">
        {/* 1. THE ALL-ROUND GLOW: Matches the trading blue theme */}
        <div className="absolute inset-0 bg-[#2962ff]/20 blur-[80px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

        {/* 2. THE VIDEO FRAME: Styled like a vertical card slot */}
        <div className="end-q6Knz4kN verticalCardEndSlot-Il3G64Co relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#131722] shadow-2xl">
          <video
            className="video-CCm0bl_x cardMediaItem-Il3G64Co w-full h-full object-cover"
            muted
            autoPlay
            loop
            playsInline
            disableRemotePlayback
          >
            {/* High Quality HEVC for Safari/iOS */}
            <source
              src="https://static.tradingview.com/static/bundles/bar-replay.hvc1.f484c94f6f97e5260676.mp4"
              type="video/mp4;codecs=hvc1.1.0.L150.b0"
            />
            {/* WebM for Chrome/Firefox */}
            <source
              src="https://static.tradingview.com/static/bundles/bar-replay.7fe222144faa26201e51.webm"
              type="video/webm"
            />
            {/* MP4 Fallback */}
            <source
              src="https://static.tradingview.com/static/bundles/bar-replay.avc1.2d59be6df59bf04a7990.mp4"
              type="video/mp4;codecs=avc1"
            />
            Your browser does not support the video tag.
          </video>

          {/* Seamless Edge Blending / Inner Shadow */}
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/5 rounded-[2rem]" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>
      <TradeController />
    </div>
  );
};

export default MadeToTradeVedio;
