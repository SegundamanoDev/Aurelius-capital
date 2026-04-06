import React, { useState } from "react";
import {
  useGetAllUsersQuery,
  useInjectLedgerEntryMutation,
  useGetAllTransactionsQuery,
} from "../../api/apiSlice";
import {
  HiOutlinePlus,
  HiOutlineCloudArrowUp,
  HiOutlineShieldCheck,
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
    type: "deposit", // deposit, profit, withdrawal
    method: "Institutional Wire",
    date: new Date().toISOString().split("T")[0],
  });

  // Filter to show historical injections
  const ledgerActivities = allTransactions
    .filter((t) =>
      ["Institutional Wire", "Capital Settlement", "Internal Ledger"].includes(
        t.method,
      ),
    )
    .slice(0, 10);

  const handleCreateEntry = async (e) => {
    e.preventDefault();
    if (!formData.userId || !formData.amount || !formData.method) {
      return toast.error("Missing Audit Parameters");
    }

    try {
      await injectEntry({
        ...formData,
        amount: Number(formData.amount),
      }).unwrap();

      toast.success("FINANCIAL RECORD RECONCILED", {
        style: {
          background: "#05070A",
          color: "#fff",
          border: "1px solid #10b981",
        },
      });

      setFormData({ ...formData, amount: "", method: "Institutional Wire" });
    } catch (err) {
      toast.error(err.data?.message || "Protocol Failure");
    }
  };

  if (usersLoading)
    return (
      <div className="p-20 text-center animate-pulse text-sky-500 font-black text-xs">
        SYNCHRONIZING AUDIT LOGS...
      </div>
    );

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white">
          Capital{" "}
          <span className="text-sky-600 dark:text-sky-500">Reconciliation</span>
        </h1>
        <p className="text-slate-500 dark:text-gray-500 text-[9px] font-black uppercase tracking-[0.3em]">
          Institutional Terminal for Balance Adjustments & Backdating
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FORM SIDE */}
        <form
          onSubmit={handleCreateEntry}
          className="lg:col-span-1 bg-white dark:bg-[#05070A] border border-slate-200 dark:border-white/5 p-6 rounded-[2rem] space-y-5 shadow-2xl transition-all"
        >
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-4">
            <HiOutlineShieldCheck className="text-emerald-500" size={20} />
            <h3 className="text-slate-900 dark:text-white font-bold text-[10px] uppercase tracking-widest">
              Audit Entry
            </h3>
          </div>

          <div className="space-y-4">
            {/* USER SELECT */}
            <div>
              <label className="text-[9px] font-black text-slate-400 dark:text-gray-600 uppercase mb-2 block">
                Target Portfolio
              </label>
              <select
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-xl text-slate-900 dark:text-white text-xs outline-none"
                value={formData.userId}
                onChange={(e) =>
                  setFormData({ ...formData, userId: e.target.value })
                }
              >
                <option value="">Select Account...</option>
                {allUsers.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.firstName} {u.lastName} ({u.email})
                  </option>
                ))}
              </select>
            </div>

            {/* ENTRY TYPE - Now includes Withdrawal */}
            <div className="grid grid-cols-3 gap-2">
              {["deposit", "profit", "withdrawal"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: t })}
                  className={`py-3 rounded-lg border text-[8px] font-black uppercase transition-all ${
                    formData.type === t
                      ? "bg-sky-600 border-sky-600 text-white"
                      : "border-slate-200 dark:border-white/10 text-slate-400"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* PROFESSIONAL METHOD */}
            <div>
              <label className="text-[9px] font-black text-slate-400 dark:text-gray-600 uppercase mb-2 block">
                Settlement Method
              </label>
              <input
                type="text"
                placeholder="e.g. Bank Wire / USDT Settlement"
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-xl text-slate-900 dark:text-white text-xs outline-none"
                value={formData.method}
                onChange={(e) =>
                  setFormData({ ...formData, method: e.target.value })
                }
              />
            </div>

            {/* AMOUNT & BACKDATE */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Volume ($)"
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-xl text-slate-900 dark:text-white font-mono text-sm outline-none"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
              <input
                type="date"
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-xl text-slate-900 dark:text-white text-xs outline-none"
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
            className="w-full py-5 bg-sky-600 text-white font-black uppercase rounded-2xl text-[10px] tracking-widest hover:bg-sky-500 transition-all disabled:opacity-50"
          >
            {isInjecting ? "RECONCILING..." : "AUTHENTICATE & COMMIT"}
          </button>
        </form>

        {/* LIST SIDE */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-[#05070A] border border-slate-200 dark:border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
              <h3 className="text-slate-900 dark:text-white font-bold text-[10px] uppercase tracking-widest">
                Recent Audit Trails
              </h3>
              <HiOutlineCloudArrowUp className="text-sky-500" size={20} />
            </div>

            <table className="w-full text-left">
              <thead className="text-[8px] text-slate-400 dark:text-gray-600 font-black uppercase bg-slate-50 dark:bg-black">
                <tr>
                  <th className="p-4">Entity</th>
                  <th className="p-4">Effective Date</th>
                  <th className="p-4">Volume</th>
                  <th className="p-4">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {ledgerActivities.map((log) => (
                  <tr
                    key={log._id}
                    className="text-[11px] text-slate-600 dark:text-gray-400"
                  >
                    <td className="p-4">
                      <p className="font-bold text-slate-900 dark:text-white uppercase">
                        {log.user?.firstName} {log.user?.lastName}
                      </p>
                      <p className="text-[8px] opacity-50">{log.description}</p>
                    </td>
                    <td className="p-4 font-mono">
                      {new Date(log.createdAt).toLocaleDateString()}
                    </td>
                    <td
                      className={`p-4 font-bold font-mono ${log.type === "withdrawal" ? "text-red-500" : "text-emerald-500"}`}
                    >
                      {log.type === "withdrawal" ? "-" : "+"}$
                      {log.amount.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase rounded border border-emerald-500/20">
                        Verified
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
  );
};

export default AdminLedger;
