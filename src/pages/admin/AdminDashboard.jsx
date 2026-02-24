import React from "react";
import {
  useGetAllUsersQuery,
  useGetAllTransactionsQuery,
  useGetMyWalletQuery, // If you want to see individual wallet details
  useUpdateTransactionStatusMutation,
} from "../../api/apiSlice";
import toast from "react-hot-toast";
import { HiOutlineEye, HiCheck, HiXMark } from "react-icons/hi2";

const AdminDashboard = () => {
  const { data: allUsers = [], isLoading: usersLoading } =
    useGetAllUsersQuery();
  const { data: allTransactions = [], isLoading: txLoading } =
    useGetAllTransactionsQuery();

  const [updateTransactionStatus, { isLoading: isApproving }] =
    useUpdateTransactionStatusMutation();

  // 1. Calculate Real Liquidity from User Wallets (Source of Truth)
  const platformEquity = allUsers.reduce(
    (sum, u) => sum + (u.wallet?.totalBalance || 0),
    0,
  );

  const pendingDeposits = allTransactions.filter(
    (tx) => tx.type === "deposit" && tx.status === "pending",
  );
  const pendingWithdrawals = allTransactions.filter(
    (tx) => tx.type === "withdrawal" && tx.status === "pending",
  );

  const handleApprove = async (id) => {
    const toastId = toast.loading("Processing...");
    try {
      // Pass the object with transactionId and status
      await updateTransactionStatus({
        transactionId: id,
        status: "completed",
      }).unwrap();

      toast.success("Success!", { id: toastId });
    } catch (err) {
      toast.error(err?.data?.message || "Failed", { id: toastId });
    }
  };

  if (usersLoading || txLoading)
    return (
      <div className="p-10 text-sky-500 italic uppercase font-black animate-pulse">
        Fetching Terminal Ledger...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto space-y-10 p-6 animate-in fade-in duration-700">
      <header>
        <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase">
          Command <span className="text-sky-500">Terminal</span>
        </h1>
        <p className="text-gray-500 text-sm font-medium">
          Platform-wide liquidity and audit controls.
        </p>
      </header>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Active Investors",
            val: allUsers.length,
            color: "text-white",
          },
          {
            label: "Total Platform Equity",
            val: `$${platformEquity.toLocaleString()}`,
            color: "text-emerald-500",
          },
          {
            label: "Awaiting Proof Audit",
            val: pendingDeposits.length,
            color: "text-amber-500",
          },
          {
            label: "Pending Payouts",
            val: pendingWithdrawals.length,
            color: "text-red-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-[#0A0C10] border border-white/5 p-6 rounded-[2rem] shadow-xl"
          >
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
              {stat.label}
            </p>
            <h2 className={`text-2xl font-black mt-2 ${stat.color}`}>
              {stat.val}
            </h2>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* DEPOSIT AUDIT QUEUE */}
        <div className="bg-[#0A0C10] border border-white/5 rounded-[2.5rem] p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-black text-xs uppercase tracking-widest italic">
              Deposit Audit Queue
            </h3>
            <span className="bg-amber-500/10 text-amber-500 text-[9px] px-3 py-1 rounded-full font-black uppercase">
              Requires Verification
            </span>
          </div>

          <div className="space-y-4">
            {pendingDeposits.map((tx) => (
              <div
                key={tx._id}
                className="flex items-center justify-between p-5 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-sky-500/30 transition-all group"
              >
                <div className="space-y-1">
                  <p className="text-sm font-black text-white uppercase tracking-tight">
                    {tx.user?.firstName} {tx.user?.lastName}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500 font-mono text-xs font-bold">
                      ${tx.amount.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">
                      via {tx.method}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {/* PREVIEW SLIP BUTTON */}
                  <a
                    href={tx.proofImage}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-white/5 text-gray-400 hover:text-white rounded-xl transition-colors"
                    title="View Receipt"
                  >
                    <HiOutlineEye size={18} />
                  </a>

                  <button
                    onClick={() => handleApprove(tx._id)}
                    disabled={isApproving}
                    className="flex items-center gap-2 px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-black text-[10px] font-black uppercase rounded-xl transition-all active:scale-95"
                  >
                    <HiCheck size={16} /> Approve
                  </button>
                </div>
              </div>
            ))}
            {pendingDeposits.length === 0 && (
              <div className="py-10 text-center border-2 border-dashed border-white/5 rounded-3xl">
                <p className="text-gray-600 text-xs italic font-bold uppercase tracking-widest">
                  Clear Skies: No Pending Audits
                </p>
              </div>
            )}
          </div>
        </div>

        {/* WITHDRAWAL CLAIMS */}
        <div className="bg-[#0A0C10] border border-white/5 rounded-[2.5rem] p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-black text-xs uppercase tracking-widest italic">
              Withdrawal Claims
            </h3>
            <span className="bg-red-500/10 text-red-500 text-[9px] px-3 py-1 rounded-full font-black uppercase">
              Liquidity Outflow
            </span>
          </div>

          <div className="space-y-4">
            {pendingWithdrawals.map((tx) => (
              <div
                key={tx._id}
                className="flex items-center justify-between p-5 bg-white/[0.02] rounded-2xl border border-white/5 group"
              >
                <div>
                  <p className="text-sm font-black text-white uppercase tracking-tight">
                    {tx.user?.firstName} {tx.user?.lastName}
                  </p>
                  <p className="text-[10px] text-gray-500 font-mono truncate max-w-[150px]">
                    To: {tx.payoutAddress || "Manual Settlement"}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-red-500 font-black text-sm">
                    -${tx.amount.toLocaleString()}
                  </span>
                  <button
                    onClick={() => {
                      /* Implement Payout Confirmation Logic */
                    }}
                    className="px-5 py-3 bg-sky-600 hover:bg-sky-500 text-white text-[10px] font-black uppercase rounded-xl transition-all"
                  >
                    Settle
                  </button>
                </div>
              </div>
            ))}
            {pendingWithdrawals.length === 0 && (
              <div className="py-10 text-center border-2 border-dashed border-white/5 rounded-3xl">
                <p className="text-gray-600 text-xs italic font-bold uppercase tracking-widest">
                  No Active Claims
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
