// import React, { useEffect, useRef, useState } from "react";
// import {
//   HiOutlinePresentationChartLine,
//   HiOutlineGlobeAlt,
//   HiOutlineScale,
//   HiOutlineListBullet,
//   HiOutlineArrowTrendingUp,
//   HiOutlineArrowTrendingDown,
// } from "react-icons/hi2";

// const Market = () => {
//   const container = useRef();
//   const [selectedPair, setSelectedPair] = useState("BINANCE:BTCUSDT");

//   const watchlist = [
//     {
//       symbol: "BINANCE:BTCUSDT",
//       name: "BTC",
//       price: "64,231.00",
//       change: "+2.4%",
//     },
//     {
//       symbol: "BINANCE:ETHUSDT",
//       name: "ETH",
//       price: "3,452.12",
//       change: "-1.2%",
//     },
//     {
//       symbol: "BINANCE:SOLUSDT",
//       name: "SOL",
//       price: "145.67",
//       change: "+5.8%",
//     },
//     {
//       symbol: "BINANCE:BNBUSDT",
//       name: "BNB",
//       price: "592.30",
//       change: "+0.4%",
//     },
//     { symbol: "FX:EURUSD", name: "EUR/USD", price: "1.0821", change: "-0.05%" },
//     {
//       symbol: "OANDA:XAUUSD",
//       name: "GOLD",
//       price: "2,321.50",
//       change: "+0.15%",
//     },
//   ];

//   useEffect(() => {
//     // Clear previous chart on selection change
//     if (container.current) container.current.innerHTML = "";

//     const script = document.createElement("script");
//     script.src =
//       "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
//     script.type = "text/javascript";
//     script.async = true;
//     script.innerHTML = JSON.stringify({
//       autosize: true,
//       symbol: selectedPair,
//       interval: "D",
//       timezone: "Etc/UTC",
//       theme: "dark",
//       style: "1",
//       locale: "en",
//       enable_publishing: false,
//       hide_side_toolbar: false,
//       allow_symbol_change: true,
//       save_image: false,
//       backgroundColor: "rgba(5, 7, 10, 1)",
//       gridColor: "rgba(255, 255, 255, 0.05)",
//       container_id: "tv_chart_container",
//     });
//     container.current.appendChild(script);
//   }, [selectedPair]);

//   return (
//     <div className="space-y-4 md:space-y-6 animate-in fade-in duration-1000 pb-20 px-1 md:px-0">
//       {/* 1. TOP TICKER TAPE (Professional Market Pulse) */}
//       <div className="bg-[#05070A] border-y border-white/5 py-2.5 -mx-4 md:-mx-10 overflow-hidden">
//         <div className="flex items-center gap-10 animate-marquee whitespace-nowrap">
//           {[...watchlist, ...watchlist].map((item, i) => (
//             <div key={i} className="flex items-center gap-2 font-mono">
//               <span className="text-[10px] text-gray-500 font-black uppercase">
//                 {item.name}
//               </span>
//               <span className="text-[10px] text-white font-bold">
//                 {item.price}
//               </span>
//               <span
//                 className={`text-[9px] font-bold ${item.change.includes("+") ? "text-emerald-500" : "text-red-500"}`}
//               >
//                 {item.change}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6">
//         {/* 2. WATCHLIST (3 Columns on XL, Top on Mobile) */}
//         <div className="xl:col-span-3 order-2 xl:order-1 space-y-4">
//           <div className="bg-[#05070A] border border-white/5 rounded-[2rem] p-5 shadow-2xl h-full">
//             <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
//               <HiOutlineListBullet className="text-sky-500" size={18} />
//               <h3 className="text-[11px] font-black text-white uppercase tracking-widest">
//                 Global Watchlist
//               </h3>
//             </div>
//             <div className="space-y-1">
//               {watchlist.map((item) => (
//                 <button
//                   key={item.symbol}
//                   onClick={() => setSelectedPair(item.symbol)}
//                   className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all group ${selectedPair === item.symbol ? "bg-sky-500/10 border border-sky-500/20" : "hover:bg-white/5 border border-transparent"}`}
//                 >
//                   <div className="text-left">
//                     <p
//                       className={`text-xs font-black ${selectedPair === item.symbol ? "text-sky-500" : "text-white"}`}
//                     >
//                       {item.name}
//                     </p>
//                     <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">
//                       {item.symbol.split(":")[0]}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs font-mono text-white font-bold">
//                       {item.price}
//                     </p>
//                     <p
//                       className={`text-[10px] font-bold ${item.change.includes("+") ? "text-emerald-500" : "text-red-500"}`}
//                     >
//                       {item.change}
//                     </p>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* 3. MAIN TERMINAL (6 Columns on XL) */}
//         <div className="xl:col-span-6 order-1 xl:order-2 h-[500px] md:h-[700px]">
//           <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col h-full shadow-2xl">
//             <div className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
//               <div className="flex items-center gap-3">
//                 <div className="hidden md:flex p-2 bg-sky-500/10 rounded-lg text-sky-500">
//                   <HiOutlinePresentationChartLine size={20} />
//                 </div>
//                 <div>
//                   <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
//                     Advanced Chart
//                   </h2>
//                   <p className="text-[9px] text-sky-500 font-bold uppercase">
//                     {selectedPair.replace(":", " / ")}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
//                 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
//                   Live Network
//                 </span>
//               </div>
//             </div>
//             <div id="tv_chart_container" ref={container} className="flex-1" />
//           </div>
//         </div>

