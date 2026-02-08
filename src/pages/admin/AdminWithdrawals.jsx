import React from "react";
import { HiOutlineBanknotes, HiOutlineClock } from "react-icons/hi2";

const AdminWithdrawals = () => {
  const withdrawals = [
    {
      id: "W-992",
      user: "John Doe",
      amount: 4200,
      gateway: "Bitcoin Wallet",
      address: "bc1q...3wlh",
      date: "2024-05-11",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
        Withdrawal Claims
      </h2>

      <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/[0.02] text-[10px] text-gray-500 uppercase font-black">
            <tr>
              <th className="p-6">Investor</th>
              <th className="p-6">Amount</th>
              <th className="p-6">Destination</th>
              <th className="p-6">Timestamp</th>
              <th className="p-6 text-right">Processing</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {withdrawals.map((w) => (
              <tr key={w.id} className="hover:bg-white/[0.01]">
                <td className="p-6 font-bold text-white text-sm uppercase">
                  {w.user}
                </td>
                <td className="p-6 font-mono text-red-400 font-bold">
                  -${w.amount.toLocaleString()}
                </td>
                <td className="p-6">
                  <p className="text-xs text-white font-bold">{w.gateway}</p>
                  <p className="text-[10px] text-gray-500 font-mono">
                    {w.address}
                  </p>
                </td>
                <td className="p-6 text-xs text-gray-400 font-medium">
                  {w.date}
                </td>
                <td className="p-6 text-right">
                  <button className="px-4 py-2 bg-amber-500 text-black font-black text-[10px] uppercase rounded-lg flex items-center gap-2 ml-auto shadow-lg shadow-amber-500/20">
                    <HiOutlineClock /> Mark Paid
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminWithdrawals;
