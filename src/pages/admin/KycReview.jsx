import React from "react";
import {
  useGetPendingKYCsQuery,
  useReviewKYCMutation,
} from "../../api/apiSlice";
import toast from "react-hot-toast";
import { HiCheck, HiXMark, HiEye } from "react-icons/hi2";

const KycReview = () => {
  const { data: pendingUsers, isLoading } = useGetPendingKYCsQuery();
  const [reviewKyc] = useReviewKYCMutation();

  const handleReview = async (id, status) => {
    let rejectionReason = "";
    if (status === "rejected") {
      rejectionReason = prompt("Reason for rejection:");
      if (!rejectionReason) return;
    }

    try {
      await reviewKyc({ id, status, rejectionReason }).unwrap();
      toast.success(`User KYC ${status}`);
    } catch (err) {
      toast.error("Action failed");
    }
  };

  if (isLoading)
    return (
      <p className="p-10 text-center animate-pulse">
        Loading compliance queue...
      </p>
    );

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-black uppercase tracking-tighter italic">
        Compliance <span className="text-amber-500">Queue</span>
      </h2>

      <div className="overflow-x-auto rounded-3xl border border-slate-100 dark:border-white/5 shadow-2xl">
        <table className="w-full text-left bg-white dark:bg-slate-900 border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <th className="p-5">User</th>
              <th className="p-5">Document</th>
              <th className="p-5">Submitted</th>
              <th className="p-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {pendingUsers?.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-slate-50 dark:hover:bg-white/[0.01] transition-colors"
              >
                <td className="p-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold dark:text-white">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {user.email}
                    </span>
                  </div>
                </td>
                <td className="p-5">
                  <a
                    href={user.kycDetails?.documentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-500/10 text-sky-500 rounded-lg text-[10px] font-black uppercase hover:bg-sky-500 hover:text-white transition-all"
                  >
                    <HiEye size={14} /> View Document
                  </a>
                </td>
                <td className="p-5 text-[10px] font-bold text-slate-400">
                  {new Date(user.kycDetails?.submittedAt).toLocaleDateString()}
                </td>
                <td className="p-5">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleReview(user._id, "approved")}
                      className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition-all"
                    >
                      <HiCheck size={18} />
                    </button>
                    <button
                      onClick={() => handleReview(user._id, "rejected")}
                      className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                    >
                      <HiXMark size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pendingUsers?.length === 0 && (
          <div className="p-20 text-center text-slate-400 text-xs font-bold uppercase tracking-widest italic">
            No pending verifications found
          </div>
        )}
      </div>
    </div>
  );
};

export default KycReview;