//         {/* 4. ANALYSIS & SENTIMENT (3 Columns on XL, Bottom on Mobile) */}
//         <div className="xl:col-span-3 order-3 space-y-4">
//           {/* Sentiment Gauge */}
//           <div className="bg-[#05070A] border border-white/5 rounded-[2rem] p-6 text-center space-y-4">
//             <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center justify-center gap-2">
//               <HiOutlineScale className="text-sky-500" /> Market Gauge
//             </p>
//             <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
//               <div
//                 className="absolute top-0 left-0 h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
//                 style={{ width: "75%" }}
//               />
//             </div>
//             <div className="flex justify-between text-[9px] font-black uppercase">
//               <span className="text-red-500">Bearish</span>
//               <span className="text-emerald-500">Bullish 75%</span>
//             </div>
//             <h4 className="text-xl font-black text-white italic uppercase tracking-tighter">
//               Strong Accumulation
//             </h4>
//           </div>

//           {/* Events/Calendar */}
//           <div className="bg-[#05070A] border border-white/5 rounded-[2rem] p-6 flex-1">
//             <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
//               <HiOutlineGlobeAlt className="text-sky-500" /> Terminal Feed
//             </div>
//             <div className="space-y-5">
//               {[
//                 {
//                   label: "Volatility",
//                   val: "High",
//                   icon: (
//                     <HiOutlineArrowTrendingUp className="text-emerald-500" />
//                   ),
//                 },
//                 {
//                   label: "Resistance",
//                   val: "68,400",
//                   icon: <HiOutlineArrowTrendingDown className="text-red-500" />,
//                 },
//                 {
//                   label: "Liquidity",
//                   val: "Institutional",
//                   icon: <HiOutlineGlobeAlt className="text-sky-500" />,
//                 },
//               ].map((stat, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center justify-between border-b border-white/[0.02] pb-3"
//                 >
//                   <div className="flex items-center gap-3">
//                     <span className="p-2 bg-white/5 rounded-lg">
//                       {stat.icon}
//                     </span>
//                     <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
//                       {stat.label}
//                     </span>
//                   </div>
//                   <span className="text-[11px] font-bold text-white">
//                     {stat.val}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Institutional Note */}
//           <div className="p-6 bg-sky-500/5 border border-sky-500/10 rounded-[2rem]">
//             <p className="text-[10px] text-gray-500 leading-relaxed italic font-medium">
//               "Data streams are consolidated from major Tier-1 liquidity
//               providers. Execution slippage is minimized through our optimized
//               aggregation engine."
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Market;

import React, { useEffect, useRef, useState } from "react";
import {
  HiOutlinePresentationChartLine,
  HiOutlineGlobeAlt,
  HiOutlineScale,
  HiOutlineListBullet,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
  HiOutlineCpuChip,
} from "react-icons/hi2";
import toast from "react-hot-toast";

