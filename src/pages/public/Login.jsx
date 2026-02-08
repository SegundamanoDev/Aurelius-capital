import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi";
import { setLoading, loginSuccess, authError } from "../../features/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading());

    try {
      // Logic: Replace this with your actual MERN backend API call
      // const response = await axios.post('/api/auth/login', formData);

      // MOCK SUCCESS for UI testing:
      setTimeout(() => {
        const mockData = {
          user: { name: "Investor", email: formData.email },
          token: "xyz123",
        };
        dispatch(loginSuccess(mockData));
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      dispatch(
        authError(err.response?.data?.message || "Authentication failed"),
      );
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-6 relative overflow-hidden bg-[#0B0F19]">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#161B26]/60 backdrop-blur-xl border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
              Access Portal
            </h2>
            <p className="text-slate-500 text-sm">
              Secure authorization for Aurelius Capital partners.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center font-bold uppercase tracking-widest">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
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
                  className="w-full bg-[#0B0F19] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Secure Password
                </label>
                <Link
                  to="/forgot"
                  className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest hover:text-emerald-400"
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
                  className="w-full bg-[#0B0F19] border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-slate-700 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={isLoading}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white font-black rounded-2xl transition-all shadow-xl shadow-emerald-900/20 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Authorize Connection"
              )}
            </button>
          </form>

          {/* Footer Link */}
          <p className="mt-8 text-center text-slate-500 text-sm">
            New to the ecosystem?{" "}
            <Link
              to="/register"
              className="text-emerald-500 font-bold hover:text-emerald-400 underline underline-offset-4"
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
