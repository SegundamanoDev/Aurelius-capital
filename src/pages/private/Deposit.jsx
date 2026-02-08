import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  HiOutlineDocumentCheck,
  HiOutlineClipboardDocumentCheck,
  HiOutlineCloudArrowUp,
  HiOutlineShieldCheck,
  HiOutlineInformationCircle,
} from "react-icons/hi2";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiTether } from "react-icons/si";

const Deposit = () => {
  const form = useRef();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState(null);

  // State for selected asset
  const [selectedAsset, setSelectedAsset] = useState("BTC");

  const wallets = {
    BTC: {
      name: "Bitcoin",
      network: "BTC (Native SegWit)",
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      icon: <FaBitcoin size={24} className="text-orange-500" />,
      bg: "bg-orange-500/10",
    },
    ETH: {
      name: "Ethereum",
      network: "ERC20",
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", // Replace with your ETH
      icon: <FaEthereum size={24} className="text-indigo-400" />,
      bg: "bg-indigo-500/10",
    },
    USDT: {
      name: "Tether",
      network: "TRC20 (Tron Network)",
      address: "TXYZ1234567890ABCDEFGHIJKLMN", // Replace with your USDT
      icon: <SiTether size={24} className="text-emerald-500" />,
      bg: "bg-emerald-500/10",
    },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(wallets[selectedAsset].address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        form.current,
        "YOUR_PUBLIC_KEY",
      )
      .then(
        () => {
          alert(
            "Payment receipt submitted. Verification typically takes 15-45 minutes.",
          );
          setLoading(false);
          setFileSelected(null);
          e.target.reset();
        },
        () => {
          alert("Submission failed. Please contact terminal support.");
          setLoading(false);
        },
      );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-32">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase">
          Funding <span className="text-sky-500">Terminal</span>
        </h1>
        <p className="text-gray-500 max-w-2xl text-sm leading-relaxed">
          Provision your trading account via our secure liquidity gateways.
          Choose your preferred asset below to generate a unique deposit
          address.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-10">
        {/* LEFT SIDE: SELECTION & GATEWAY (3 Columns) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Asset Selector Tabs */}
          <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5">
            {Object.keys(wallets).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedAsset(key)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  selectedAsset === key
                    ? "bg-white/10 text-white shadow-xl border border-white/10"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {wallets[key].icon}
                {key}
              </button>
            ))}
          </div>

          {/* Address Display Card */}
          <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              {wallets[selectedAsset].icon}
            </div>

            <div className="space-y-1">
              <p className="text-[10px] text-sky-500 font-black uppercase tracking-[0.3em]">
                {wallets[selectedAsset].name} Receiver Address
              </p>
              <h2 className="text-white text-lg font-bold">
                Network:{" "}
                <span className="text-gray-400 font-medium">
                  {wallets[selectedAsset].network}
                </span>
              </h2>
            </div>

            <div className="bg-black/40 border border-white/10 p-2 rounded-2xl flex items-center group transition-all hover:border-sky-500/30">
              <code className="flex-1 text-sky-400 font-mono text-sm py-4 px-6 break-all">
                {wallets[selectedAsset].address}
              </code>
              <button
                onClick={handleCopy}
                className={`p-5 rounded-xl transition-all ${
                  copied
                    ? "bg-emerald-500 text-black"
                    : "bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {copied ? (
                  <HiOutlineDocumentCheck size={22} />
                ) : (
                  <HiOutlineClipboardDocumentCheck size={22} />
                )}
              </button>
            </div>

            {/* Instruction Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-[10px] uppercase">
                  <HiOutlineShieldCheck size={16} /> Security Note
                </div>
                <p className="text-gray-500 text-[11px] leading-relaxed">
                  Only send <span className="text-white">{selectedAsset}</span>{" "}
                  to this address via the{" "}
                  <span className="text-white">
                    {wallets[selectedAsset].network}
                  </span>{" "}
                  network.
                </p>
              </div>
              <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-amber-500 font-bold text-[10px] uppercase">
                  <HiOutlineInformationCircle size={16} /> Confirmation
                </div>
                <p className="text-gray-500 text-[11px] leading-relaxed">
                  Terminal balance updates automatically after 3 network
                  validations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: SUBMISSION FORM (2 Columns) */}
        <div className="lg:col-span-2">
          <form
            ref={form}
            onSubmit={sendEmail}
            className="bg-[#05070A] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl space-y-6 sticky top-24"
          >
            <div className="space-y-1">
              <h3 className="text-white font-bold text-lg">
                Validate Transfer
              </h3>
              <p className="text-gray-500 text-[11px] uppercase font-black tracking-widest">
                Post-Payment Submission
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase ml-1">
                  Account Holder
                </label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="e.g. John Doe"
                  required
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-sm outline-none focus:border-sky-500 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase ml-1">
                  Registered Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="account@example.com"
                  required
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-sm outline-none focus:border-sky-500 transition-all"
                />
              </div>

              <div className="relative group pt-2">
                <input
                  type="file"
                  name="my_file"
                  accept="image/*"
                  required
                  onChange={(e) => setFileSelected(e.target.files[0]?.name)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className="w-full border-2 border-white/5 border-dashed p-10 rounded-2xl flex flex-col items-center justify-center gap-3 group-hover:border-sky-500/30 group-hover:bg-sky-500/[0.02] transition-all">
                  <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-sky-400 group-hover:scale-110 transition-all">
                    <HiOutlineCloudArrowUp size={24} />
                  </div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center">
                    {fileSelected
                      ? fileSelected
                      : "Attach Transaction Screenshot"}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] transition-all ${
                loading
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-sky-500 hover:bg-sky-400 text-black shadow-xl shadow-sky-500/10 active:scale-[0.98]"
              }`}
            >
              {loading ? "Transmitting Data..." : "Finalize Deposit"}
            </button>

            <p className="text-[9px] text-gray-600 text-center font-bold uppercase italic">
              Aurelius Capital Secure Encryption Enabled
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
