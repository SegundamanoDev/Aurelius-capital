import React, { useState } from "react";
import {
  HiOutlineChevronDown,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi2";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "How does copy trading work?",
      answer: (
        <div className="space-y-4">
          <p>
            You simply select an expert or experts that you want to copy trades
            from. Once you are signed up, this is the only action needed on your
            part. Our software handles the trade copying automatically on your
            behalf.
          </p>
          <p>
            We monitor your expert's activity and execute trades in real-time.
            We calculate all necessary parameters automatically. When the expert
            exits a position, you exit it. Automatically.
          </p>
          <div className="p-4 bg-sky-500/5 border border-sky-500/10 rounded-xl">
            <p className="text-[11px] font-black text-sky-500 uppercase tracking-widest mb-2">
              Technical Requirement:
            </p>
            <p className="text-xs text-gray-400">
              Ensure you have at least 10% available base currency to avoid
              missed trades. If an expert executes a 5% order, you must meet the
              exchange's minimum order amount (approx. $10) to trigger the
              execution.
            </p>
          </div>
        </div>
      ),
    },
    {
      question: "Who are the trading experts?",
      answer:
        "We carefully select expert applicants by examining their performance over a significant period. We prioritize traders with a proven following (social proof) to confirm competence. You can review detailed performance metrics on each expert's individual profile page.",
    },
    {
      question: "Do I Need to Install Any Trading Software?",
      answer:
        "No. You can trade directly on our online platform via the web version. Access the Aurelius Alpha Terminal from any browser immediately after account creation without installing additional software.",
    },
    {
      question: "What is the recommended amount to start with?",
      answer:
        "We suggest a starting balance of $3,000–$5,000 in BTC value. This ensures you meet exchange minimum order requirements and can comfortably cover monthly subscription costs while maintaining healthy portfolio allocation.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#05070A] px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-sky-500 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
            <HiOutlineQuestionMarkCircle size={18} /> Knowledge Base
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
            Frequent <span className="text-gray-600">Inquiries.</span>
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqData.map((item, i) => (
            <div
              key={i}
              className={`border border-white/5 rounded-3xl transition-all duration-500 ${
                openIndex === i
                  ? "bg-white/[0.02] border-white/10"
                  : "bg-transparent"
              }`}
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left"
              >
                <span className="text-lg md:text-xl font-black text-white uppercase italic tracking-tight">
                  {item.question}
                </span>
                <HiOutlineChevronDown
                  size={20}
                  className={`text-gray-500 transition-transform duration-500 ${
                    openIndex === i ? "rotate-180 text-sky-500" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === i
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 md:px-8 pb-8 text-gray-400 text-sm md:text-base leading-relaxed font-medium border-t border-white/5 pt-6">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Support Link */}
        <div className="mt-16 p-8 border border-dashed border-white/10 rounded-[2.5rem] text-center">
          <p className="text-gray-500 text-sm mb-4">
            Still have questions regarding the Alpha Protocol?
          </p>
          <button className="text-sky-500 font-black uppercase text-[10px] tracking-[0.2em] hover:text-white transition-colors">
            Connect with an Advisor →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
