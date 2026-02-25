import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  HiOutlineLockClosed,
  HiOutlineShieldCheck,
  HiOutlineDevicePhoneMobile,
} from "react-icons/hi2";
import toast from "react-hot-toast";
import {
  useChangePasswordMutation,
  useGetMyProfileQuery,
} from "../../../features/../api/apiSlice";
import TwoFactorModal from "../../../components/TwoFactorModal";

// 1. Validation Schema
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SecuritySettings = () => {
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);

  // Get real user data to check if 2FA is already enabled
  const { data: user } = useGetMyProfileQuery();
  const is2FAEnabled = user?.twoFactorEnabled || false;

  // RTK Mutation for Password
  const [updatePassword, { isLoading: isUpdating }] =
    useChangePasswordMutation();

  // 2. Initialize React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onPasswordSubmit = async (data) => {
    try {
      // Real API Call via Redux
      await updatePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();

      toast.success("Security credentials updated");
      reset();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* --- SECTION: 2FA --- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-500/10 rounded-lg text-sky-500">
            <HiOutlineShieldCheck size={24} />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider dark:text-white">
              Two-Factor Authentication
            </h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
              Enhanced Account Protection
            </p>
          </div>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div
              className={`h-12 w-12 rounded-full flex items-center justify-center ${
                is2FAEnabled
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-slate-200 dark:bg-white/5 text-gray-400"
              }`}
            >
              <HiOutlineDevicePhoneMobile size={24} />
            </div>
            <div>
              <p className="text-xs font-black uppercase dark:text-white">
                Authenticator App
              </p>
              <p className="text-[10px] text-gray-500 font-medium">
                {is2FAEnabled
                  ? "Your account is secured with 2FA."
                  : "Use Google Authenticator or Authy to generate codes."}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIs2FAModalOpen(true)}
            disabled={is2FAEnabled}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              is2FAEnabled
                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 cursor-default"
                : "bg-sky-500 text-black shadow-lg shadow-sky-500/20 hover:scale-105"
            }`}
          >
            {is2FAEnabled ? "Enabled" : "Setup 2FA"}
          </button>
        </div>
      </section>

      <div className="h-px bg-slate-200 dark:bg-white/5 w-full" />

      {/* --- SECTION: CHANGE PASSWORD --- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-500/10 rounded-lg text-sky-500">
            <HiOutlineLockClosed size={24} />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider dark:text-white">
              Update Password
            </h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
              Modify login credentials
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onPasswordSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Current Password */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 ml-1">
              Current Password
            </label>
            <input
              type="password"
              {...register("currentPassword")}
              className={`w-full bg-slate-50 dark:bg-white/5 border ${
                errors.currentPassword
                  ? "border-red-500"
                  : "border-slate-200 dark:border-white/10"
              } p-4 rounded-2xl outline-none focus:border-sky-500 transition-all dark:text-white`}
              placeholder="••••••••"
            />
            {errors.currentPassword && (
              <p className="text-[9px] text-red-500 font-bold uppercase ml-1">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 ml-1">
              New Password
            </label>
            <input
              type="password"
              {...register("newPassword")}
              className={`w-full bg-slate-50 dark:bg-white/5 border ${
                errors.newPassword
                  ? "border-red-500"
                  : "border-slate-200 dark:border-white/10"
              } p-4 rounded-2xl outline-none focus:border-sky-500 transition-all dark:text-white`}
              placeholder="••••••••"
            />
            {errors.newPassword && (
              <p className="text-[9px] text-red-500 font-bold uppercase ml-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 ml-1">
              Confirm New Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className={`w-full bg-slate-50 dark:bg-white/5 border ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "border-slate-200 dark:border-white/10"
              } p-4 rounded-2xl outline-none focus:border-sky-500 transition-all dark:text-white`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-[9px] text-red-500 font-bold uppercase ml-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="md:col-span-2 w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-black uppercase text-xs rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            {isUpdating ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              "Secure New Password"
            )}
          </button>
        </form>
      </section>

      {/* The 2FA Modal */}
      {is2FAModalOpen && (
        <TwoFactorModal onClose={() => setIs2FAModalOpen(false)} />
      )}
    </div>
  );
};

export default SecuritySettings;
