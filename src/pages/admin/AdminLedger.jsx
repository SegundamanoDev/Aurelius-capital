import React, { useState } from "react";
import {
  useGetAllUsersQuery,
  useInjectLedgerEntryMutation,
} from "../../api/apiSlice";
import {
  HiOutlinePlus,
  HiOutlineCloudArrowUp,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import toast from "react-hot-toast";

const AdminLedger = () => {
  const { data: allUsers = [], isLoading } = useGetAllUsersQuery();
  const [injectEntry, { isLoading: isInjecting }] =
    useInjectLedgerEntryMutation();

  const [formData, setFormData] = useState({
    userId: "",
    amount: "",
    type: "deposit", // Default type
    method: "Legacy Migration",
    date: "",
  });

  const handleCreateEntry = async (e) => {
    e.preventDefault();
    if (!formData.userId || !formData.amount || !formData.date) {
      return toast.error("Please complete all required fields");
    }

    try {
      // Ensure amount is passed as a pure number
      await injectEntry({
        ...formData,
        amount: Number(formData.amount),
      }).unwrap();

      toast.success("Historical record injected into ledger");
      setFormData({
        userId: "",
        amount: "",
        type: "deposit",
        method: "Legacy Migration",
        date: "",
      });
    } catch (err) {
      toast.error(err.data?.message || "Injection failed");
    }
  };

  if (isLoading)
    return (
      <div className="p-20 text-center text-gray-500 font-black uppercase tracking-widest animate-pulse">
        Synchronizing User Database...
      </div>
    );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">
          Financial Ledger
        </h1>
        <p className="text-gray-500 text-sm">
          Inject historical transaction data for legacy user migrations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <form
            onSubmit={handleCreateEntry}
            className="bg-[#05070A] border border-white/5 p-6 rounded-[2.5rem] space-y-5 sticky top-24 shadow-2xl"
          >
            <h3 className="text-white font-bold text-sm uppercase flex items-center gap-2">
              <HiOutlinePlus className="text-sky-500" /> New Ledger Entry
            </h3>

            <div className="space-y-4">
              {/* TARGET USER */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Target Investor
                </label>
                <select
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-sm outline-none focus:border-sky-500 appearance-none"
                  value={formData.userId}
                  onChange={(e) =>
                    setFormData({ ...formData, userId: e.target.value })
                  }
                >
                  <option value="" className="bg-black">
                    Select User...
                  </option>
                  {allUsers.map((u) => (
                    <option key={u._id} value={u._id} className="bg-black">
                      {u.firstName} {u.lastName} ({u.email})
                    </option>
                  ))}
                </select>
              </div>

              {/* TRANSACTION TYPE - ADDED HERE */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Entry Type
                </label>
                <select
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-sm outline-none focus:border-sky-500 appearance-none"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <option value="deposit" className="bg-black">
                    Deposit / Funding
                  </option>
                  <option value="profit" className="bg-black">
                    Trading Profit
                  </option>
                  <option value="withdrawal" className="bg-black">
                    Withdrawal
                  </option>
                </select>
              </div>

              {/* AMOUNT */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Amount (USD)
                </label>
                <input
                  type="number"
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-sm outline-none focus:border-sky-500 font-mono"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                />
              </div>

              {/* DATE */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Backdate Transaction
                </label>
                <input
                  type="date"
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-sm outline-none focus:border-sky-500 invert-calendar-icon"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>

              {/* METHOD */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  System Note / Method
                </label>
                <select
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-sm outline-none"
                  value={formData.method}
                  onChange={(e) =>
                    setFormData({ ...formData, method: e.target.value })
                  }
                >
                  <option value="Legacy Migration" className="bg-black">
                    Legacy Migration
                  </option>
                  <option value="Direct Transfer" className="bg-black">
                    Direct Transfer
                  </option>
                  <option value="Profit Distribution" className="bg-black">
                    Profit Distribution
                  </option>
                  <option value="Crypto Settlement" className="bg-black">
                    Crypto Settlement
                  </option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isInjecting}
              className={`w-full py-4 bg-sky-500 text-black font-black uppercase rounded-2xl text-[11px] tracking-widest hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/10 ${isInjecting && "opacity-50 cursor-not-allowed"}`}
            >
              {isInjecting ? "Processing Terminal..." : "Commit to Ledger"}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-white font-bold text-sm uppercase tracking-widest">
                Recent Ledger Activities
              </h3>
              <HiOutlineCloudArrowUp className="text-gray-600" size={20} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[10px] text-gray-500 font-black uppercase bg-white/[0.01]">
                  <tr>
                    <th className="p-5">User</th>
                    <th className="p-5">Record Date</th>
                    <th className="p-5">Amount</th>
                    <th className="p-5">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="text-gray-400 italic">
                    <td colSpan="4" className="p-10 text-center">
                      Records will appear here after manual injection.
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
