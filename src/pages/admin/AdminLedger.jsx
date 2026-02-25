import React, { useState } from "react";
import {
  useGetAllUsersQuery,
  useInjectLedgerEntryMutation,
  useGetAllTransactionsQuery,
} from "../../api/apiSlice";
import { HiOutlinePlus, HiOutlineCloudArrowUp } from "react-icons/hi2";
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
    method: "", // Now strictly empty initially
    date: new Date().toISOString().split("T")[0],
  });

  const ledgerActivities = allTransactions
    .filter(
      (t) =>
        t.method === "Legacy Migration" ||
        t.method === "Direct Transfer" ||
        t.description?.toLowerCase().includes("manual"),
    )
    .slice(0, 10);

  const handleCreateEntry = async (e) => {
    e.preventDefault();
    if (
      !formData.userId ||
      !formData.amount ||
      !formData.date ||
      !formData.method
    ) {
      return toast.error("Required: User, Amount, Date, and Payment Method");
    }

    try {
      await injectEntry({
        ...formData,
        amount: Number(formData.amount),
      }).unwrap();

      toast.success("ENTRY COMMITTED TO COLD STORAGE", {
        style: {
          background: "#05070A",
          color: "#fff",
          border: "1px solid #10b981",
          fontSize: "12px",
          borderRadius: "15px",
        },
      });

      // Reset amount and method after success
      setFormData({ ...formData, amount: "", method: "" });
    } catch (err) {
      toast.error(err.data?.message || "Injection Protocol Failed");
    }
  };

  if (usersLoading)
    return (
      <div className="p-20 text-center animate-pulse text-sky-600 dark:text-sky-500 font-black tracking-widest text-xs uppercase">
        Syncing Ledger...
      </div>
    );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white">
          Financial{" "}
          <span className="text-sky-600 dark:text-sky-500">Ledger</span>
        </h1>
        <p className="text-slate-500 dark:text-gray-500 text-[10px] font-black uppercase tracking-widest">
          Manual Terminal for Historical Data Injection
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FORM SIDE */}
        <div className="lg:col-span-1">
          <form
            onSubmit={handleCreateEntry}
            className="bg-white dark:bg-[#05070A] border border-slate-200 dark:border-white/5 p-6 rounded-[2.5rem] space-y-5 sticky top-24 shadow-sm dark:shadow-2xl transition-colors"
          >
            <h3 className="text-slate-900 dark:text-white font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-4">
              <HiOutlinePlus
                className="text-sky-600 dark:text-sky-500"
                size={18}
              />
              Record Creation
            </h3>

            <div className="space-y-4">
              {/* TARGET USER */}
              <div>
                <label className="text-[9px] font-black text-slate-400 dark:text-gray-600 uppercase tracking-[0.2em] mb-2 block">
                  Select Investor
                </label>
                <select
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-xl text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500 transition-all appearance-none cursor-pointer"
                  value={formData.userId}
                  onChange={(e) =>
                    setFormData({ ...formData, userId: e.target.value })
                  }
                >
                  <option value="" className="bg-white dark:bg-black">
                    Choose Account...
                  </option>
                  {allUsers.map((u) => (
                    <option
                      key={u._id}
                      value={u._id}
                      className="bg-white dark:bg-black"
                    >
                      {u.firstName} {u.lastName}
                    </option>
                  ))}
                </select>
              </div>

              {/* ENTRY TYPE TOGGLES */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: "deposit" })}
                  className={`p-3 rounded-xl border text-[10px] font-black uppercase transition-all ${
                    formData.type === "deposit"
                      ? "bg-sky-600 border-sky-600 text-white dark:bg-sky-500 dark:border-sky-500 dark:text-black"
                      : "border-slate-200 dark:border-white/10 text-slate-400 dark:text-gray-500"
                  }`}
                >
                  Deposit
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: "profit" })}
                  className={`p-3 rounded-xl border text-[10px] font-black uppercase transition-all ${
                    formData.type === "profit"
                      ? "bg-emerald-600 border-emerald-600 text-white dark:bg-green-500 dark:border-green-500 dark:text-black"
                      : "border-slate-200 dark:border-white/10 text-slate-400 dark:text-gray-500"
                  }`}
                >
                  Profit
                </button>
              </div>

              {/* MANUAL PAYMENT METHOD INPUT */}
              <div>
                <label className="text-[9px] font-black text-slate-400 dark:text-gray-600 uppercase tracking-[0.2em] mb-2 block">
                  Payment Method
                </label>
                <input
                  type="text"
                  placeholder="Type method here..."
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-xl text-slate-900 dark:text-white text-sm focus:border-sky-500 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-gray-700"
                  value={formData.method}
                  onChange={(e) =>
                    setFormData({ ...formData, method: e.target.value })
                  }
                />
              </div>

              {/* AMOUNT & DATE */}
              <div className="space-y-4">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 pl-8 rounded-xl text-slate-900 dark:text-white font-mono text-lg focus:border-sky-500 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-gray-700"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                </div>
                <input
                  type="date"
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-xl text-slate-900 dark:text-white text-sm focus:border-sky-500 outline-none transition-all"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isInjecting}
              className="w-full py-5 bg-sky-600 dark:bg-sky-500 text-white dark:text-black font-black uppercase rounded-2xl text-[11px] tracking-[0.2em] hover:bg-sky-500 transition-all shadow-lg shadow-sky-500/20 disabled:opacity-50"
            >
              {isInjecting ? "WRITING TO BLOCKS..." : "COMMIT TO LEDGER"}
            </button>
          </form>
        </div>

        {/* LIST SIDE */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-[#05070A] border border-slate-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-sm dark:shadow-2xl transition-colors">
            <div className="p-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-white/[0.01]">
              <h3 className="text-slate-900 dark:text-white font-bold text-[10px] uppercase tracking-widest">
                Recent Injections
              </h3>
              <HiOutlineCloudArrowUp
                className="text-sky-600 dark:text-sky-500/50"
                size={20}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-[9px] text-slate-400 dark:text-gray-600 font-black uppercase bg-slate-50/80 dark:bg-black">
                  <tr>
                    <th className="p-5">Investor</th>
                    <th className="p-5">Backdate</th>
                    <th className="p-5">Volume</th>
                    <th className="p-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {ledgerActivities.map((log) => (
                    <tr
                      key={log._id}
                      className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-5">
                        <p className="text-slate-900 dark:text-white font-bold text-xs uppercase tracking-tight">
                          {log.userId?.firstName} {log.userId?.lastName}
                        </p>
                        <p className="text-[9px] text-slate-400 dark:text-gray-600 uppercase font-mono">
                          {log.method}
                        </p>
                      </td>
                      <td className="p-5 text-slate-500 dark:text-gray-400 font-mono text-xs">
                        {new Date(log.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-5">
                        <span
                          className={`font-mono font-black ${
                            log.type === "withdrawal"
                              ? "text-red-600 dark:text-red-500"
                              : "text-emerald-600 dark:text-green-500"
                          }`}
                        >
                          {log.type === "withdrawal" ? "-" : "+"}$
                          {log.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="p-5">
                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-600 dark:text-green-500 text-[8px] font-black uppercase rounded border border-emerald-500/20">
                          Stored
                        </span>
                      </td>
                    </tr>
                  ))}
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
