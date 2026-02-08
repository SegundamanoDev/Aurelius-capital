import React, { useState } from "react";
import {
  HiOutlineKey,
  HiOutlineCreditCard,
  HiOutlineEnvelope,
} from "react-icons/hi2";
import { FaBitcoin, FaPaypal, FaUniversity } from "react-icons/fa";

const Profile = () => {
  const [wallets, setWallets] = useState({
    btc: "",
    paypal: "",
    bank: "",
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-white">Account Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your security and withdrawal destinations.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Sidebar Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-[#05070A] border border-white/5 p-6 rounded-3xl text-center">
            <div className="h-20 w-20 bg-gradient-to-tr from-sky-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-black text-white">
              JD
            </div>
            <h3 className="text-white font-bold">John Doe</h3>
            <p className="text-xs text-gray-500">Member since 2024</p>
            <div className="mt-4 py-1 px-3 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase rounded-full inline-block border border-emerald-500/20">
              Verified Elite
            </div>
          </div>
        </div>

        {/* Form Area */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#05070A] border border-white/5 rounded-3xl p-8 space-y-6">
            <h4 className="text-white font-bold flex items-center gap-2">
              <HiOutlineKey className="text-sky-400" /> Withdrawal Wallets
            </h4>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-500 font-bold uppercase flex items-center gap-2">
                  <FaBitcoin /> Bitcoin Address
                </label>
                <input
                  type="text"
                  placeholder="Enter BTC Address"
                  className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm outline-none focus:border-sky-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-500 font-bold uppercase flex items-center gap-2">
                  <FaPaypal /> PayPal Email
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm outline-none focus:border-sky-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-500 font-bold uppercase flex items-center gap-2">
                  <FaUniversity /> Bank Details (Swift/IBAN)
                </label>
                <textarea
                  rows="3"
                  placeholder="Bank Name, SWIFT, IBAN..."
                  className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white text-sm outline-none focus:border-sky-500 transition-all resize-none"
                />
              </div>
            </div>

            <button className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-black font-black uppercase tracking-widest rounded-2xl transition-all">
              Save Payment Methods
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
