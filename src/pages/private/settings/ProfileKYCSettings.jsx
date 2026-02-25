import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  HiOutlineIdentification,
  HiOutlineCloudArrowUp,
  HiOutlineCheckBadge,
  HiOutlineGlobeAlt,
  HiOutlineClock,
  HiOutlineXCircle,
} from "react-icons/hi2";
import toast from "react-hot-toast";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useUploadKycMutation,
} from "../../../api/apiSlice";

const ProfileKYCSettings = () => {
  // 1. RTK Query Hooks
  const { data: profileData } = useGetMyProfileQuery();
  const [updateProfile] = useUpdateMyProfileMutation();
  const [uploadKyc, { isLoading: isUploading }] = useUploadKycMutation();

  // 2. Local State
  const [dragActive, setDragActive] = useState(false);
  const user = profileData?.user;
  const kycStatus = user?.kycStatus || "pending"; // pending, approved, rejected (mapped to UI below)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm();

  // 3. Sync form with database when user data is fetched
  useEffect(() => {
    if (user) {
      reset({
        bio: user.bio || "",
        twitter: user.twitter || "",
        isPublic: user.isPublic ?? true,
      });
    }
  }, [user, reset]);

  // 4. Handle KYC File Upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0] || e.dataTransfer?.files[0];
    if (!file) return;

    // Validation
    if (file.size > 10 * 1024 * 1024) {
      return toast.error("File exceeds 10MB limit");
    }

    const formData = new FormData();
    formData.append("document", file);

    const loadingToast = toast.loading("Uploading identity protocol...");
    try {
      await uploadKyc(formData).unwrap();
      toast.success("Documents queued for review", { id: loadingToast });
    } catch (err) {
      toast.error(err?.data?.message || "Upload failed", { id: loadingToast });
    }
  };

  const onUpdateProfile = async (data) => {
    const loadingToast = toast.loading("Syncing profile records...");
    try {
      await updateProfile(data).unwrap();
      toast.success("Public profile updated", { id: loadingToast });
    } catch (err) {
      toast.error("Failed to update profile", { id: loadingToast });
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* --- SECTION: KYC VERIFICATION --- */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
              <HiOutlineIdentification size={24} />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider dark:text-white">
                Identity Verification
              </h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                Compliance Status: {kycStatus}
              </p>
            </div>
          </div>
          <KycBadge status={kycStatus} />
        </div>

        {/* Dynamic UI based on KYC status */}
        {kycStatus === "pending" && !user?.kycDetails?.documentUrl ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              handleFileChange(e);
            }}
            className={`border-2 border-dashed rounded-[2rem] p-10 transition-all text-center space-y-4
              ${dragActive ? "border-emerald-500 bg-emerald-500/5" : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02]"}
            `}
          >
            <div className="mx-auto w-16 h-16 bg-white dark:bg-white/5 rounded-2xl flex items-center justify-center shadow-sm">
              <HiOutlineCloudArrowUp
                size={32}
                className={
                  isUploading
                    ? "animate-bounce text-emerald-500"
                    : "text-sky-500"
                }
              />
            </div>
            <div>
              <p className="text-xs font-black uppercase dark:text-white">
                {isUploading ? "Uploading Protocol..." : "Upload Government ID"}
              </p>
              <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-tighter">
                Passport or National ID (PNG, JPG up to 10MB)
              </p>
            </div>

            <label className="inline-block cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*,.pdf"
              />
              <span className="px-8 py-3 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-black transition-all">
                {isUploading ? "Processing..." : "Select Document"}
              </span>
            </label>
          </div>
        ) : kycStatus === "pending" && user?.kycDetails?.documentUrl ? (
          <div className="p-8 rounded-[2rem] bg-amber-500/5 border border-amber-500/20 text-center">
            <HiOutlineClock className="mx-auto text-amber-500 mb-3" size={32} />
            <p className="text-xs font-black uppercase dark:text-white">
              Verification in Progress
            </p>
            <p className="text-[9px] text-gray-500 uppercase mt-1">
              Our compliance team is reviewing your documents. Usually takes
              24h.
            </p>
          </div>
        ) : kycStatus === "approved" ? (
          <div className="p-8 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/20 text-center">
            <HiOutlineCheckBadge
              className="mx-auto text-emerald-500 mb-3"
              size={32}
            />
            <p className="text-xs font-black uppercase dark:text-white">
              Account Verified
            </p>
            <p className="text-[9px] text-gray-500 uppercase mt-1">
              Full trading and withdrawal privileges unlocked.
            </p>
          </div>
        ) : null}
      </section>

      <div className="h-px bg-slate-200 dark:bg-white/5 w-full" />

      {/* --- SECTION: PUBLIC PROFILE --- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-500/10 rounded-lg text-sky-500">
            <HiOutlineGlobeAlt size={24} />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider dark:text-white">
              Public Strategist Profile
            </h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
              How others see you in Copy-Trading
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onUpdateProfile)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 ml-1">
                Professional Bio
              </label>
              <textarea
                {...register("bio")}
                rows={4}
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-2xl outline-none focus:border-emerald-500 transition-all text-xs dark:text-white resize-none"
                placeholder="Share your trading philosophy..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 ml-1">
                Social Handle (X/Twitter)
              </label>
              <input
                {...register("twitter")}
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-2xl outline-none focus:border-emerald-500 transition-all text-xs dark:text-white font-bold font-mono"
                placeholder="@handle"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl">
              <div>
                <p className="text-[10px] font-black uppercase dark:text-white">
                  Visibility
                </p>
                <p className="text-[9px] text-gray-500 uppercase font-bold">
                  Show in Rankings
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register("isPublic")}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-white/10 peer-checked:after:translate-x-full peer-checked:bg-emerald-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
              </label>
            </div>
          </div>

          {isDirty && (
            <button
              type="submit"
              className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-black uppercase text-xs rounded-2xl transition-all shadow-xl hover:scale-[1.01] active:scale-[0.99]"
            >
              Update Profile Records
            </button>
          )}
        </form>
      </section>
    </div>
  );
};

// Helper Component for Status Badge
const KycBadge = ({ status }) => {
  const styles = {
    pending: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
    approved: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
    rejected: "bg-red-500/10 text-red-500 border border-red-500/20",
  };

  const icons = {
    pending: <HiOutlineClock size={14} />,
    approved: <HiOutlineCheckBadge size={14} />,
    rejected: <HiOutlineXCircle size={14} />,
  };

  return (
    <div
      className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${styles[status] || styles.pending}`}
    >
      {icons[status] || icons.pending}
      {status === "approved" ? "Verified" : status}
    </div>
  );
};

export default ProfileKYCSettings;
