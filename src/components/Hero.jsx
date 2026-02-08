import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    "Predictive AI Models.",
    "Institutional Grade Security.",
    "Global Market Insights.",
    "Automated Wealth Growth.",
  ];

  const typingSpeed = 100;
  const newValueDelay = 2000;

  useEffect(() => {
    const handleTyping = () => {
      const currentFullText = phrases[textIndex];

      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        if (displayText === currentFullText) {
          setTimeout(() => setIsDeleting(true), newValueDelay);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    };

    const timer = setTimeout(
      handleTyping,
      isDeleting ? typingSpeed / 2 : typingSpeed,
    );
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex]);

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden bg-[#05070A]">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80')`,
        }}
      >
        {/* Gradient Overlay: Darker at bottom and left for text readability */}
        <div className="absolute inset-0 bg-linear-to-tr from-[#05070A] via-[#05070A]/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/5 backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
            <span className="text-sky-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              The Gold Standard of Digital Assets
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold text-white leading-tight tracking-tight">
            Aurelius <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-emerald-400">
              {displayText}
            </span>
            <span className="text-sky-400 animate-pulse">|</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed font-light">
            Transcend traditional investing. Our proprietary algorithms analyze
            millions of data points to deliver consistent, risk-adjusted returns
            for the elite investor.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 pt-8">
            <Link
              to="/register"
              className="group relative bg-sky-500 text-white px-8 py-4 rounded-xl font-bold overflow-hidden transition-all hover:shadow-[0_0_30px_-5px_rgba(14,165,233,0.5)]"
            >
              <span className="relative z-10">Start Your Journey</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>

            <Link
              to="/about"
              className="bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold transition-all"
            >
              Platform Overview
            </Link>
          </div>

          {/* Mini Stats for Hero Trust */}
          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/5 max-w-md">
            <div>
              <p className="text-2xl font-bold text-white">$4.2B+</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">
                AUM
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">124K</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">
                Investors
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">99.9%</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">
                Uptime
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
