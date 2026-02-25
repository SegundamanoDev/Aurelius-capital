import React from "react";
import {
  useGetAllUsersQuery,
  useGetAllTransactionsQuery,
  useUpdateTransactionStatusMutation,
  useGetPendingKYCsQuery, // Added to show KYC stats
} from "../../api/apiSlice";
import toast from "react-hot-toast";
import {
  HiOutlineEye,
  HiCheck,
  HiOutlineUsers,
  HiOutlineIdentification,
} from "react-icons/hi2";

const AdminDashboard = () => {
  const { data: allUsers = [], isLoading: usersLoading } =
    useGetAllUsersQuery();
  const { data: allTransactions = [], isLoading: txLoading } =
    useGetAllTransactionsQuery();
  const { data: pendingKyc = [] } = useGetPendingKYCsQuery();

  const [updateTransactionStatus, { isLoading: isApproving }] =
    useUpdateTransactionStatusMutation();

  // Financial Calculations
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
    const toastId = toast.loading("Finalizing Ledger...");
    try {
      await updateTransactionStatus({
        transactionId: id,
        status: "completed",
      }).unwrap();
      toast.success("Transaction Audited", { id: toastId });
    } catch (err) {
      toast.error(err?.data?.message || "Audit Failed", { id: toastId });
    }
  };

  if (usersLoading || txLoading)
    return (
      <div className="p-10 text-sky-600 dark:text-sky-500 italic uppercase font-black animate-pulse tracking-widest text-xs">
        Syncing Command Terminal...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto space-y-10 p-2 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">
            Command{" "}
            <span className="text-sky-600 dark:text-sky-500">Terminal</span>
          </h1>
          <p className="text-slate-500 dark:text-gray-500 text-[10px] font-black uppercase tracking-widest mt-1">
            Platform-wide liquidity & compliance audit
          </p>
        </div>
        <div className="flex gap-2">
          <div className="px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl shadow-sm">
            <p className="text-[8px] font-black text-slate-400 dark:text-gray-500 uppercase">
              System Status
            </p>
            <p className="text-[10px] font-bold text-emerald-500 uppercase flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
              Operational
            </p>
          </div>
        </div>
      </header>

      {/* Financial Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Active Nodes",
            val: allUsers.length,
            color: "text-slate-900 dark:text-white",
            icon: <HiOutlineUsers />,
          },
          {
            label: "Total Equity",
            val: `$${platformEquity.toLocaleString()}`,
            color: "text-emerald-600 dark:text-emerald-500",
            icon: null,
          },
          {
            label: "KYC Backlog",
            val: pendingKyc.length,
            color: "text-sky-600 dark:text-sky-500",
            icon: <HiOutlineIdentification />,
          },
          {
            label: "Awaiting Payout",
            val: pendingWithdrawals.length,
            color: "text-red-600 dark:text-red-500",
            icon: null,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#0A0C10] border border-slate-200 dark:border-white/5 p-6 rounded-[2rem] shadow-sm dark:shadow-xl transition-colors"
          >
            <div className="flex justify-between items-start">
              <p className="text-[10px] text-slate-400 dark:text-gray-500 font-black uppercase tracking-widest">
                {stat.label}
              </p>
              <span className="text-slate-300 dark:text-white/10">
                {stat.icon}
              </span>
            </div>
            <h2 className={`text-2xl font-black mt-2 ${stat.color}`}>
              {stat.val}
            </h2>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* DEPOSIT AUDIT QUEUE */}
        <div className="bg-white dark:bg-[#0A0C10] border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 space-y-6 shadow-sm dark:shadow-2xl transition-colors">
          <div className="flex justify-between items-center">
            <h3 className="text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest italic">
              Deposit Audit Queue
            </h3>
            <span className="bg-amber-500/10 text-amber-600 dark:text-amber-500 text-[9px] px-3 py-1 rounded-full font-black uppercase border border-amber-500/20">
              Pending Proof
            </span>
          </div>

          <div className="space-y-4">
            {pendingDeposits.map((tx) => (
              <div
                key={tx._id}
                className="flex items-center justify-between p-5 bg-slate-50 dark:bg-white/[0.02] rounded-2xl border border-slate-100 dark:border-white/5 hover:border-sky-500/30 transition-all group"
              >
                <div className="space-y-1">
                  <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    {tx.user?.firstName} {tx.user?.lastName}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 dark:text-emerald-500 font-mono text-xs font-bold">
                      +${tx.amount.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-gray-600 font-bold uppercase tracking-tighter">
                      {tx.method}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={tx.proofImage}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-white dark:bg-white/5 text-slate-400 dark:text-gray-400 hover:text-sky-600 dark:hover:text-white rounded-xl transition-colors border border-slate-200 dark:border-transparent"
                  >
                    <HiOutlineEye size={18} />
                  </a>

                  <button
                    onClick={() => handleApprove(tx._id)}
                    disabled={isApproving}
                    className="flex items-center gap-2 px-5 py-3 bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-black text-[10px] font-black uppercase rounded-xl transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                  >
                    <HiCheck size={16} /> Audit
                  </button>
                </div>
              </div>
            ))}
            {pendingDeposits.length === 0 && (
              <EmptyState message="All Deposits Audited" />
            )}
          </div>
        </div>

        {/* WITHDRAWAL CLAIMS */}
        <div className="bg-white dark:bg-[#0A0C10] border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 space-y-6 shadow-sm dark:shadow-2xl transition-colors">
          <div className="flex justify-between items-center">
            <h3 className="text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest italic">
              Withdrawal Claims
            </h3>
            <span className="bg-red-500/10 text-red-600 dark:text-red-500 text-[9px] px-3 py-1 rounded-full font-black uppercase border border-red-500/20">
              Outflow Request
            </span>
          </div>

          <div className="space-y-4">
            {pendingWithdrawals.map((tx) => (
              <div
                key={tx._id}
                className="flex items-center justify-between p-5 bg-slate-50 dark:bg-white/[0.02] rounded-2xl border border-slate-100 dark:border-white/5 transition-all group"
              >
                <div className="min-w-0">
                  <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    {tx.user?.firstName} {tx.user?.lastName}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-gray-500 font-mono truncate max-w-[150px] mt-0.5">
                    {tx.payoutAddress || "Settlement Needed"}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-red-600 dark:text-red-500 font-black text-sm">
                    -${tx.amount.toLocaleString()}
                  </span>
                  <button className="px-5 py-3 bg-sky-600 dark:bg-sky-500 hover:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-black text-[10px] font-black uppercase rounded-xl transition-all shadow-lg shadow-sky-500/20">
                    Settle
                  </button>
                </div>
              </div>
            ))}
            {pendingWithdrawals.length === 0 && (
              <EmptyState message="No Withdrawal Claims" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Empty State Component
const EmptyState = ({ message }) => (
  <div className="py-12 text-center border-2 border-dashed border-slate-100 dark:border-white/5 rounded-[2rem]">
    <p className="text-slate-400 dark:text-gray-600 text-[10px] italic font-black uppercase tracking-[0.2em]">
      {message}
    </p>
  </div>
);

export default AdminDashboard;
