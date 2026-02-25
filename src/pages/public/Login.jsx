import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  HiMail,
  HiLockClosed,
  HiEye,
  HiEyeOff,
  HiShieldCheck,
} from "react-icons/hi";
import {
  useLoginMutation,
  useVerifyLogin2FAMutation,
} from "../../api/apiSlice";
import { setCredentials } from "../../features/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // States for 2FA Step
  const [step, setStep] = useState(1); // 1 = Login, 2 = 2FA OTP
  const [otp, setOtp] = useState("");
  const [tempUserId, setTempUserId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading: isLoggingIn, error: loginError }] =
    useLoginMutation();
  const [verify2FA, { isLoading: isVerifying }] = useVerifyLogin2FAMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData).unwrap();

      if (response.status === "2FA_REQUIRED") {
        setTempUserId(response._id);
        setStep(2);
        toast.success("Identity Check Required");
      } else {
        dispatch(setCredentials(response));
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    try {
      const userData = await verify2FA({
        userId: tempUserId,
        token: otp,
      }).unwrap();
      dispatch(setCredentials(userData));
      toast.success("Access Granted");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.data?.message || "Invalid Security Code");
    }
  };

  const isLoading = isLoggingIn || isVerifying;

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-6 relative overflow-hidden bg-app-bg transition-colors duration-500">
      <div className="absolute inset-0 bg-sky-500/10 dark:bg-sky-500/5 blur-[140px] rounded-full pointer-events-none" />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-20 bg-white/60 dark:bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-4 border-gray-200 dark:border-white/20 border-t-sky-500 rounded-full animate-spin" />
          <p className="text-text-main font-bold tracking-widest text-sm uppercase">
            {step === 1 ? "Authorizing..." : "Verifying Code..."}
          </p>
        </div>
      )}

      <div className="w-full max-w-md relative z-10">
        <div className="bg-card-bg/80 backdrop-blur-xl border border-app-border p-8 md:p-10 rounded-3xl shadow-2xl transition-all duration-500">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-text-main mb-2 tracking-tight uppercase italic">
              {step === 1 ? "Access Portal" : "Security Check"}
            </h2>
            <p className="text-gray-500 dark:text-slate-500 text-sm">
              {step === 1
                ? "Secure authorization for Aurelius Capital partners."
                : "Enter the 6-digit code from your authenticator app."}
            </p>
          </div>

          {loginError && step === 1 && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 dark:text-red-400 text-xs text-center font-bold uppercase">
              {loginError?.data?.message || "Authentication Failed"}
            </div>
          )}

          {/* STEP 1: INITIAL LOGIN FORM */}
          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-gray-50 dark:bg-app-bg border border-app-border rounded-2xl py-4 pl-12 pr-4 text-text-main outline-none focus:border-sky-500/50 transition-all"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                {/* --- UPDATED LABEL WITH FORGOT PASSWORD LINK --- */}
                <div className="flex justify-between items-center mb-2 ml-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Password
                  </label>
                  <Link
                    to="/forgot"
                    className="text-[10px] text-sky-500 font-bold uppercase tracking-widest hover:text-sky-400 transition-colors hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                {/* ----------------------------------------------- */}
                <div className="relative">
                  <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    className="w-full bg-gray-50 dark:bg-app-bg border border-app-border rounded-2xl py-4 pl-12 pr-12 text-text-main outline-none focus:border-sky-500/50 transition-all"
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-500"
                  >
                    {showPassword ? (
                      <HiEyeOff size={20} />
                    ) : (
                      <HiEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button
                disabled={isLoading}
                className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-white dark:text-black font-black rounded-2xl transition-all shadow-lg shadow-sky-500/20"
              >
                Authorize Connection
              </button>
            </form>
          )}

          {/* STEP 2: 2FA OTP FORM */}
          {step === 2 && (
            <form
              onSubmit={handleOtpVerify}
              className="space-y-6 animate-in fade-in zoom-in duration-300"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-sky-500/10 rounded-full text-sky-500 animate-pulse">
                  <HiShieldCheck size={40} />
                </div>
              </div>

              <div className="space-y-2 text-center">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Verification Code
                </label>
                <input
                  type="text"
                  maxLength="6"
                  required
                  autoFocus
                  placeholder="000 000"
                  className="w-full bg-gray-50 dark:bg-app-bg border border-app-border rounded-2xl py-5 text-center text-3xl font-black tracking-[0.5em] text-text-main outline-none focus:border-sky-500 transition-all"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                />
              </div>

              <button
                disabled={isLoading}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white dark:text-black font-black rounded-2xl transition-all shadow-lg shadow-emerald-500/20"
              >
                Verify Identity
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-[10px] text-gray-500 font-bold uppercase hover:text-sky-500 transition-colors"
              >
                Back to Login
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-gray-500 text-sm">
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
