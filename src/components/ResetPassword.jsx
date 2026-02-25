import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiLockClosed, HiShieldCheck } from "react-icons/hi";
import { useResetPasswordMutation } from "../api/apiSlice";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      await resetPassword({ token, password }).unwrap();
      toast.success("Account Secured. Login now.");
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || "Token expired or invalid");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-6 relative bg-app-bg transition-colors duration-500">
      <div className="w-full max-w-md relative z-10">
        <div className="bg-card-bg/80 backdrop-blur-xl border border-app-border p-8 md:p-10 rounded-3xl shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-text-main mb-2 tracking-tight uppercase italic">
              New <span className="text-sky-500">Credentials</span>
            </h2>
            <p className="text-gray-500 text-sm">
              Establish a new high-entropy password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                  New Password
                </label>
                <div className="relative">
                  <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="password"
                    required
                    className="w-full bg-gray-50 dark:bg-app-bg border border-app-border rounded-2xl py-4 pl-12 pr-4 text-text-main outline-none focus:border-sky-500/50 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <HiShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="password"
                    required
                    className="w-full bg-gray-50 dark:bg-app-bg border border-app-border rounded-2xl py-4 pl-12 pr-4 text-text-main outline-none focus:border-sky-500/50 transition-all"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              disabled={isLoading}
              className="w-full py-4 bg-white text-black font-black rounded-2xl transition-all shadow-lg hover:bg-gray-100"
            >
              {isLoading ? "Updating..." : "Authorize Password Change"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
