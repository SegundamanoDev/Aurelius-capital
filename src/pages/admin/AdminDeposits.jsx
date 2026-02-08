import React from "react";
import { HiOutlineCheck, HiOutlineXMark, HiOutlineEye } from "react-icons/hi2";

const AdminDeposits = () => {
  // Mock data - in real app, fetch from Redux or Backend
  const pendingDeposits = [
    {
      id: "102",
      user: "Mark Walberg",
      amount: 15000,
      method: "BTC",
      date: "2024-05-12",
      proof: "receipt.jpg",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
        Funding Approvals
      </h2>

      <div className="grid gap-4">
        {pendingDeposits.map((dep) => (
          <div
            key={dep.id}
            className="bg-[#05070A] border border-white/5 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-6">
              <div className="h-16 w-16 bg-white/5 rounded-2xl flex items-center justify-center text-sky-500 border border-white/10">
                <HiOutlineEye size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold">{dep.user}</h4>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                  {dep.method} Transfer • {dep.date}
                </p>
              </div>
            </div>

            <div className="text-left md:text-center">
              <p className="text-[10px] text-gray-500 font-black uppercase">
                Amount Requested
              </p>
              <h3 className="text-2xl font-black text-emerald-500">
                ${dep.amount.toLocaleString()}
              </h3>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 md:flex-none px-6 py-3 bg-sky-500 text-black font-black text-[10px] uppercase rounded-xl hover:bg-sky-400 transition-all flex items-center gap-2">
                <HiOutlineCheck size={16} /> Approve
              </button>
              <button className="flex-1 md:flex-none px-6 py-3 bg-red-500/10 text-red-500 font-black text-[10px] uppercase rounded-xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">
                <HiOutlineXMark size={16} /> Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDeposits;
