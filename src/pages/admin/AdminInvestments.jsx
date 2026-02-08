import React from "react";
import { useSelector } from "react-redux";
import {
  HiClipboardDocumentList,
  HiOutlineChartBar,
  HiOutlineClock,
} from "react-icons/hi2";

const AdminInvestments = () => {
  const { investmentLogs } = useSelector((state) => state.admin);

  // Quick Analytics for the Admin
  const totalVolume = investmentLogs.reduce((sum, log) => sum + log.amount, 0);
  const activeCapital = investmentLogs
    .filter((log) => log.status === "Active")
    .reduce((sum, log) => sum + log.amount, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
            Investment Logs
          </h1>
          <p className="text-gray-500 text-sm">
            Monitoring global capital distribution across managed strategies.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="bg-[#05070A] border border-white/5 p-4 rounded-2xl flex items-center gap-4">
            <div className="h-10 w-10 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-500">
              <HiOutlineChartBar size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-black uppercase">
                Total Volume
              </p>
              <p className="text-lg font-bold text-white">
                ${totalVolume.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr>
                <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">
                  Investment ID
                </th>
                <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">
                  Investor
                </th>
                <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">
                  Strategy Plan
                </th>
                <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">
                  Capital
                </th>
                <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {investmentLogs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-white/[0.01] transition-colors group"
                >
                  <td className="p-6 font-mono text-xs text-sky-500">
                    {log.id}
                  </td>
                  <td className="p-6">
                    <p className="text-sm font-bold text-white uppercase tracking-tight">
                      {log.user}
                    </p>
                    <p className="text-[10px] text-gray-500 font-medium">
                      {log.date}
                    </p>
                  </td>
                  <td className="p-6">
                    <span
                      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase border ${
                        log.plan.includes("Gold")
                          ? "border-amber-500/20 text-amber-500 bg-amber-500/5"
                          : log.plan.includes("Silver")
                            ? "border-gray-400/20 text-gray-300 bg-gray-400/5"
                            : "border-sky-500/20 text-sky-400 bg-sky-500/5"
                      }`}
                    >
                      {log.plan}
                    </span>
                  </td>
                  <td className="p-6 font-bold text-white">
                    ${log.amount.toLocaleString()}
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-1.5 w-1.5 rounded-full animate-pulse ${log.status === "Active" ? "bg-emerald-500" : "bg-gray-500"}`}
                      />
                      <span
                        className={`text-[10px] font-black uppercase ${log.status === "Active" ? "text-emerald-500" : "text-gray-500"}`}
                      >
                        {log.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Insight */}
      <div className="p-6 bg-sky-500/5 border border-sky-500/10 rounded-3xl flex items-center gap-4">
        <HiOutlineClock className="text-sky-500" size={24} />
        <p className="text-xs text-gray-400 leading-relaxed">
          These logs represent confirmed capital commitments. Profit
          distributions are calculated based on the strategy duration (7, 14, or
          30 days) from the entry date.
        </p>
      </div>
    </div>
  );
};

export default AdminInvestments;
