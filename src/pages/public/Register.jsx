import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../api/apiSlice";
import toast from "react-hot-toast";
import {
  HiOutlineUser,
  HiOutlineLockClosed,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineBriefcase,
} from "react-icons/hi2";
export const getSymbol = (code) => currencyMap[code]?.symbol || "$";
export const currencyMap = {
  USD: { symbol: "$", label: "US Dollar" },
  EUR: { symbol: "€", label: "Euro" },
  GBP: { symbol: "£", label: "British Pound" },
  NGN: { symbol: "₦", label: "Nigerian Naira" },
  CAD: { symbol: "CA$", label: "Canadian Dollar" },
  AUD: { symbol: "A$", label: "Australian Dollar" },
  ZAR: { symbol: "R", label: "South African Rand" },
  KES: { symbol: "KSh", label: "Kenyan Shilling" },
  GHS: { symbol: "GH₵", label: "Ghanaian Cedi" },
  INR: { symbol: "₹", label: "Indian Rupee" },
  JPY: { symbol: "¥", label: "Japanese Yen" },
  CNY: { symbol: "¥", label: "Chinese Yuan" },
};

const Register = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    middleName: "",
    lastName: "",
    sex: "Male",
    maritalStatus: "Single",
    address: "",
    occupation: "",
    currency: "USD",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // 1. Validation Checks
    if (!formData.username || formData.username.length < 3) {
      return toast.error("Username must be at least 3 characters");
    }
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    const payload = {
      username: formData.username.toLowerCase().trim(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      middleName: formData.middleName,
      email: formData.email.toLowerCase().trim(),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      currency: formData.currency,
      sex: formData.sex.toLowerCase(),
      maritalStatus: formData.maritalStatus.toLowerCase(),
      occupation: formData.occupation,
      address: formData.address || "N/A",
    };

    try {
      await toast.promise(register(payload).unwrap(), {
        loading: "Initializing Secure Account...",
        success: "Account Created! Please Sign In.",
        error: (err) => err?.data?.message || "Registration failed",
      });
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 bg-app-bg transition-colors duration-500">
      <div className="w-full max-w-2xl bg-card-bg border border-app-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative transition-all duration-500">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                step >= i ? "bg-sky-500" : "bg-gray-200 dark:bg-white/10"
              }`}
            />
          ))}
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* STEP 1: Account Credentials */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <div className="grid md:grid-cols-2 gap-4">
                <InputGroup
                  label="Username"
                  name="username"
                  icon={<HiOutlineUser />}
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="choose_username"
                />
                <InputGroup
                  label="Email Address"
                  name="email"
                  type="email"
                  icon={<HiOutlineEnvelope />}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <InputGroup
                  label="Password"
                  name="password"
                  type="password"
                  icon={<HiOutlineLockClosed />}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
                <InputGroup
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  icon={<HiOutlineLockClosed />}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Identity Information */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <div className="grid md:grid-cols-3 gap-4">
                <InputGroup
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                />
                <InputGroup
                  label="Middle Name"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  placeholder="Quincy"
                />
                <InputGroup
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <SelectGroup
                  label="Sex"
                  name="sex"
                  options={["Male", "Female", "Other"]}
                  value={formData.sex}
                  onChange={handleChange}
                />
                <SelectGroup
                  label="Marital Status"
                  name="maritalStatus"
                  options={["Single", "Married", "Divorced"]}
                  value={formData.maritalStatus}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {/* STEP 3: Financial & Preferences */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <InputGroup
                label="Physical Address"
                name="address"
                icon={<HiOutlineMapPin />}
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Financial Way, NY"
              />
              <div className="grid md:grid-cols-2 gap-4">
                <InputGroup
                  label="Occupation"
                  name="occupation"
                  icon={<HiOutlineBriefcase />}
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="Portfolio Manager"
                />

                <div className="space-y-2 text-left">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                    Account Currency
                  </label>
                  <div className="relative">
                    <select
                      name="currency"
                      onChange={handleChange}
                      value={formData.currency}
                      className="w-full bg-gray-50 dark:bg-black/40 border border-app-border p-4 rounded-xl text-text-main outline-none focus:border-sky-500 transition-all appearance-none"
                    >
                      {Object.entries(currencyMap).map(
                        ([code, { symbol, label }]) => (
                          <option
                            key={code}
                            value={code}
                            className="bg-white dark:bg-black text-text-main"
                          >
                            {code} - {label} ({symbol})
                          </option>
                        ),
                      )}
                    </select>
                    {/* Custom Dropdown Arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      ▼
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 py-4 bg-gray-100 dark:bg-white/5 text-text-main font-bold rounded-2xl border border-app-border hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
              >
                Back
              </button>
            )}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => (step < 3 ? setStep(step + 1) : handleSubmit())}
              className="flex-[2] py-4 bg-sky-500 text-white dark:text-black font-black uppercase rounded-2xl hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/10 active:scale-95"
            >
              {isLoading
                ? "Processing..."
                : step === 3
                  ? "Complete Registration"
                  : "Continue"}
            </button>
          </div>

          <div className="mt-8 text-center border-t border-app-border pt-6">
            <p className="text-gray-500 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-sky-500 font-bold hover:underline ml-1"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const InputGroup = ({
  label,
  name,
  icon,
  type = "text",
  value,
  onChange,
  placeholder,
}) => (
  <div className="space-y-2 text-left">
    <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={`w-full bg-gray-50 dark:bg-black/40 border border-app-border p-4 ${
          icon ? "pl-12" : "px-4"
        } rounded-xl text-text-main outline-none focus:border-sky-500 transition-all placeholder:text-gray-400`}
      />
    </div>
  </div>
);

const SelectGroup = ({ label, name, options, value, onChange }) => (
  <div className="space-y-2 text-left">
    <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-gray-50 dark:bg-black/40 border border-app-border p-4 rounded-xl text-text-main outline-none focus:border-sky-500 transition-all"
    >
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-white dark:bg-black">
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default Register;
