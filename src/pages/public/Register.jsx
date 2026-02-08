import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineLockClosed,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineBriefcase,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";

const Register = () => {
  const [step, setStep] = useState(1);

  // Grouped Currencies for cleaner selection
  const currencies = [
    { country: "America", code: "USD", symbol: "$" },
    { country: "United Kingdom", code: "GBP", symbol: "£" },
    { country: "Euro Zone", code: "EUR", symbol: "€" },
    { country: "Nigeria", code: "NGN", symbol: "₦" },
    { country: "Canada", code: "CAD", symbol: "$" },
    { country: "Australia", code: "AUD", symbol: "$" },
    // Add others from your list as needed
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 bg-[#020408]">
      <div className="w-full max-w-2xl bg-[#05070A] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= i ? "bg-sky-500" : "bg-white/10"}`}
            />
          ))}
        </div>

        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
            Create Account
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Join the elite trading circle at Aurelius Capital.
          </p>
        </div>

        <form className="space-y-6">
          {/* STEP 1: SECURITY & IDENTITY */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid md:grid-cols-2 gap-4">
                <InputGroup
                  label="Username"
                  icon={<HiOutlineUser />}
                  placeholder="johndoe_trader"
                />
                <InputGroup
                  label="Email Address"
                  icon={<HiOutlineEnvelope />}
                  type="email"
                  placeholder="john@example.com"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <InputGroup
                  label="Password"
                  icon={<HiOutlineLockClosed />}
                  type="password"
                  placeholder="••••••••"
                />
                <InputGroup
                  label="Confirm Password"
                  icon={<HiOutlineLockClosed />}
                  type="password"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          {/* STEP 2: PERSONAL PROFILING */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid md:grid-cols-3 gap-4">
                <InputGroup label="First Name" placeholder="John" />
                <InputGroup label="Middle Name" placeholder="Quincy" />
                <InputGroup label="Last Name" placeholder="Doe" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                    Sex
                  </label>
                  <select className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-sky-500 transition-all">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                    Marital Status
                  </label>
                  <select className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-sky-500 transition-all">
                    <option>Single</option>
                    <option>Married</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ADDRESS & FINANCIALS */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <InputGroup
                label="Physical Address"
                icon={<HiOutlineMapPin />}
                placeholder="123 Wall Street, NY"
              />
              <div className="grid md:grid-cols-2 gap-4">
                <InputGroup
                  label="Occupation / Work"
                  icon={<HiOutlineBriefcase />}
                  placeholder="Software Engineer"
                />
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                    Base Currency
                  </label>
                  <div className="relative">
                    <HiOutlineGlobeAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <select className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-xl text-white outline-none focus:border-sky-500 transition-all appearance-none">
                      {currencies.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.country} - {c.code} ({c.symbol})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={() =>
                step < 3 ? setStep(step + 1) : alert("Account Created!")
              }
              className="flex-[2] py-4 bg-sky-500 hover:bg-sky-400 text-black font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-sky-500/20 transition-all"
            >
              {step === 3 ? "Complete Registration" : "Continue"}
            </button>
          </div>
        </form>

        <p className="text-center mt-8 text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-400 font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

// Reusable Small Input Component
const InputGroup = ({ label, icon, type = "text", placeholder }) => (
  <div className="space-y-2 text-left">
    <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full bg-black/40 border border-white/10 p-4 ${icon ? "pl-12" : "px-4"} rounded-xl text-white text-sm outline-none focus:border-sky-500 transition-all placeholder:text-gray-700`}
      />
    </div>
  </div>
);

export default Register;
