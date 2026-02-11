import React from "react";
import TradeController from "./BuySell";
import TickerTape from "../../components/TradingView";

const MadeToTradeVedio = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full pt-5 pb-10 bg-[#05070A] px-6">
      <TickerTape />
      <TradeController />
    </div>
  );
};

export default MadeToTradeVedio;
