import React from "react";
import {
  HiOutlineClock,
  HiOutlineXMark,
  HiOutlineBanknotes,
  HiOutlineArrowTopRightOnSquare,
} from "react-icons/hi2";
import {
  useGetAllTransactionsQuery,
  useUpdateTransactionStatusMutation,
} from "../../api/apiSlice";
import { getSymbol } from "../public/Register";
import toast from "react-hot-toast";

const AdminWithdrawals = () => {
  // 1. Fetch all transactions (The tag "Transaction" ensures auto-refresh)
  const { data: transactions, isLoading, error } = useGetAllTransactionsQuery();

  // 2. Use the universal status mutation
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateTransactionStatusMutation();

  // 3. Filter for withdrawals that need attention
  // Note: Check if your backend returns 'userId' or 'user' based on your .populate()
  const pendingWithdrawals =
    transactions?.filter(
      (t) => t.type === "withdrawal" && t.status === "pending",
    ) || [];

  const handleProcessWithdrawal = async (id, status) => {
    // We send exactly what the backend settlement engine expects
    const processPromise = updateStatus({
      transactionId: id,
      status,
    }).unwrap();

    toast.promise(
      processPromise,
      {
        loading: `Finalizing ${status === "completed" ? "settlement" : "reversal"}...`,
        success: `Transaction ${status === "completed" ? "Confirmed" : "Reversed & Refunded"}`,
        error: (err) =>
          err?.data?.message || "Protocol error during settlement",
      },
      {
        style: {
          background: "#05070A",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.05)",
          fontSize: "11px",
          fontWeight: "900",
          textTransform: "uppercase",
        },
      },
    );
  };

  if (isLoading)
    return (
      <div className="p-20 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="p-10 text-red-500 bg-red-500/5 rounded-2xl border border-red-500/10 font-black italic uppercase text-xs">
        Terminal Error: Failed to synchronize withdrawal stream.
      </div>
    );

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">
          Withdrawal <span className="text-amber-500">Claims</span>
        </h2>
        <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.2em]">
            {pendingWithdrawals.length} Action Required
          </p>
        </div>
      </div>

      <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] text-[10px] text-gray-500 uppercase font-black tracking-widest">
              <tr>
                <th className="p-6">Account Investor</th>
                <th className="p-6">Withdrawal Vol.</th>
                <th className="p-6">Payout Destination</th>
                <th className="p-6">Request Date</th>
                <th className="p-6 text-right">Settlement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {pendingWithdrawals.length > 0 ? (
                pendingWithdrawals.map((w) => (
                  <tr
                    key={w._id}
                    className="hover:bg-white/[0.01] transition-colors group"
                  >
                    <td className="p-6">
                      <p className="font-black text-white text-sm uppercase italic">
                        {/* Accessing populated userId fields */}
                        {w.userId?.firstName} {w.userId?.lastName}
                      </p>
                      <p className="text-[10px] text-gray-500 font-medium font-mono">
                        UID: {w.userId?._id?.slice(-8)}
                      </p>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="font-mono text-red-500 font-black text-lg italic">
                          -{getSymbol(w.userId?.currency)}
                          {w.amount.toLocaleString()}
                        </span>
                        <span className="text-[9px] font-black text-gray-600 uppercase tracking-tighter">
                          Platform {w.userId?.currency || "USD"} Base
                        </span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="space-y-1">
                        <p className="text-[10px] text-amber-500 font-black uppercase flex items-center gap-1">
                          <HiOutlineBanknotes size={14} />{" "}
                          {w.details?.method || "Crypto"}
                        </p>
                        <p className="text-[11px] text-white font-mono bg-white/5 p-2 rounded-lg border border-white/5 break-all max-w-[200px]">
                          {w.details?.address || "No address provided"}
                        </p>
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="text-xs text-gray-400 font-bold uppercase italic">
                        {new Date(w.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-[10px] text-gray-600 font-black">
                        {new Date(w.createdAt).toLocaleTimeString()}
                      </p>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          disabled={isUpdating}
                          onClick={() =>
                            handleProcessWithdrawal(w._id, "completed")
                          }
                          className="px-6 py-3 bg-amber-500 text-black font-black text-[10px] uppercase rounded-xl flex items-center gap-2 shadow-lg shadow-amber-500/10 hover:bg-amber-400 active:scale-95 transition-all disabled:opacity-50"
                        >
                          <HiOutlineArrowTopRightOnSquare size={16} /> Mark
                          Settled
                        </button>
                        <button
                          disabled={isUpdating}
                          onClick={() =>
                            handleProcessWithdrawal(w._id, "failed")
                          }
                          className="p-3 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20 hover:bg-red-600 hover:text-white transition-all active:scale-95 disabled:opacity-50"
                          title="Void & Refund"
                        >
                          <HiOutlineXMark size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-32 text-center">
                    <div className="flex flex-col items-center gap-2 opacity-20">
                      <HiOutlineClock size={48} className="text-gray-500" />
                      <p className="text-gray-500 font-black uppercase tracking-[0.4em] text-xs">
                        Audit Queue Empty
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminWithdrawals;
