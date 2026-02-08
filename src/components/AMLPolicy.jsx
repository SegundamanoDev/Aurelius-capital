import React from "react";
import {
  HiOutlineScale,
  HiOutlineIdentification,
  HiOutlineDocumentMagnifyingGlass,
  HiOutlineShieldExclamation,
} from "react-icons/hi2";

const AMLPolicy = () => {
  return (
    <div className="bg-[#05070A] text-slate-300 min-h-screen pb-32 pt-24 px-6 overflow-hidden">
      {/* 1. COMPLIANCE HEADER */}
      <section className="max-w-4xl mx-auto text-center mb-20">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-sky-500/10 rounded-2xl text-sky-500 border border-sky-500/20">
            <HiOutlineScale size={40} />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-6">
          AML <span className="text-gray-600">&</span> CTF{" "}
          <span className="text-gray-600">Policy.</span>
        </h1>
        <p className="text-gray-500 font-medium leading-relaxed">
          Aurelius is committed to maintaining the highest standards of
          Anti-Money Laundering (AML) and Counter-Terrorism Financing (CTF)
          compliance.
        </p>
      </section>

      {/* 2. THE THREE STAGES OF MONEY LAUNDERING (Visual Breakdown) */}
      <section className="max-w-7xl mx-auto mb-32">
        <div className="text-center mb-12">
          <h2 className="text-[10px] font-black text-sky-500 uppercase tracking-[0.4em] mb-2">
            Protocol Insight
          </h2>
          <h3 className="text-2xl font-black text-white uppercase italic">
            The Three Stages of Risk
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              stage: "01. Placement",
              desc: "Introduction of illicit funds into the financial system via bank accounts or high-value goods.",
            },
            {
              stage: "02. Layering",
              desc: "Moving funds through multiple accounts to disguise their origin and disrupt the audit trail.",
            },
            {
              stage: "03. Integration",
              desc: "Funds re-enter circulation as seemingly legitimate assets used for goods and services.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl"
            >
              <h4 className="text-sky-500 font-black mb-4 uppercase italic tracking-tight">
                {item.stage}
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. POLICY CORE CONTENT */}
      <section className="max-w-4xl mx-auto space-y-16">
        {/* General Statement */}
        <div className="space-y-4">
          <h2 className="text-xl font-black text-white uppercase flex items-center gap-3">
            <HiOutlineShieldExclamation className="text-sky-500" /> General
            Principles
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Aurelius strictly adheres to AML principles and actively prevents
            any actions that may facilitate the legalization of illegally
            obtained funds. We do not accept or make cash payments under any
            circumstances and reserve the right to suspend any client operation
            suspected of being related to money laundering.
          </p>
        </div>

        {/* KYC Procedures */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h2 className="text-xl font-black text-white uppercase flex items-center gap-3">
              <HiOutlineIdentification className="text-sky-500" /> Individual
              Verification
            </h2>
            <p className="text-xs leading-relaxed text-gray-500 italic">
              Required documentation for individual accounts:
            </p>
            <ul className="space-y-2">
              {[
                "Full Legal Name & Date of Birth",
                "Valid Passport or National ID",
                "Utility Bill or Bank Statement (Max 3 months old)",
                "Notarized English translation for non-Latin characters",
              ].map((li, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-gray-400"
                >
                  <span className="text-sky-500 mt-1">•</span> {li}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-black text-white uppercase flex items-center gap-3">
              <HiOutlineDocumentMagnifyingGlass className="text-sky-500" />{" "}
              Corporate Verification
            </h2>
            <p className="text-xs leading-relaxed text-gray-500 italic">
              Required for unlisted entities:
            </p>
            <ul className="space-y-2">
              {[
                "Certificate of Incorporation",
                "Memorandum & Articles of Association",
                "Board Resolution for Account Opening",
                "ID for Beneficial Owners (KYC standard)",
              ].map((li, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-gray-400"
                >
                  <span className="text-sky-500 mt-1">•</span> {li}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Monitoring & Transfers */}
        <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem]">
          <h2 className="text-xl font-black text-white uppercase mb-6">
            Continuous Monitoring & Data Retention
          </h2>
          <p className="text-sm leading-relaxed text-gray-400 mb-8">
            Aurelius uses both automated and manual monitoring systems to detect
            suspicious transactions that are inconsistent with a client's known
            legitimate activities. Records of all transaction data and
            AML-related documentation are retained for a minimum period of{" "}
            <strong>seven (7) years</strong> after an account is closed.
          </p>
          <div className="border-t border-white/5 pt-8">
            <h3 className="text-white font-bold uppercase text-xs mb-4">
              Deposit & Withdrawal Restrictions
            </h3>
            <ul className="grid md:grid-cols-2 gap-4 text-xs text-gray-500 uppercase tracking-wider font-bold">
              <li>• No Third-Party Transfers</li>
              <li>• FIFO Processing Logic</li>
              <li>• Verified Card Withdrawals Only</li>
              <li>• Approved Payment Methods Only</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. LEGAL FOOTNOTE */}
      <footer className="mt-24 text-center max-w-3xl mx-auto">
        <div className="p-6 border border-dashed border-red-500/20 rounded-2xl bg-red-500/5">
          <p className="text-[10px] text-red-400 font-black uppercase tracking-widest leading-loose">
            Notice: Aurelius reserves the right to block, suspend, or terminate
            any account suspected of criminal activity without prior notice,
            reporting such activities to the relevant regulatory authorities in
            accordance with international law.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AMLPolicy;
