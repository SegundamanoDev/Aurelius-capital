import React from "react";
import { useSelector, useDispatch } from "react-redux";
// Assume your userSlice/adminSlice has these actions
// import { approveDeposit, approveWithdrawal } from '../../features/adminSlice';

const AdminDashboard = () => {
  const { allUsers } = useSelector((state) => state.admin);

  // Example Stat Calculation
  const totalBalance = allUsers.reduce((sum, u) => sum + u.balance, 0);
  const pendingDeposits = 12; // This would come from your real state
  const pendingWithdrawals = 5;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
            Command Center
          </h1>
          <p className="text-gray-500 text-sm">
            Real-time oversight of all platform liquidity and user actions.
          </p>
        </div>
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
            val: pendingDeposits,
            color: "text-amber-500",
          },
          {
            label: "Pending Withdrawals",
            val: pendingWithdrawals,
            color: "text-red-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-[#05070A] border border-white/5 p-6 rounded-3xl shadow-xl"
          >
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">
              {stat.label}
            </p>
            <h2 className={`text-2xl font-black mt-2 ${stat.color}`}>
              {stat.val}
            </h2>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* ACTION: Approve Deposits */}
        <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] p-6">
          <h3 className="text-white font-bold mb-6 flex items-center justify-between">
            Awaiting Confirmation (Deposits)
            <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-1 rounded">
              Action Required
            </span>
          </h3>
          <div className="space-y-4">
            {/* Map through pending deposits from state */}
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-sky-500/30 transition-all">
              <div>
                <p className="text-sm font-bold text-white uppercase">
                  John Doe
                </p>
                <p className="text-[10px] text-gray-500">
                  Requested: $5,000.00 (BTC)
                </p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-emerald-500 text-black text-[10px] font-black uppercase rounded-lg">
                  Approve
                </button>
                <button className="px-4 py-2 bg-white/5 text-white text-[10px] font-black uppercase rounded-lg">
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ACTION: Approve Withdrawals */}
        <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] p-6">
          <h3 className="text-white font-bold mb-6 flex items-center justify-between">
            Withdrawal Claims
            <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-1 rounded">
              Critical
            </span>
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
              <div>
                <p className="text-sm font-bold text-white uppercase">
                  Sarah Smith
                </p>
                <p className="text-[10px] text-gray-500">
                  Payout: $1,200.00 (PayPal)
                </p>
              </div>
              <button className="px-4 py-2 bg-sky-500 text-black text-[10px] font-black uppercase rounded-lg">
                Confirm Payout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
