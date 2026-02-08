import React, { useEffect, useRef, useState } from "react";
import {
  HiOutlinePresentationChartLine,
  HiOutlineGlobeAlt,
  HiOutlineScale,
  HiOutlineListBullet,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
  HiOutlineCpuChip,
  HiOutlineExclamationTriangle,
  HiOutlineWallet, // Added for balance display
} from "react-icons/hi2";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const WATCHLIST_DATA = [
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
  { symbol: "BINANCE:SOLUSDT", name: "SOL", price: "145.67", change: "+5.8%" },
  { symbol: "FX:EURUSD", name: "EUR/USD", price: "1.0821", change: "-0.05%" },
  { symbol: "OANDA:XAUUSD", name: "GOLD", price: "2,321.50", change: "+0.15%" },
];

const Market = () => {
  const container = useRef();
  const [selectedPair, setSelectedPair] = useState("BINANCE:BTCUSDT");
  const [tradeType, setTradeType] = useState("buy");
  const [amount, setAmount] = useState("");

  // MOCK BALANCE - Replace this with your Redux selector later
  // const userBalance = useSelector(state => state.wallet.balance);
  const userBalance = 50000;

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = "";
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
    }
  }, [selectedPair]);

  const handleTrade = (e) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);

    if (!amount || isNaN(numericAmount)) {
      return toast.error("Enter a valid investment amount");
    }

    // Balance check logic
    if (tradeType === "buy" && numericAmount > userBalance) {
      return toast.error("Insufficient balance to execute this trade");
    }

    toast.success(
      `${tradeType.toUpperCase()} order placed for ${selectedPair.split(":")[1]}`,
    );
    setAmount("");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-1000 pb-32 px-4 md:px-0">
      {/* 1. TICKER TAPE */}
      <div className="bg-[#05070A] border-y border-white/5 py-2.5 -mx-4 md:-mx-10 overflow-hidden">
        <div className="flex items-center gap-10 animate-marquee whitespace-nowrap">
          {[...WATCHLIST_DATA, ...WATCHLIST_DATA].map((item, i) => (
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

      {/* 2. RISK ADVISORY */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-5 flex flex-col md:flex-row items-center gap-4">
        <div className="p-3 bg-red-500/20 rounded-2xl text-red-500">
          <HiOutlineExclamationTriangle size={24} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-white text-[11px] font-black uppercase tracking-widest">
            Institutional Risk Advisory
          </h4>
          <p className="text-gray-400 text-[10px] leading-relaxed mt-1">
            Trading involves high risk. Consider{" "}
            <span className="text-sky-500 font-bold">
              Copying an Expert Trader
            </span>{" "}
            from our verified leaderboard.
          </p>
        </div>
        <Link
          to="/dashboard/copy-trade"
          className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase text-white hover:bg-sky-500 hover:text-black transition-all"
        >
          Copy A Trader
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* LEFT SIDEBAR: WATCHLIST */}
        <div className="xl:col-span-3 order-2 xl:order-1">
          <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] p-6 shadow-2xl">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <HiOutlineListBullet className="text-sky-500" /> Market Watch
            </h3>
            <div className="space-y-2">
              {WATCHLIST_DATA.map((item) => (
                <button
                  key={item.symbol}
                  onClick={() => setSelectedPair(item.symbol)}
                  className={`w-full flex justify-between p-4 rounded-2xl transition-all border ${
                    selectedPair === item.symbol
                      ? "bg-sky-500/10 border-sky-500/20"
                      : "hover:bg-white/5 border-transparent"
                  }`}
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

        {/* CENTER: CHART & TRADE DOCK */}
        <div className="xl:col-span-6 order-1 xl:order-2 space-y-6">
          <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] overflow-hidden h-[450px] shadow-2xl flex flex-col">
            <div id="tv_chart_container" ref={container} className="flex-1" />
          </div>

          <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] p-6 md:p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-8">
              {/* 3. ORDER BOOK & BALANCE DISPLAY */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    Live Order Book
                  </p>
                  <div className="flex items-center gap-2 text-sky-500 bg-sky-500/5 px-3 py-1 rounded-full border border-sky-500/10">
                    <HiOutlineWallet size={14} />
                    <span className="text-[10px] font-mono font-bold">
                      $
                      {userBalance.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>

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

              {/* 4. TRADE FORM */}
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
                    className="w-full bg-white/5 border border-white/10 p-4 pl-8 rounded-2xl text-white font-mono text-sm outline-none focus:border-sky-500 transition-all"
                  />
                </div>

                <button
                  className={`w-full py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] shadow-lg transition-all active:scale-95 ${
                    tradeType === "buy"
                      ? "bg-emerald-500 shadow-emerald-500/10 text-black"
                      : "bg-red-500 shadow-red-500/10 text-white"
                  }`}
                >
                  Execute {tradeType} Order
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR: ANALYSIS */}
        <div className="xl:col-span-3 order-3 space-y-6">
          <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] p-6 space-y-6">
            <div className="flex items-center gap-2 text-[10px] font-black text-sky-500 uppercase tracking-widest">
              <HiOutlineCpuChip size={18} /> AI Analysis
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase">
                <span>Trend Strength</span>
                <span className="text-emerald-500 italic">88%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500" style={{ width: "88%" }} />
              </div>
            </div>
          </div>

          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] text-center">
            <p className="text-[9px] text-gray-600 uppercase font-black">
              Aurelius Alpha Protocol <br /> Secured Terminal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
