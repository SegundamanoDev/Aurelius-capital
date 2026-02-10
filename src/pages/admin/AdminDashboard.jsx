import React from "react";
import {
  useGetAllUsersQuery,
  useGetAllTransactionsQuery,
  useUpdateTransactionStatusMutation,
} from "../../api/apiSlice";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  // 1. Fetch Real Data
  const { data: allUsers = [], isLoading: usersLoading } =
    useGetAllUsersQuery();
  const { data: allTransactions = [], isLoading: txLoading } =
    useGetAllTransactionsQuery();
  const [updateStatus] = useUpdateTransactionStatusMutation();

  // 2. Real Calculations
  const totalBalance = allUsers.reduce((sum, u) => sum + (u.balance || 0), 0);
  const pendingDeposits = allTransactions.filter(
    (tx) => tx.type === "deposit" && tx.status === "pending",
  );
  const pendingWithdrawals = allTransactions.filter(
    (tx) => tx.type === "withdrawal" && tx.status === "pending",
  );

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateStatus({ transactionId: id, status }).unwrap();
      toast.success(`Transaction ${status}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  if (usersLoading || txLoading)
    return (
      <div className="p-10 text-white italic uppercase font-black">
        Syncing Terminal Data...
      </div>
    );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
          Command Center
        </h1>
        <p className="text-gray-500 text-sm">
          Real-time platform liquidity oversight.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Total Investors",
            val: allUsers.length,
            color: "text-white",
          },
          {
            label: "Total Assets",
            val: `$${totalBalance.toLocaleString()}`,
            color: "text-sky-500",
          },
          {
            label: "Pending Deposits",
            val: pendingDeposits.length,
            color: "text-amber-500",
          },
          {
            label: "Pending Withdrawals",
            val: pendingWithdrawals.length,
            color: "text-red-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-[#05070A] border border-white/5 p-6 rounded-3xl"
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

      <div className="grid lg:grid-cols-2 gap-8">
        {/* ACTION: Deposits */}
        <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] p-6">
          <h3 className="text-white font-bold mb-6 flex items-center justify-between">
            Awaiting Confirmation (Deposits)
            <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-1 rounded">
              Action Required
            </span>
          </h3>
          <div className="space-y-4">
            {pendingDeposits.map((tx) => (
              <div
                key={tx._id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5"
              >
                <div>
                  <p className="text-sm font-bold text-white uppercase">
                    {tx.user?.name || "Unknown"}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    ${tx.amount.toLocaleString()} via {tx.method}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusUpdate(tx._id, "completed")}
                    className="px-4 py-2 bg-emerald-500 text-black text-[10px] font-black uppercase rounded-lg"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(tx._id, "failed")}
                    className="px-4 py-2 bg-white/5 text-white text-[10px] font-black uppercase rounded-lg"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
            {pendingDeposits.length === 0 && (
              <p className="text-gray-600 text-xs italic">
                No pending deposits.
              </p>
            )}
          </div>
        </div>

        {/* ACTION: Withdrawals */}
        <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] p-6">
          <h3 className="text-white font-bold mb-6 flex items-center justify-between">
            Withdrawal Claims
            <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-1 rounded">
              Critical
            </span>
          </h3>
          <div className="space-y-4">
            {pendingWithdrawals.map((tx) => (
              <div
                key={tx._id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5"
              >
                <div>
                  <p className="text-sm font-bold text-white uppercase">
                    {tx.user?.name || "Unknown"}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    ${tx.amount.toLocaleString()} to{" "}
                    {tx.walletAddress || tx.method}
                  </p>
                </div>
                <button
                  onClick={() => handleStatusUpdate(tx._id, "completed")}
                  className="px-4 py-2 bg-sky-500 text-black text-[10px] font-black uppercase rounded-lg"
                >
                  Confirm Payout
                </button>
              </div>
            ))}
            {pendingWithdrawals.length === 0 && (
              <p className="text-gray-600 text-xs italic">
                No pending withdrawals.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
