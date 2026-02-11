import React, { useEffect, useRef } from "react";

const TickerTape = () => {
  const containerRef = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD" },
        { proName: "FOREXCOM:NSXUSD" },
        { proName: "FOREXCOM:DJI" },
        { proName: "FX:EURUSD" },
        { proName: "BITSTAMP:BTCUSD" },
        { proName: "BITSTAMP:ETHUSD" },
        { proName: "CMCMARKETS:GOLD" },
      ],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: "adaptive",
      colorTheme: "dark",
      locale: "en",
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="w-full bg-[#05070A] border-b border-white/5">
      <div className="tradingview-widget-container" ref={containerRef}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
};

export default TickerTape;
