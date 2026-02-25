import React, { useState } from "react";
import toast from "react-hot-toast";
import { useEnable2FAMutation, useGet2FASetupQuery } from "../api/apiSlice";

const TwoFactorModal = ({ onClose }) => {
  const { data: setup, isLoading } = useGet2FASetupQuery();
  const [enable2FA, { isLoading: isVerifying }] = useEnable2FAMutation();
  const [token, setToken] = useState("");

  const handleVerify = async () => {
    try {
      await enable2FA({
        token,
        secret: setup.secret,
        method: "app",
      }).unwrap();
      toast.success("Security Layer Activated");
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Verification failed");
    }
  };

  if (isLoading) return <div className="p-10 text-center">Initializing...</div>;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-card-bg border border-app-border p-8 rounded-[2.5rem] max-w-sm w-full space-y-6 text-center">
        <h2 className="text-xl font-black uppercase italic dark:text-white">
          Verify <span className="text-sky-500">Device</span>
        </h2>

        <div className="bg-white p-4 rounded-3xl inline-block">
          <img src={setup?.qrCode} alt="QR Code" className="w-40 h-40" />
        </div>

        <div className="space-y-2">
          <p className="text-[10px] text-gray-500 font-bold uppercase">
            Enter 6-digit code from App
          </p>
          <input
            type="text"
            autoFocus
            maxLength="6"
            pattern="\d*"
            className="w-full bg-slate-100 dark:bg-white/5 p-4 rounded-2xl text-center text-2xl font-black tracking-[0.5em] focus:border-sky-500 outline-none"
            value={token}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setToken(val);
            }}
          />
        </div>

        <button
          onClick={handleVerify}
          disabled={isVerifying}
          className="w-full py-4 bg-sky-500 text-black font-black uppercase text-xs rounded-2xl hover:bg-sky-400 transition-all"
        >
          {isVerifying ? "Activating..." : "Complete Setup"}
        </button>
        <button
          onClick={onClose}
          className="text-[10px] font-bold text-gray-500 uppercase"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TwoFactorModal;