const Market = () => {
  const container = useRef();
  const [selectedPair, setSelectedPair] = useState("BINANCE:BTCUSDT");
  const [tradeType, setTradeType] = useState("buy");
  const [amount, setAmount] = useState("");

  const watchlist = [
    {
      symbol: "BINANCE:BTCUSDT",
      name: "BTC",
      price: "64,231.00",
      change: "+2.4%",
    },
    {
      symbol: "BINANCE:ETHUSDT",
      name: "ETH",
      price: "3,452.12",
      change: "-1.2%",
    },
    {
      symbol: "BINANCE:SOLUSDT",
      name: "SOL",
      price: "145.67",
      change: "+5.8%",
    },
    { symbol: "FX:EURUSD", name: "EUR/USD", price: "1.0821", change: "-0.05%" },
    {
      symbol: "OANDA:XAUUSD",
      name: "GOLD",
      price: "2,321.50",
      change: "+0.15%",
    },
  ];

  useEffect(() => {
    if (container.current) container.current.innerHTML = "";
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: selectedPair,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      backgroundColor: "rgba(5, 7, 10, 1)",
      gridColor: "rgba(255, 255, 255, 0.05)",
      container_id: "tv_chart_container",
    });
    container.current.appendChild(script);
  }, [selectedPair]);

  const handleTrade = (e) => {
    e.preventDefault();
    if (!amount) return toast.error("Enter investment amount");
    toast.success(
      `${tradeType.toUpperCase()} order placed for ${selectedPair.split(":")[1]}`,
    );
    setAmount("");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-1000 pb-32">
      {/* 1. TOP TICKER */}
      <div className="bg-[#05070A] border-y border-white/5 py-2.5 -mx-4 md:-mx-10 overflow-hidden">
        <div className="flex items-center gap-10 animate-marquee whitespace-nowrap">
          {[...watchlist, ...watchlist].map((item, i) => (
            <div key={i} className="flex items-center gap-2 font-mono">
              <span className="text-[10px] text-gray-500 font-black uppercase">
                {item.name}
              </span>
              <span className="text-[10px] text-white font-bold">
                {item.price}
              </span>
              <span
                className={`text-[9px] font-bold ${item.change.includes("+") ? "text-emerald-500" : "text-red-500"}`}
              >
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* 2. WATCHLIST (Desktop Left) */}
        <div className="xl:col-span-3 order-2 xl:order-1 hidden xl:block">
          <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] p-6 shadow-2xl sticky top-6">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-6">
              Market Watch
            </h3>
            <div className="space-y-2">
              {watchlist.map((item) => (
                <button
                  key={item.symbol}
                  onClick={() => setSelectedPair(item.symbol)}
                  className={`w-full flex justify-between p-4 rounded-2xl transition-all ${selectedPair === item.symbol ? "bg-sky-500/10 border border-sky-500/20" : "hover:bg-white/5 border border-transparent"}`}
                >
                  <span className="text-xs font-black text-white">
                    {item.name}
                  </span>
                  <span
                    className={`text-xs font-mono font-bold ${item.change.includes("+") ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {item.price}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. CENTER CHART & TRADE DOCK */}
        <div className="xl:col-span-6 order-1 xl:order-2 space-y-6">
          {/* Main Chart */}
          <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] overflow-hidden h-[450px] md:h-[600px] shadow-2xl flex flex-col">
            <div id="tv_chart_container" ref={container} className="flex-1" />
          </div>

          {/* QUICK TRADE DOCK */}
          <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] p-6 md:p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Order Book Visualization */}
              <div className="flex-1 space-y-3">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Live Order Book
                </p>
                <div className="space-y-1 font-mono text-[10px]">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="flex justify-between text-red-500/60"
                    >
                      <span>
                        64,24{i}.{i}2
                      </span>
                      <span>0.0{i}42 BTC</span>
                    </div>
                  ))}
                  <div className="py-2 text-center text-lg font-black text-white italic">
                    64,231.00
                  </div>
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="flex justify-between text-emerald-500/60"
                    >
                      <span>
                        64,22{i}.{i}8
                      </span>
                      <span>1.0{i}15 BTC</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trade Input Form */}
              <form onSubmit={handleTrade} className="flex-1 space-y-4">
                <div className="flex bg-black/40 p-1 rounded-2xl border border-white/5">
                  <button
                    type="button"
                    onClick={() => setTradeType("buy")}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tradeType === "buy" ? "bg-emerald-500 text-black" : "text-gray-500"}`}
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    onClick={() => setTradeType("sell")}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tradeType === "sell" ? "bg-red-500 text-black" : "text-gray-500"}`}
                  >
                    Sell
                  </button>
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-xs">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="Execution Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 pl-8 rounded-2xl text-white font-mono text-sm outline-none focus:border-sky-500"
                  />
                </div>

                <button
                  className={`w-full py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] shadow-lg transition-all active:scale-95 ${tradeType === "buy" ? "bg-emerald-500 shadow-emerald-500/10 text-black" : "bg-red-500 shadow-red-500/10 text-white"}`}
                >
                  Execute {tradeType} Order
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 4. ANALYSIS SIDEBAR (Desktop Right) */}
        <div className="xl:col-span-3 order-3 space-y-6">
          {/* Technical Summary */}
          <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] p-6 space-y-6">
            <div className="flex items-center gap-2 text-[10px] font-black text-sky-500 uppercase tracking-widest">
              <HiOutlineCpuChip size={18} /> AI Analysis
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-500 font-bold uppercase">
                  Trend Strength
                </span>
                <span className="text-[10px] text-emerald-500 font-black italic">
                  EXCEPTIONAL
                </span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500" style={{ width: "88%" }} />
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Aggregated sentiment from 14 global exchanges indicates
                high-volume whale accumulation.
              </p>
            </div>
          </div>

          {/* Risk Disclaimer */}
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem]">
            <p className="text-[9px] text-gray-600 leading-relaxed uppercase font-black text-center">
              Aurelius Alpha Protocol <br /> Secured Institutional Access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
