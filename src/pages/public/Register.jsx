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
  HiOutlineGlobeAlt,
} from "react-icons/hi2";

const Register = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [register, { isLoading, error }] = useRegisterMutation();

  // State for all fields
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

  // ... inside your Register component ...

  const handleSubmit = async () => {
    // 1. Frontend Check (This works fine)
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!", {
        style: { background: "#161B26", color: "#fff" },
      });
      return;
    }

    // 2. Reshape the data
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      middleName: formData.middleName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword, // <--- ADD THIS LINE
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

    // 3. Fire the API call
    toast.promise(register(payload).unwrap(), {
      loading: "Initializing Secure Account...",
      success: () => {
        navigate("/login");
        return <b>Account Created! Please Sign In.</b>;
      },
      error: (err) => {
        // If it still fails, this will show the specific error from the backend
        return `${err?.data?.message || "Registration failed"}`;
      },
    });
  };
  const currencies = [
    { country: "America", code: "USD", symbol: "$" },
    { country: "United Kingdom", code: "GBP", symbol: "£" },
    { country: "Nigeria", code: "NGN", symbol: "₦" },
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

        {error && (
          <div className="mb-4 text-red-500 text-xs font-bold uppercase text-center p-3 bg-red-500/5 rounded-lg border border-red-500/20">
            {error?.data?.message || "Registration Failed"}
          </div>
        )}

        <form className="space-y-6">
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
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                    Base Currency
                  </label>
                  <select
                    name="currency"
                    onChange={handleChange}
                    value={formData.currency}
                    className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none appearance-none"
                  >
                    {currencies.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.country} ({c.symbol})
                      </option>
                    ))}
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
                className="flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10"
              >
                Back
              </button>
            )}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => (step < 3 ? setStep(step + 1) : handleSubmit())}
              className="flex-[2] py-4 bg-sky-500 text-black font-black uppercase rounded-2xl"
            >
              {isLoading
                ? "Processing..."
                : step === 3
                  ? "Complete Registration"
                  : "Continue"}
            </button>
          </div>
          <div>
            <p>
              already have an account?{" "}
              <span>
                <Link className="ext-slate-500" to="/login">
                  Login
                </Link>{" "}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

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
        className={`w-full bg-black/40 border border-white/10 p-4 ${icon ? "pl-12" : "px-4"} rounded-xl text-white outline-none focus:border-sky-500`}
      />
    </div>
  </div>
);

const SelectGroup = ({ label, name, options, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default Register;
