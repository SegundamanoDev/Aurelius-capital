import React from "react";
import { HiOutlineCheck, HiOutlineXMark, HiOutlineEye } from "react-icons/hi2";
import {
  useGetAllTransactionsQuery,
  useUpdateTransactionStatusMutation, // Changed to the generic mutation
} from "../../api/apiSlice";
import { getSymbol } from "../public/Register";
import toast from "react-hot-toast";

const AdminDeposits = () => {
  const { data: transactions, isLoading } = useGetAllTransactionsQuery();
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateTransactionStatusMutation();

  const pendingDeposits =
    transactions?.filter(
      (t) => t.type === "deposit" && t.status === "pending",
    ) || [];

  // Generic handler for both Approve and Decline
  const processTransaction = async (id, status) => {
    const actionTask = updateStatus({ transactionId: id, status }).unwrap();

    toast.promise(
      actionTask,
      {
        loading:
          status === "completed"
            ? "Approving & Crediting..."
            : "Rejecting Transaction...",
        success:
          status === "completed" ? "Deposit Approved!" : "Deposit Rejected",
        error: (err) => err?.data?.message || "Process failed",
      },
      {
        style: {
          background: "#05070A",
          color: "#fff",
          fontSize: "12px",
          fontWeight: "bold",
          textTransform: "uppercase",
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

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">
          Funding <span className="text-sky-500 font-black">Approvals</span>
          <span className="ml-3 text-sky-500 bg-sky-500/10 px-3 py-1 rounded-full text-sm font-black italic">
            {pendingDeposits.length}
          </span>
        </h2>
      </div>

      <div className="grid gap-4">
        {pendingDeposits.length > 0 ? (
          pendingDeposits.map((dep) => (
            <div
              key={dep._id}
              className="group bg-[#05070A] border border-white/5 p-6 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-sky-500/20 transition-all duration-300"
            >
              <div className="flex items-center gap-6">
                <a
                  href={dep.proofImage}
                  target="_blank"
                  rel="noreferrer"
                  className="h-16 w-16 bg-white/5 rounded-2xl flex items-center justify-center text-sky-500 border border-white/10 hover:bg-sky-500 hover:text-black transition-all cursor-alias"
                >
                  <HiOutlineEye size={24} />
                </a>

                <div>
                  <h4 className="text-white font-black text-lg uppercase tracking-tight">
                    {dep.user?.firstName} {dep.user?.lastName}
                  </h4>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
                    {dep.method} •{" "}
                    {new Date(dep.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="px-8 py-5 bg-white/[0.02] rounded-3xl border border-white/5 min-w-[200px]">
                <p className="text-[9px] text-gray-500 font-black uppercase mb-1">
                  Volume
                </p>
                <h3 className="text-2xl font-black text-emerald-500 font-mono italic">
                  {getSymbol(dep.user?.currency)} {dep.amount.toLocaleString()}
                </h3>
              </div>

              <div className="flex gap-3">
                <button
                  disabled={isUpdating}
                  onClick={() => processTransaction(dep._id, "completed")}
                  className="px-10 py-5 bg-sky-600 text-white font-black text-[10px] uppercase rounded-2xl hover:bg-sky-500 transition-all active:scale-95 disabled:opacity-50"
                >
                  <HiOutlineCheck size={20} className="inline mr-2" /> Approve
                </button>
                <button
                  disabled={isUpdating}
                  onClick={() => processTransaction(dep._id, "failed")}
                  className="px-8 py-5 bg-transparent text-gray-500 font-black text-[10px] uppercase rounded-2xl border border-white/10 hover:border-red-500/50 hover:text-red-500 transition-all active:scale-95 disabled:opacity-50"
                >
                  <HiOutlineXMark size={20} className="inline mr-2" /> Decline
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-32 bg-[#05070A] border-2 border-dashed border-white/5 rounded-[4rem] text-center">
            <p className="text-gray-700 font-black uppercase tracking-[0.5em] text-[10px] italic">
              Empty Audit Log
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDeposits;
