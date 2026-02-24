import React, { useState } from "react";
import {
  useGetAllUsersQuery,
  useInjectLedgerEntryMutation,
  useGetAllTransactionsQuery, // Added to see recent activities
} from "../../api/apiSlice";
import {
  HiOutlinePlus,
  HiOutlineCloudArrowUp,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import toast from "react-hot-toast";

const AdminLedger = () => {
  const { data: allUsers = [], isLoading: usersLoading } =
    useGetAllUsersQuery();
  const { data: allTransactions = [] } = useGetAllTransactionsQuery();
  const [injectEntry, { isLoading: isInjecting }] =
    useInjectLedgerEntryMutation();

  const [formData, setFormData] = useState({
    userId: "",
    amount: "",
    type: "deposit",
    method: "Legacy Migration",
    date: new Date().toISOString().split("T")[0], // Default to today
  });

  // Filter only "System Ledger" or "Legacy" notes for the recent activities table
  const ledgerActivities = allTransactions
    .filter(
      (t) => t.method === "Legacy Migration" || t.method === "Direct Transfer",
    )
    .slice(0, 10);

  const handleCreateEntry = async (e) => {
    e.preventDefault();
    if (!formData.userId || !formData.amount || !formData.date) {
      return toast.error("Required: User, Amount, and Date");
    }

    try {
      await injectEntry({
        ...formData,
        amount: Number(formData.amount),
      }).unwrap();

      toast.success("ENTRY COMMITTED TO COLD STORAGE");
      setFormData({ ...formData, amount: "" }); // Reset amount but keep user/date for batching
    } catch (err) {
      toast.error(err.data?.message || "Injection Protocol Failed");
    }
  };

  if (usersLoading)
    return (
      <div className="p-20 text-center animate-pulse text-sky-500 font-black">
        SYNCING LEDGER...
      </div>
    );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">
          Financial <span className="text-sky-500">Ledger</span>
        </h1>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
          Manual Terminal for Historical Data Injection
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FORM SIDE */}
        <div className="lg:col-span-1">
          <form
            onSubmit={handleCreateEntry}
            className="bg-[#05070A] border border-white/5 p-6 rounded-[2.5rem] space-y-5 sticky top-24 shadow-2xl"
          >
            <h3 className="text-white font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 border-b border-white/5 pb-4">
              <HiOutlinePlus className="text-sky-500" size={18} /> Record
              Creation
            </h3>

            <div className="space-y-4">
              {/* TARGET USER */}
              <div className="group">
                <label className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] mb-2 block">
                  Select Investor
                </label>
                <select
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-sm outline-none focus:border-sky-500 transition-all appearance-none cursor-pointer"
                  value={formData.userId}
                  onChange={(e) =>
                    setFormData({ ...formData, userId: e.target.value })
                  }
                >
                  <option value="" className="bg-black">
                    Choose Account...
                  </option>
                  {allUsers.map((u) => (
                    <option key={u._id} value={u._id} className="bg-black">
                      {u.firstName} {u.lastName}
                    </option>
                  ))}
                </select>
              </div>

              {/* ENTRY TYPE */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: "deposit" })}
                  className={`p-3 rounded-xl border text-[10px] font-black uppercase transition-all ${formData.type === "deposit" ? "bg-sky-500 border-sky-500 text-black" : "border-white/10 text-gray-500"}`}
                >
                  Deposit
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: "profit" })}
                  className={`p-3 rounded-xl border text-[10px] font-black uppercase transition-all ${formData.type === "profit" ? "bg-green-500 border-green-500 text-black" : "border-white/10 text-gray-500"}`}
                >
                  Profit
                </button>
              </div>

              {/* AMOUNT & DATE */}
              <div className="space-y-4">
                <input
                  type="number"
                  placeholder="0.00 USD"
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white font-mono text-lg focus:border-sky-500 outline-none"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                />
                <input
                  type="date"
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-sm focus:border-sky-500 outline-none invert-calendar-icon"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>

              {/* METHOD */}
              <select
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-xs outline-none"
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
              </select>
            </div>

            <button
              type="submit"
              disabled={isInjecting}
              className="w-full py-5 bg-sky-500 text-black font-black uppercase rounded-2xl text-[11px] tracking-[0.2em] hover:bg-sky-400 active:scale-95 transition-all shadow-xl shadow-sky-500/20"
            >
              {isInjecting ? "WRITING TO BLOCKS..." : "COMMIT TO LEDGER"}
            </button>
          </form>
        </div>

        {/* LIST SIDE */}
        <div className="lg:col-span-2">
          <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
              <h3 className="text-white font-bold text-[10px] uppercase tracking-widest">
                Recent Injections
              </h3>
              <HiOutlineCloudArrowUp className="text-sky-500/50" size={20} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-[9px] text-gray-600 font-black uppercase bg-black">
                  <tr>
                    <th className="p-5">Investor</th>
                    <th className="p-5">Backdate</th>
                    <th className="p-5">Volume</th>
                    <th className="p-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {ledgerActivities.map((log) => (
                    <tr
                      key={log._id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-5">
                        <p className="text-white font-bold text-xs">
                          {log.userId?.firstName} {log.userId?.lastName}
                        </p>
                        <p className="text-[9px] text-gray-600 uppercase font-mono">
                          {log.method}
                        </p>
                      </td>
                      <td className="p-5 text-gray-400 font-mono text-xs">
                        {new Date(log.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-5">
                        <span
                          className={`font-mono font-black ${log.type === "withdrawal" ? "text-red-500" : "text-green-500"}`}
                        >
                          {log.type === "withdrawal" ? "-" : "+"}$
                          {log.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="p-5">
                        <span className="px-2 py-1 bg-green-500/10 text-green-500 text-[8px] font-black uppercase rounded border border-green-500/20">
                          Stored
                        </span>
                      </td>
                    </tr>
                  ))}
                  {ledgerActivities.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        className="p-20 text-center text-gray-700 font-black uppercase text-[10px] italic"
                      >
                        No legacy records found in current buffer.
                      </td>
                    </tr>
                  )}
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
