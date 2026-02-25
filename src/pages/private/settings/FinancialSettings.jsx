import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import { useUpdateFinancialProtocolMutation } from "../../../api/apiSlice";
import toast from "react-hot-toast";

const FinancialSettings = () => {
  const { user } = useSelector((state) => state.auth);
  const [updateProtocol, { isLoading }] = useUpdateFinancialProtocolMutation();

  const [formData, setFormData] = useState({
    trc20: "",
    erc20: "",
    btc: "",
    taxId: "",
    currency: "USD",
  });

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        trc20: user.financialProtocol?.usdt_trc20 || "",
        erc20: user.financialProtocol?.usdt_erc20 || "",
        btc: user.financialProtocol?.btc_address || "",
        taxId: user.financialProtocol?.taxId || "",
        currency: user.wallet?.currency || "USD",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsChanged(true);
  };

  const onSave = async (e) => {
    e.preventDefault();

    const validate = (val) => !val || val.length >= 26;
    if (
      !validate(formData.trc20) ||
      !validate(formData.erc20) ||
      !validate(formData.btc)
    ) {
      return toast.error("Addresses must be at least 26 characters");
    }

    try {
      await updateProtocol({
        trc20: formData.trc20,
        erc20: formData.erc20,
        btc: formData.btc,
        taxId: formData.taxId,
        displayCurrency: formData.currency,
      }).unwrap();
      toast.success("All payout methods synchronized");
      setIsChanged(false);
    } catch (err) {
      toast.error(err?.data?.message || "Connection Error");
    }
  };

  // Shared Input Styles for easier maintenance
  const inputBaseStyles =
    "w-full bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-2xl text-slate-900 dark:text-white font-mono text-xs outline-none transition-all focus:ring-2";

  return (
    <div className="space-y-6">
      {/* Container with Light/Dark background */}
      <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 p-8 rounded-3xl shadow-sm dark:shadow-none">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-500">
            <HiOutlineShieldCheck size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white text-lg">
              Payout Destination Collection
            </h3>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              Secure Financial Protocols
            </p>
          </div>
        </div>

        <form onSubmit={onSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* USDT TRC20 */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-slate-500 dark:text-gray-400 ml-1">
                USDT (TRC20)
              </label>
              <input
                name="trc20"
                value={formData.trc20}
                onChange={handleChange}
                className={`${inputBaseStyles} focus:border-emerald-500 focus:ring-emerald-500/20`}
                placeholder="T..."
              />
            </div>

            {/* USDT ERC20 */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-slate-500 dark:text-gray-400 ml-1">
                USDT (ERC20)
              </label>
              <input
                name="erc20"
                value={formData.erc20}
                onChange={handleChange}
                className={`${inputBaseStyles} focus:border-emerald-500 focus:ring-emerald-500/20`}
                placeholder="0x..."
              />
            </div>

            {/* Bitcoin */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-bold uppercase text-slate-500 dark:text-gray-400 ml-1">
                Bitcoin Address
              </label>
              <input
                name="btc"
                value={formData.btc}
                onChange={handleChange}
                className={`${inputBaseStyles} focus:border-orange-500 focus:ring-orange-500/20`}
                placeholder="bc1q..."
              />
            </div>

            {/* Currency Select */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-slate-500 dark:text-gray-400 ml-1">
                Default Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-2xl text-slate-900 dark:text-white text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option
                  value="USD"
                  className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  USD ($)
                </option>
                <option
                  value="EUR"
                  className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  EUR (€)
                </option>
                <option
                  value="BTC"
                  className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  BTC (₿)
                </option>
              </select>
            </div>

            {/* Tax ID */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-slate-500 dark:text-gray-400 ml-1">
                Tax ID
              </label>
              <input
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                className={`${inputBaseStyles} font-sans focus:border-blue-500 focus:ring-blue-500/20`}
                placeholder="ID Number"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              disabled={!isChanged || isLoading}
              className={`w-full py-4 rounded-2xl font-bold uppercase text-xs transition-all tracking-widest ${
                isChanged
                  ? "bg-emerald-500 text-white dark:text-black shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99]"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600"
              }`}
            >
              {isLoading ? "Syncing..." : "Save Address Collection"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FinancialSettings;
