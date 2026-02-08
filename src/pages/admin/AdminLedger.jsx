import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  HiOutlinePlus,
  HiOutlineCloudArrowUp,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import toast from "react-hot-toast";

const AdminLedger = () => {
  const { allUsers } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({
    userId: "",
    amount: "",
    type: "deposit",
    method: "Legacy Migration",
    date: "",
  });

  const handleCreateEntry = (e) => {
    e.preventDefault();
    if (!formData.userId || !formData.amount || !formData.date) {
      return toast.error("Please complete all required fields");
    }
    // Backend Logic will go here
    toast.success("Historical record injected into ledger");
    setFormData({
      userId: "",
      amount: "",
      type: "deposit",
      method: "Legacy Migration",
      date: "",
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter">
          Financial Ledger
        </h1>
        <p className="text-gray-500 text-sm">
          Inject historical transaction data for legacy user migrations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FORM SIDE */}
        <div className="lg:col-span-1">
          <form
            onSubmit={handleCreateEntry}
            className="bg-[#05070A] border border-white/5 p-6 rounded-[2.5rem] space-y-5 sticky top-24"
          >
            <h3 className="text-white font-bold text-sm uppercase flex items-center gap-2">
              <HiOutlinePlus className="text-sky-500" /> New Ledger Entry
            </h3>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase">
                  Target Investor
                </label>
                <select
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-sm outline-none focus:border-sky-500"
                  value={formData.userId}
                  onChange={(e) =>
                    setFormData({ ...formData, userId: e.target.value })
                  }
                >
                  <option value="">Select User...</option>
                  {allUsers?.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase">
                  Amount (USD)
                </label>
                <input
                  type="number"
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-sm outline-none focus:border-sky-500"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase">
                  Backdate Transaction
                </label>
                <input
                  type="date"
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-sm outline-none focus:border-sky-500"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase">
                  Migration Method
                </label>
                <select
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-sm outline-none"
                  value={formData.method}
                  onChange={(e) =>
                    setFormData({ ...formData, method: e.target.value })
                  }
                >
                  <option value="Legacy Migration">Legacy Migration</option>
                  <option value="Direct Transfer">Direct Transfer</option>
                  <option value="Crypto Settlement">Crypto Settlement</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-sky-500 text-black font-black uppercase rounded-2xl text-[11px] tracking-widest hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/10"
            >
              Commit to Ledger
            </button>
          </form>
        </div>

        {/* LIST SIDE */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-white font-bold text-sm uppercase">
                Recent Entries
              </h3>
              <HiOutlineCloudArrowUp className="text-gray-600" size={20} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[10px] text-gray-500 font-black uppercase bg-white/[0.01]">
                  <tr>
                    <th className="p-5">User</th>
                    <th className="p-5">Date</th>
                    <th className="p-5">Amount</th>
                    <th className="p-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="text-gray-400 italic">
                    <td colSpan="4" className="p-10 text-center">
                      No recent entries found. Select a user to inject data.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLedger;
