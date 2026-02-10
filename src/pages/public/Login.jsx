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

  // RTK Query Mutation Hook
  const [login, { isLoading, error }] = useLoginMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // .unwrap() allows us to use a standard try/catch block
      const userData = await login(formData).unwrap();

      // Save user & token to Redux + LocalStorage
      dispatch(setCredentials({ ...userData }));

      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-6 relative overflow-hidden bg-[#0B0F19]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#161B26]/60 backdrop-blur-xl border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
              Access Portal
            </h2>
            <p className="text-slate-500 text-sm">
              Secure authorization for Aurelius Capital partners.
            </p>
          </div>

          {/* RTK Query Error Handling */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center font-bold uppercase">
              {error?.data?.message || "Authentication Failed"}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                Email Address
              </label>
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@institution.com"
                  className="w-full bg-[#0B0F19] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-emerald-500/50 outline-none transition-all"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Secure Password
                </label>
                <Link
                  to="/forgot"
                  className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest"
                >
                  Recovery
                </Link>
              </div>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#0B0F19] border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-white focus:border-emerald-500/50 outline-none transition-all"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>
            </div>

            <button
              disabled={isLoading}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-900/50 text-white font-black rounded-2xl transition-all flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Authorize Connection"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm">
            New to the ecosystem?{" "}
            <Link
              to="/register"
              className="text-emerald-500 font-bold underline"
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
