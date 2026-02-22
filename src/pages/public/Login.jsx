import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi";
import { useLoginMutation } from "../../api/apiSlice";
import { setCredentials } from "../../features/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, error }] = useLoginMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(formData).unwrap();
      dispatch(setCredentials(userData));
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  return (
    /* Changed bg-[#0B0F19] to bg-app-bg */
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-6 relative overflow-hidden bg-app-bg transition-colors duration-500">
      {/* Glow - Opacity adjusted for light mode visibility */}
      <div className="absolute inset-0 bg-sky-500/10 dark:bg-sky-500/5 blur-[140px] rounded-full pointer-events-none" />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-20 bg-white/60 dark:bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-4 border-gray-200 dark:border-white/20 border-t-sky-500 rounded-full animate-spin" />
          <p className="text-text-main font-bold tracking-widest text-sm uppercase">
            Signing you in...
          </p>
        </div>
      )}

      <div className="w-full max-w-md relative z-10">
        {/* Changed bg-[#161B26]/60 to bg-card-bg and border-white/5 to border-app-border */}
        <div className="bg-card-bg/80 backdrop-blur-xl border border-app-border p-8 md:p-10 rounded-3xl shadow-2xl transition-all duration-500">
          <div className="text-center mb-10">
            {/* text-white changed to text-text-main */}
            <h2 className="text-3xl font-black text-text-main mb-2 tracking-tight">
              Access Portal
            </h2>
            <p className="text-gray-500 dark:text-slate-500 text-sm">
              Secure authorization for Aurelius Capital partners.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 dark:text-red-400 text-xs text-center font-bold uppercase">
              {error?.data?.message || "Authentication Failed"}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className={`space-y-6 ${isLoading ? "pointer-events-none opacity-60" : ""}`}
          >
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">
                Email Address
              </label>
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 text-xl" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@institution.com"
                  /* Swapped hardcoded dark bg for bg-app-bg or a light variant */
                  className="w-full bg-gray-50 dark:bg-app-bg border border-app-border rounded-2xl py-4 pl-12 pr-4 text-text-main focus:border-sky-500/50 outline-none transition-all placeholder:text-gray-400"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase tracking-widest">
                  Secure Password
                </label>
                <Link
                  to="/forgot"
                  className="text-[10px] text-sky-500 font-bold uppercase tracking-widest hover:underline"
                >
                  Recovery
                </Link>
              </div>

              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 text-xl" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-gray-50 dark:bg-app-bg border border-app-border rounded-2xl py-4 pl-12 pr-12 text-text-main focus:border-sky-500/50 outline-none transition-all placeholder:text-gray-400"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 hover:text-sky-500 transition-colors"
                >
                  {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={isLoading}
              className="w-full py-4 bg-sky-500 hover:bg-sky-400 disabled:bg-sky-900/40 text-white dark:text-black font-black rounded-2xl transition-all shadow-lg shadow-sky-500/20"
            >
              Authorize Connection
            </button>
          </form>

          <p className="mt-8 text-center text-gray-500 dark:text-slate-500 text-sm">
            New to the ecosystem?{" "}
            <Link
              to="/register"
              className="text-sky-500 font-bold underline hover:text-sky-400 transition-colors"
            >
              Initialize Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
