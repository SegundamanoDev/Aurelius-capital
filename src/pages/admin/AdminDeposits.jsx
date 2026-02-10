import React from "react";
import { HiOutlineCheck, HiOutlineXMark, HiOutlineEye } from "react-icons/hi2";
import {
  useGetAllTransactionsQuery,
  useUpdateTransactionStatusMutation,
} from "../../api/apiSlice";
import toast from "react-hot-toast"; // 1. Import toast

const AdminDeposits = () => {
  const { data: transactions, isLoading, error } = useGetAllTransactionsQuery();

  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateTransactionStatusMutation();

  const pendingDeposits =
    transactions?.filter(
      (t) => t.type === "deposit" && t.status === "pending",
    ) || [];

  const handleAction = async (id, status) => {
    // 2. Create a promise-based toast
    const actionTask = updateStatus({ transactionId: id, status }).unwrap();

    toast.promise(
      actionTask,
      {
        loading: `Updating record to ${status}...`,
        success: (data) => `Transaction ${status} successfully!`,
        error: (err) => err?.data?.message || "Critical error updating status",
      },
      {
        style: {
          minWidth: "250px",
          background: "#05070A",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.05)",
          fontSize: "12px",
          fontWeight: "bold",
          textTransform: "uppercase",
        },
        success: {
          duration: 4000,
          iconTheme: { primary: "#10b981", secondary: "#fff" },
        },
      },
    );
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl text-red-500 text-sm font-bold">
        Terminal Error: Failed to fetch secure transaction stream.
      </div>
    );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
          Funding Approvals
          <span className="ml-3 text-sky-500 bg-sky-500/10 px-3 py-1 rounded-full text-sm">
            {pendingDeposits.length}
          </span>
        </h2>
      </div>

      <div className="grid gap-4">
        {pendingDeposits.length > 0 ? (
          pendingDeposits.map((dep) => (
            <div
              key={dep._id}
              className="group bg-[#05070A] border border-white/5 p-6 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 bg-white/5 rounded-2xl flex items-center justify-center text-sky-500 border border-white/10 group-hover:scale-105 transition-transform">
                  <HiOutlineEye size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    {dep.userId?.firstName} {dep.userId?.lastName}
                  </h4>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
                    {dep.method} Protocol •{" "}
                    {new Date(dep.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="text-left md:text-center px-6 py-3 bg-white/[0.02] rounded-2xl border border-white/5">
                <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">
                  Volume Requested
                </p>
                <h3 className="text-xl font-black text-emerald-500 font-mono">
                  ${dep.amount.toLocaleString()}
                </h3>
              </div>

              <div className="flex gap-3">
                <button
                  disabled={isUpdating}
                  onClick={() => handleAction(dep._id, "completed")}
                  className="flex-1 md:flex-none px-8 py-4 bg-sky-500 text-black font-black text-[10px] uppercase rounded-2xl hover:bg-sky-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/10 disabled:opacity-50"
                >
                  <HiOutlineCheck size={18} /> Approve
                </button>
                <button
                  disabled={isUpdating}
                  onClick={() => handleAction(dep._id, "failed")}
                  className="flex-1 md:flex-none px-8 py-4 bg-red-500/10 text-red-500 font-black text-[10px] uppercase rounded-2xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <HiOutlineXMark size={18} /> Decline
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-[#05070A] border border-dashed border-white/10 rounded-[3rem]">
            <p className="text-gray-600 font-black uppercase tracking-widest text-xs">
              Clear Skies: No Pending Approvals
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDeposits;
