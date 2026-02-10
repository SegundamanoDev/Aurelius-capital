import React, { useState } from "react";
import {
  MdCheck,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import {
  useGetMyProfileQuery,
  usePurchaseServiceMutation,
} from "../../api/apiSlice";
import toast from "react-hot-toast";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

const PricingCard = ({ plan, onInsufficientFunds }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: user } = useGetMyProfileQuery();
  const [purchaseService, { isLoading }] = usePurchaseServiceMutation();

  const handlePurchase = async () => {
    // 1. Convert price string "2,700.49" to float 2700.49
    const numericPrice = parseFloat(plan.price.replace(/,/g, ""));

    // 2. Client-side validation for immediate feedback
    if (!user || user.balance < numericPrice) {
      onInsufficientFunds(plan.name);
      return;
    }

    try {
      // 3. Fire the mutation to the backend
      await purchaseService({
        type: "account_upgrade",
        amount: numericPrice,
        details: { planName: plan.name },
        description: `Upgrade to ${plan.name} Tier Strategy`,
      }).unwrap();

      toast.success(`Welcome to ${plan.name} Tier! Account upgraded.`, {
        duration: 5000,
        style: {
          background: "#131722",
          color: "#fff",
          border: "1px solid #2962ff",
        },
      });
    } catch (err) {
      toast.error(
        err?.data?.message || "Acquisition failed. Please try again.",
      );
    }
  };

  const initialLimit = 6;
  const displayFeatures = isExpanded
    ? plan.features
    : plan.features.slice(0, initialLimit);

  return (
    <div className="relative group p-[1px] rounded-2xl transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2962ff]/30 via-[#2962ff]/10 to-transparent blur-[30px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

      <div className="flex flex-col h-full bg-[#131722] border border-[#363a45] rounded-2xl overflow-hidden relative z-10 group-hover:border-[#2962ff]/50 transition-all duration-300 shadow-2xl">
        <div className="p-6 border-b border-[#363a45] bg-[#171b26]/50">
          <h3 className="text-xl font-bold mb-2 text-white">{plan.name}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-white">
              ${plan.price}
            </span>
          </div>
        </div>

        <div className="p-6">
          <button
            disabled={isLoading}
            onClick={handlePurchase}
            className={`w-full py-3.5 ${isLoading ? "bg-gray-600" : "bg-[#2962ff] hover:bg-[#1e4bd8]"} text-white font-extrabold rounded-xl transition-all mb-3 shadow-lg shadow-[#2962ff]/20 active:scale-[0.98]`}
          >
            {isLoading ? "Processing..." : "Get Now"}
          </button>
        </div>

        <div className="flex-grow">
          {displayFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-6 py-4 border-b border-[#363a45] last:border-0 text-[13px] hover:bg-white/5 transition-colors"
            >
              <MdCheck className="text-[#2962ff] flex-shrink-0" size={18} />
              <span className="text-gray-300">{feature}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-5 w-full flex items-center justify-center gap-2 text-[11px] text-gray-400 hover:text-white uppercase tracking-widest font-bold bg-[#171b26] transition-colors border-t border-[#363a45]"
        >
          {isExpanded ? (
            <>
              Show Less <MdKeyboardArrowUp size={18} />
            </>
          ) : (
            <>
              View All Features <MdKeyboardArrowDown size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const PricingSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const plans = [
    {
      name: "Essential",
      price: "500.95",
      features: [
        "2 charts per tab",
        "5 indicators",
        "No ads",
        "Volume profile",
      ],
    },
    {
      name: "Plus",
      price: "1,500.29",
      features: ["4 charts per tab", "10 indicators", "Multiple watchlists"],
    },
    {
      name: "Premium",
      price: "2,700.49",
      features: ["8 charts per tab", "25 indicators", "Tick-based intervals"],
    },
    {
      name: "Ultimate",
      price: "4,000.95",
      features: ["16 charts per tab", "50 indicators", "Priority support"],
    },
  ];

  return (
    <div className="bg-[#05070A] py-24 px-6 font-sans relative">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
          Plans for every level of ambition
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          Scale your trading with tools designed for precision and speed.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            onInsufficientFunds={(name) => {
              setSelectedPlan(name);
              setModalOpen(true);
            }}
          />
        ))}
      </div>

      {/* INSUFFICIENT FUNDS MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#131722] border border-white/10 w-full max-w-md rounded-[2rem] p-8 text-center space-y-6 shadow-2xl">
            <div className="w-20 h-20 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto border border-rose-500/20">
              <HiOutlineExclamationTriangle size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tight">
                Balance Threshold Required
              </h2>
              <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                Your current liquidity is insufficient to acquire the{" "}
                <span className="text-white font-bold">{selectedPlan}</span>{" "}
                package. Please fund your primary wallet to authorize this
                upgrade.
              </p>
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={() => (window.location.href = "/dashboard/deposit")}
                className="w-full py-4 bg-white text-black font-black uppercase rounded-xl hover:bg-gray-200 transition-all"
              >
                Top Up Wallet
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="w-full py-2 text-gray-500 font-bold uppercase text-[10px] tracking-widest"
              >
                Cancel Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingSection;
