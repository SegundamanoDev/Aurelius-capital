import React from "react";
import {
  HiOutlineClock,
  HiOutlineXMark,
  HiOutlineBanknotes,
} from "react-icons/hi2";
import {
  useGetAllTransactionsQuery,
  useUpdateTransactionStatusMutation,
} from "../../api/apiSlice";
import toast from "react-hot-toast";

const AdminWithdrawals = () => {
  // 1. Fetch real-time data
  const { data: transactions, isLoading, error } = useGetAllTransactionsQuery();

  // 2. Setup Mutation
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateTransactionStatusMutation();

  // 3. Filter for Pending Withdrawals
  const pendingWithdrawals =
    transactions?.filter(
      (t) => t.type === "withdrawal" && t.status === "pending",
    ) || [];

  const handleProcessWithdrawal = async (id, status) => {
    const processPromise = updateStatus({ transactionId: id, status }).unwrap();

    toast.promise(
      processPromise,
      {
        loading: `Processing withdrawal ${status === "completed" ? "payout" : "rejection"}...`,
        success: `Claim marked as ${status === "completed" ? "Paid" : "Declined"}`,
        error: (err) => err?.data?.message || "Failed to process withdrawal",
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
      <div className="p-10 text-red-500 bg-red-500/5 rounded-2xl border border-red-500/10 font-bold">
        Failed to synchronize withdrawal stream. Check node connection.
      </div>
    );

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
          Withdrawal Claims
        </h2>
        <div className="px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full">
          <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest">
            {pendingWithdrawals.length} Pending Requests
          </p>
        </div>
      </div>

      <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] text-[10px] text-gray-500 uppercase font-black">
              <tr>
                <th className="p-6">Investor</th>
                <th className="p-6">Amount</th>
                <th className="p-6">Destination</th>
                <th className="p-6">Timestamp</th>
                <th className="p-6 text-right">Terminal Action</th>
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
                      <p className="font-bold text-white text-sm uppercase">
                        {w.userId?.firstName} {w.userId?.lastName}
                      </p>
                      <p className="text-[10px] text-gray-500 font-medium lowercase">
                        {w.userId?.email}
                      </p>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="font-mono text-red-400 font-black text-base">
                          -${w.amount.toLocaleString()}
                        </span>
                        <span className="text-[9px] text-gray-600 font-bold uppercase">
                          USD Asset
                        </span>
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="text-xs text-white font-bold mb-1 flex items-center gap-2">
                        <HiOutlineBanknotes className="text-amber-500" />{" "}
                        {w.method}
                      </p>
                      <p className="text-[10px] text-gray-500 font-mono break-all max-w-[150px] bg-white/5 p-1.5 rounded border border-white/5">
                        {w.referenceId || "N/A"}
                      </p>
                    </td>
                    <td className="p-6 text-xs text-gray-400 font-medium">
                      {new Date(w.createdAt).toLocaleDateString()}
                      <br />
                      <span className="text-[10px] text-gray-600">
                        {new Date(w.createdAt).toLocaleTimeString()}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          disabled={isUpdating}
                          onClick={() =>
                            handleProcessWithdrawal(w._id, "completed")
                          }
                          className="px-4 py-2.5 bg-amber-500 text-black font-black text-[10px] uppercase rounded-xl flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all disabled:opacity-50"
                        >
                          <HiOutlineClock size={14} /> Mark Paid
                        </button>
                        <button
                          disabled={isUpdating}
                          onClick={() =>
                            handleProcessWithdrawal(w._id, "failed")
                          }
                          className="p-2.5 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                          title="Decline Claim"
                        >
                          <HiOutlineXMark size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-20 text-center">
                    <p className="text-gray-600 font-black uppercase tracking-widest text-xs italic">
                      No Withdrawal Claims in Queue
                    </p>
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
