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

// 1. Helpers & Constants (Defined outside the component)
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

export const getSymbol = (code) => currencyMap[code]?.symbol || "$";

const Register = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [register, { isLoading, error: apiError }] = useRegisterMutation();

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
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    const payload = {
      username: formData.username,
      firstName: formData.firstName,
      lastName: formData.lastName,
      middleName: formData.middleName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      currency: formData.currency,
      sex: formData.sex.toLowerCase(),
      maritalStatus: formData.maritalStatus.toLowerCase(),
      occupation: formData.occupation,
      address: {
        street: formData.address || "N/A",
        city: "N/A",
        state: "N/A",
        country: "N/A",
        zipCode: "N/A",
      },
    };

    try {
      await toast.promise(register(payload).unwrap(), {
        loading: "Initializing Secure Account...",
        success: "Account Created! Please Sign In.",
        error: (err) => err?.data?.message || "Registration failed",
      });
      navigate("/login");
    } catch (err) {
      // Handled by toast.promise
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 bg-[#020408]">
      <div className="w-full max-w-2xl bg-[#05070A] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= i ? "bg-sky-500" : "bg-white/10"}`}
            />
          ))}
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <div className="grid md:grid-cols-2 gap-4">
                <InputGroup
                  label="Username"
                  name="username"
                  icon={<HiOutlineUser />}
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe"
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

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <div className="grid md:grid-cols-3 gap-4">
                <InputGroup
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <InputGroup
                  label="Middle Name"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                />
                <InputGroup
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
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
                  options={["Single", "Married"]}
                  value={formData.maritalStatus}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <InputGroup
                label="Physical Address"
                name="address"
                icon={<HiOutlineMapPin />}
                value={formData.address}
                onChange={handleChange}
              />
              <div className="grid md:grid-cols-2 gap-4">
                <InputGroup
                  label="Occupation"
                  name="occupation"
                  icon={<HiOutlineBriefcase />}
                  value={formData.occupation}
                  onChange={handleChange}
                />

                <div className="space-y-2 text-left">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                    Account Currency
                  </label>
                  <select
                    name="currency"
                    onChange={handleChange}
                    value={formData.currency}
                    className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-sky-500 transition-all appearance-none"
                  >
                    {Object.entries(currencyMap).map(
                      ([code, { symbol, label }]) => (
                        <option
                          key={code}
                          value={code}
                          className="bg-black text-white"
                        >
                          {code} - {label} ({symbol})
                        </option>
                      ),
                    )}
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
              >
                Back
              </button>
            )}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => (step < 3 ? setStep(step + 1) : handleSubmit())}
              className="flex-[2] py-4 bg-sky-500 text-black font-black uppercase rounded-2xl hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/10"
            >
              {isLoading
                ? "Processing..."
                : step === 3
                  ? "Complete Registration"
                  : "Continue"}
            </button>
          </div>

          <div className="mt-8 text-center border-t border-white/5 pt-6">
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

// --- SUB-COMPONENTS (Crucial to prevent ReferenceErrors) ---

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
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          {icon}
        </span>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-black/40 border border-white/10 p-4 ${icon ? "pl-12" : "px-4"} rounded-xl text-white outline-none focus:border-sky-500 transition-all`}
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
      className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-sky-500 transition-all"
    >
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-black">
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default Register;
