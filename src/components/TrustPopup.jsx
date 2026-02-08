import React, { useState, useEffect } from "react";
import { HiCheckBadge } from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";

const activityData = [
  {
    id: 1,
    name: "Julian M.",
    country: "Germany",
    action: "withdrew",
    amount: "$4,200",
    time: "2 mins ago",
  },
  {
    id: 2,
    name: "Sofia R.",
    country: "United Kingdom",
    action: "invested",
    amount: "$10,000",
    time: "5 mins ago",
  },
  {
    id: 3,
    name: "Liam W.",
    country: "Australia",
    action: "earned",
    amount: "$850",
    time: "just now",
  },
  {
    id: 4,
    name: "Elena P.",
    country: "Singapore",
    action: "reinvested",
    amount: "$2,400",
    time: "12 mins ago",
  },
];

const TrustPopup = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Initial delay before first popup
    const startTimeout = setTimeout(() => {
      setVisible(true);
    }, 5000);

    const interval = setInterval(() => {
      setVisible(false);
      // Wait for exit animation, then switch data and show again
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % activityData.length);
        setVisible(true);
      }, 1000);
    }, 12000); // Popup appears every 12 seconds

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-999 pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="pointer-events-auto bg-[#0A0E17]/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-4 max-w-[280px] md:max-w-sm"
          >
            {/* Action Icon */}
            <div className="shrink-0 bg-sky-500/20 p-2.5 rounded-xl">
              <HiCheckBadge className="text-sky-400 text-2xl" />
            </div>

            {/* Content */}
            <div className="grow">
              <div className="flex justify-between items-start">
                <p className="text-[10px] font-bold text-sky-500 uppercase tracking-widest mb-1">
                  Live Activity
                </p>
                <span className="text-[10px] text-gray-500">
                  {activityData[index].time}
                </span>
              </div>
              <p className="text-sm text-gray-300 leading-snug">
                <span className="font-bold text-white">
                  {activityData[index].name}
                </span>{" "}
                from {activityData[index].country} {activityData[index].action}{" "}
                <span className="text-emerald-400 font-bold">
                  {activityData[index].amount}
                </span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrustPopup;
