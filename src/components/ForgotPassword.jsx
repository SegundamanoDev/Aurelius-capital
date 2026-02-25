import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMail, HiArrowLeft, HiCheckCircle } from "react-icons/hi";
import { useForgotPasswordMutation } from "../api/apiSlice";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
      setIsSent(true);
      toast.success("Reset link dispatched");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to send reset email");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-6 relative bg-app-bg transition-colors duration-500">
      <div className="absolute inset-0 bg-sky-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-card-bg/80 backdrop-blur-xl border border-app-border p-8 md:p-10 rounded-3xl shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-text-main mb-2 tracking-tight uppercase italic">
              Recovery <span className="text-sky-500">Hub</span>
            </h2>
            <p className="text-gray-500 text-sm">
              {isSent
                ? "Check your encrypted inbox for instructions."
                : "Enter your email to receive a secure reset token."}
            </p>
          </div>

          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                  Verified Email
                </label>
                <div className="relative">
                  <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="email"
                    required
                    placeholder="name@institution.com"
                    className="w-full bg-gray-50 dark:bg-app-bg border border-app-border rounded-2xl py-4 pl-12 pr-4 text-text-main outline-none focus:border-sky-500/50 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button
                disabled={isLoading}
                className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-white dark:text-black font-black rounded-2xl transition-all shadow-lg shadow-sky-500/20"
              >
                {isLoading ? "Processing..." : "Request Reset Link"}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6 animate-in fade-in zoom-in duration-300">
              <div className="flex justify-center">
                <HiCheckCircle className="text-emerald-500 text-6xl" />
              </div>
              <p className="text-text-main font-bold">Link sent to {email}</p>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-xs font-bold text-sky-500 uppercase hover:underline"
            >
              <HiArrowLeft /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
