import React, { useState, useEffect } from "react";
import {
  useWithdrawFundsMutation,
  useGetMyWalletQuery,
  useGetMyProfileQuery, // Use this for full user data
} from "../../api/apiSlice";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import {
  HiOutlineBanknotes,
  HiOutlineArrowUpRight,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiTether } from "react-icons/si";
import { getSymbol } from "../public/Register";

const Withdraw = () => {
  // 1. Fetch the full profile (includes financialProtocol collection)
  const { data: profileData, isLoading: isProfileLoading } =
    useGetMyProfileQuery();
  const { data: walletData, isLoading: isWalletLoading } =
    useGetMyWalletQuery();
  const [withdrawFunds, { isLoading: isWithdrawing }] =
    useWithdrawFundsMutation();
  // Extract data safely
  const userProfile = profileData;
  const freeBalance = walletData?.wallet?.freeBalance || 0;
  const isLocked = walletData?.wallet?.isLocked || false;
  const displayCurrency = walletData?.wallet?.currency || "USD";

  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("USDT_TRC20");
  const [address, setAddress] = useState("");

  // AUTO-FILL: Watch the profileData instead of Redux state
  useEffect(() => {
    if (!userProfile?.financialProtocol) return;

    const { usdt_trc20, usdt_erc20, btc_address } =
      userProfile.financialProtocol;

    switch (method) {
      case "USDT_TRC20":
        setAddress(usdt_trc20 || "");
        break;
      case "USDT_ERC20":
        setAddress(usdt_erc20 || "");
        break;
      case "BTC":
        setAddress(btc_address || "");
        break;
      default:
        setAddress("");
    }
  }, [userProfile, method]);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(amount);

    if (isLocked) return toast.error("Account restricted. Contact compliance.");
    if (isNaN(withdrawAmount) || withdrawAmount <= 0)
      return toast.error("Invalid amount.");
    if (withdrawAmount > freeBalance)
      return toast.error("Insufficient liquidity.");
    if (!address)
      return toast.error("Destination address missing for this protocol.");

    const loadingToast = toast.loading("Securing transaction on-chain...");

    try {
      await withdrawFunds({
        amount: withdrawAmount,
        method: method,
        payoutAddress: address,
      }).unwrap();

      // Email Logic
      const emailParams = {
        type: "LIQUIDATION REQUEST",
        user_name: `${userProfile?.firstName} ${userProfile?.lastName}`,
        user_email: userProfile?.email,
        amount: `${withdrawAmount} ${displayCurrency}`,
        asset: method,
        payout_info: address,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        emailParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      toast.success("Request submitted to clearing house", {
        id: loadingToast,
      });
      setAmount("");
    } catch (err) {
      toast.error(err?.data?.message || "Transaction failed", {
        id: loadingToast,
      });
    }
  };

  if (isProfileLoading || isWalletLoading) {
    return (
      <div className="flex items-center justify-center py-40">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
            Syncing Secured Vault
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20 px-4">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
          Asset <span className="text-emerald-500">Liquidation</span>
        </h1>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
          Identity: {userProfile?.email}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Status Column */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 p-8 rounded-[2rem] shadow-xl shadow-slate-200/40 dark:shadow-none">
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
              Available for Payout
            </p>
            <h2
              className={`text-4xl font-black mt-2 tracking-tighter ${isLocked ? "text-red-500" : "text-slate-900 dark:text-white"}`}
            >
              <span className="text-emerald-500 mr-2 text-2xl">
                {currencySymbol}
              </span>
              {freeBalance.toLocaleString()}
            </h2>
          </div>

          <div className="bg-slate-900 dark:bg-emerald-500/5 p-6 rounded-[2rem] border border-white/5">
            <h4 className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
              <HiOutlineShieldCheck size={16} /> Destination Vault
            </h4>
            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
              <p className="text-[10px] font-mono break-all text-emerald-100/60 leading-relaxed">
                {address || "NOT CONFIGURED"}
              </p>
            </div>
            {!address && (
              <p className="text-[9px] text-orange-400 mt-3 font-bold uppercase italic">
                ! Action Required: Set address in settings
              </p>
            )}
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleWithdraw}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-2xl space-y-8"
          >
            <div className="space-y-4">
              <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest ml-1">
                Liquidation Channel
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  {
                    id: "USDT_TRC20",
                    label: "USDT",
                    sub: "TRC20",
                    icon: <SiTether size={20} />,
                  },
                  {
                    id: "USDT_ERC20",
                    label: "USDT",
                    sub: "ERC20",
                    icon: <SiTether size={20} />,
                  },
                  {
                    id: "BTC",
                    label: "Bitcoin",
                    sub: "Network",
                    icon: <FaBitcoin size={20} />,
                  },
                  {
                    id: "ETH",
                    label: "Ethereum",
                    sub: "Mainnet",
                    icon: <FaEthereum size={20} />,
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMethod(item.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-300 ${
                      method === item.id
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-lg"
                        : "border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 text-slate-400"
                    }`}
                  >
                    {item.icon}
                    <div className="text-center">
                      <p className="text-[10px] font-black uppercase leading-none">
                        {item.label}
                      </p>
                      <p className="text-[8px] font-bold opacity-60 mt-1">
                        {item.sub}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest ml-1">
                Destination Address
              </label>
              <input
                type="text"
                value={address}
                readOnly
                className="w-full bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 p-5 rounded-2xl text-slate-500 dark:text-slate-400 font-mono text-xs outline-none"
                placeholder="Synchronize in Financial Settings"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest ml-1">
                Amount
              </label>
              <div className="relative group">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 p-6 rounded-3xl text-3xl font-black text-slate-900 dark:text-white outline-none focus:border-emerald-500 transition-all pl-14"
                />
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 font-black text-2xl group-focus-within:text-emerald-500 transition-colors">
                  {currencySymbol}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isWithdrawing || isLocked || !address}
              className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 text-xs ${
                isWithdrawing || isLocked || !address
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-400 text-white dark:text-slate-900 shadow-2xl shadow-emerald-500/40 active:scale-95"
              }`}
            >
              {isWithdrawing
                ? "Verifying Transaction..."
                : isLocked
                  ? "Vault Locked"
                  : "Authorize Withdrawal"}
              <HiOutlineArrowUpRight size={18} strokeWidth={3} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
