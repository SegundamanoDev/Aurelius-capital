import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { useDepositFundsMutation } from "../../api/apiSlice";
import {
  HiOutlineDocumentCheck,
  HiOutlineClipboardDocumentCheck,
  HiOutlineCloudArrowUp,
  HiOutlineShieldCheck,
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
    const fileInput = e.target.querySelector('input[type="file"]');

    if (!fileInput.files[0])
      return toast.error("Please upload proof of payment");
    if (!amount || amount <= 0)
      return toast.error("Please enter a valid amount");

    const toastId = toast.loading("Uploading proof and updating wallet...");
    setLoading(true);

    try {
      // Create FormData to handle the image file
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("method", selectedAsset);
      formData.append(
        "referenceId",
        `DEP-${Math.random().toString(36).toUpperCase().slice(2, 10)}`,
      );
      formData.append("my_file", fileInput.files[0]); // Make sure this matches 'upload.single("my_file")'

      // Send to backend
      const result = await depositFunds(formData).unwrap();

      // Send Email Notification
      const emailParams = {
        user_name: user ? `${user.firstName} ${user.lastName}` : "User",
        user_email: user?.email,
        asset: selectedAsset,
        amount: amount,
        proof_link: result.transaction?.proofImage, // Link to the Cloudinary image
        type: "deposit",
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        emailParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      toast.success("Wallet credited successfully!", { id: toastId });
      setAmount("");
      setFileSelected(null);
      e.target.reset();
    } catch (err) {
      toast.error(err.data?.message || "Submission failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-32 transition-colors duration-500">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-text-main tracking-tighter italic uppercase">
          Funding <span className="text-sky-500">Terminal</span>
        </h1>
        <p className="text-gray-500 max-w-2xl text-sm font-medium">
          Choose your asset and provide the transfer receipt for validation.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-10">
        {/* LEFT SIDE: WALLET INFO */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex p-1.5 bg-gray-100 dark:bg-white/5 rounded-2xl border border-app-border">
            {Object.keys(wallets).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedAsset(key)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-black uppercase transition-all duration-300 ${
                  selectedAsset === key
                    ? "bg-white dark:bg-white/10 text-text-main shadow-md border border-app-border"
                    : "text-gray-400 hover:text-text-main"
                }`}
              >
                {wallets[key].icon} {key}
              </button>
            ))}
          </div>

          <div className="bg-card-bg border border-app-border rounded-[2.5rem] p-8 space-y-8 shadow-2xl shadow-black/5">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-[10px] text-sky-600 dark:text-sky-500 font-black uppercase tracking-[0.3em]">
                  {wallets[selectedAsset].name} Receiver Address
                </p>
                <h2 className="text-text-main text-lg font-black italic">
                  Network:{" "}
                  <span className="text-gray-400 not-italic font-bold">
                    {wallets[selectedAsset].network}
                  </span>
                </h2>
              </div>
              <div className="bg-sky-500/10 p-2 rounded-lg">
                <HiOutlineShieldCheck className="text-sky-600" size={24} />
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-black/40 border border-app-border p-2 rounded-2xl flex items-center group">
              <code className="flex-1 text-sky-600 dark:text-sky-400 font-mono text-sm py-4 px-6 break-all font-bold">
                {wallets[selectedAsset].address}
              </code>
              <button
                onClick={handleCopy}
                className={`p-5 rounded-xl transition-all active:scale-95 ${
                  copied
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                    : "bg-white dark:bg-white/5 text-text-main shadow-sm border border-app-border hover:border-sky-500"
                }`}
              >
                {copied ? (
                  <HiOutlineDocumentCheck size={22} />
                ) : (
                  <HiOutlineClipboardDocumentCheck size={22} />
                )}
              </button>
            </div>

            <p className="text-[10px] text-gray-400 font-bold uppercase text-center italic">
              * Send only {wallets[selectedAsset].name} to this address via{" "}
              {wallets[selectedAsset].network}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: FORM */}
        <div className="lg:col-span-2">
          <form
            ref={form}
            onSubmit={handleDepositSubmit}
            className="bg-card-bg border border-app-border rounded-[2.5rem] p-8 space-y-6 sticky top-24 shadow-2xl shadow-black/5"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
              <h3 className="text-text-main font-black text-xs uppercase tracking-widest">
                Validate Transfer
              </h3>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                  Amount (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black">
                    $
                  </span>
                  <input
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    required
                    className="w-full bg-gray-50 dark:bg-white/5 border border-app-border pl-8 p-4 rounded-xl text-text-main text-sm font-bold focus:border-sky-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="relative group">
                <input
                  type="file"
                  name="my_file"
                  accept="image/*"
                  required
                  onChange={(e) => setFileSelected(e.target.files[0]?.name)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className="w-full border-2 border-app-border border-dashed p-10 rounded-2xl flex flex-col items-center justify-center gap-3 bg-gray-50/50 dark:bg-transparent group-hover:border-sky-500/50 transition-all">
                  <HiOutlineCloudArrowUp
                    size={32}
                    className="text-gray-400 group-hover:text-sky-500 transition-colors"
                  />
                  <span className="text-[10px] text-gray-500 font-black uppercase text-center tracking-tighter">
                    {fileSelected || "Attach Payment Screenshot"}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] shadow-xl transition-all active:scale-[0.98] ${
                loading
                  ? "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                  : "bg-sky-600 hover:bg-sky-500 text-white shadow-sky-500/20"
              }`}
            >
              {loading ? "Transmitting..." : "Finalize Deposit"}
            </button>

            <div className="p-4 bg-sky-500/5 rounded-xl border border-sky-500/10">
              <p className="text-[9px] text-sky-700 dark:text-sky-400 font-bold leading-relaxed uppercase">
                Note: Verification usually takes 15-60 minutes depending on
                network confirmations.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
