import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { useDepositFundsMutation } from "../../api/apiSlice"; // Adjust path
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
  const { user } = useSelector((state) => state.auth);
  const [depositFunds] = useDepositFundsMutation();

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState("BTC");
  const [amount, setAmount] = useState("");

  const wallets = {
    BTC: {
      name: "Bitcoin",
      network: "BTC (Native SegWit)",
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      icon: <FaBitcoin size={24} className="text-orange-500" />,
    },
    ETH: {
      name: "Ethereum",
      network: "ERC20",
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      icon: <FaEthereum size={24} className="text-indigo-400" />,
    },
    USDT: {
      name: "Tether",
      network: "TRC20 (Tron Network)",
      address: "TXYZ1234567890ABCDEFGHIJKLMN",
      icon: <SiTether size={24} className="text-emerald-500" />,
    },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(wallets[selectedAsset].address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDepositSubmit = async (e) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      return toast.error("Please enter a valid amount");
    }

    const toastId = toast.loading("Processing your deposit...");
    setLoading(true);

    try {
      // 1️⃣ Save deposit (critical)
      await depositFunds({
        amount: Number(amount),
        method: selectedAsset,
        referenceId: `DEP-${Math.random().toString(36).toUpperCase().slice(2, 10)}`,
      }).unwrap();

      toast.success("Deposit recorded. Sending confirmation email...", {
        id: toastId,
      });
    } catch (dbError) {
      console.error("DB Error:", dbError);
      toast.error("Deposit failed. Please try again.", { id: toastId });
      setLoading(false);
      return;
    }

    try {
      // 2️⃣ Email notification (non-critical)
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      toast.success("Email notification sent successfully!");
    } catch (emailError) {
      console.error("EmailJS Error:", emailError.text || emailError);
      toast.error(
        "Deposit saved, but email failed. Support has been notified.",
      );
    } finally {
      setLoading(false);
      setAmount("");
      setFileSelected(null);
      e.target.reset();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-32">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase">
          Funding <span className="text-sky-500">Terminal</span>
        </h1>
        <p className="text-gray-500 max-w-2xl text-sm">
          Choose your asset and provide the transfer receipt for validation.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-10">
        {/* LEFT SIDE: WALLET INFO */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5">
            {Object.keys(wallets).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedAsset(key)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-black uppercase transition-all ${
                  selectedAsset === key
                    ? "bg-white/10 text-white border border-white/10"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {wallets[key].icon} {key}
              </button>
            ))}
          </div>

          <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] p-8 space-y-8">
            <div>
              <p className="text-[10px] text-sky-500 font-black uppercase tracking-[0.3em]">
                {wallets[selectedAsset].name} Receiver Address
              </p>
              <h2 className="text-white text-lg font-bold">
                Network:{" "}
                <span className="text-gray-400">
                  {wallets[selectedAsset].network}
                </span>
              </h2>
            </div>

            <div className="bg-black/40 border border-white/10 p-2 rounded-2xl flex items-center">
              <code className="flex-1 text-sky-400 font-mono text-sm py-4 px-6 break-all">
                {wallets[selectedAsset].address}
              </code>
              <button
                onClick={handleCopy}
                className={`p-5 rounded-xl transition-all ${copied ? "bg-emerald-500 text-black" : "bg-white/5 text-white"}`}
              >
                {copied ? (
                  <HiOutlineDocumentCheck size={22} />
                ) : (
                  <HiOutlineClipboardDocumentCheck size={22} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: FORM */}
        <div className="lg:col-span-2">
          <form
            ref={form}
            onSubmit={handleDepositSubmit}
            className="bg-[#05070A] border border-white/5 rounded-[2.5rem] p-8 space-y-6 sticky top-24"
          >
            <h3 className="text-white font-bold text-lg">Validate Transfer</h3>

            {/* Hidden user fields for EmailJS */}
            <input
              type="hidden"
              name="user_name"
              value={
                user ? `${user.firstName} ${user.lastName}` : "Unknown User"
              }
            />
            <input
              type="hidden"
              name="user_email"
              value={user?.email || "No Email Provided"}
            />
            <input type="hidden" name="asset" value={selectedAsset} />
            <input type="hidden" name="type" value="DEPOSIT" />

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-500 uppercase">
                  Amount (USD)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter Amount"
                  required
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-sm focus:border-sky-500 outline-none"
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
                <div className="w-full border-2 border-white/5 border-dashed p-10 rounded-2xl flex flex-col items-center justify-center gap-3 group-hover:border-sky-500/30 transition-all">
                  <HiOutlineCloudArrowUp size={24} className="text-gray-500" />
                  <span className="text-[10px] text-gray-500 font-bold uppercase text-center">
                    {fileSelected || "Attach Transaction Screenshot"}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] ${
                loading
                  ? "bg-gray-800 text-gray-500"
                  : "bg-sky-500 hover:bg-sky-400 text-black"
              }`}
            >
              {loading ? "Transmitting..." : "Finalize Deposit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
