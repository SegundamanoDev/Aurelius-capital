import React, { useState } from "react";
import { useGetMyTransactionsQuery } from "../../api/apiSlice";
import {
  HiOutlineArrowsRightLeft,
  HiOutlineArrowUpRight,
  HiOutlineArrowDownLeft,
  HiXMark,
  HiOutlineArrowPath,
  HiOutlineDocumentText,
  HiOutlineCreditCard,
} from "react-icons/hi2";

const Transactions = () => {
  const {
    data: transactions = [],
    isLoading,
    refetch,
  } = useGetMyTransactionsQuery();
  const [selectedTx, setSelectedTx] = useState(null);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "pending":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "failed":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-white/5";
    }
  };

  const getTxIcon = (type) => {
    if (type?.toLowerCase().includes("deposit"))
      return <HiOutlineArrowDownLeft className="text-emerald-500" />;
    if (type?.toLowerCase().includes("withdraw"))
      return <HiOutlineArrowUpRight className="text-rose-500" />;
    return <HiOutlineArrowsRightLeft className="text-sky-500" />;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex justify-between items-center px-2">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight uppercase italic">
            Financial <span className="text-sky-500">Ledger</span>
          </h1>
          <p className="text-gray-500 text-xs font-medium tracking-wide">
            Immutable record of all account settlements and activity.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-95"
        >
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white">
            Sync Feed
          </span>
          <HiOutlineArrowPath
            size={16}
            className={`text-sky-500 ${isLoading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`}
          />
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-[#0A0C10] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-3xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/10">
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                  Event Type
                </th>
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                  Settlement Date
                </th>
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-right">
                  Volume (USD)
                </th>
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-center">
                  Protocol Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {isLoading ? (
                <LoadingSkeleton />
              ) : transactions.length > 0 ? (
                transactions.map((tx) => (
                  <tr
                    key={tx._id || tx.id}
                    onClick={() => setSelectedTx(tx)}
                    className="hover:bg-sky-500/[0.03] transition-all cursor-pointer group relative"
                  >
                    <td className="p-5 flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-sky-500/50 transition-all">
                        {getTxIcon(tx.type)}
                      </div>
                      <div>
                        <p className="text-sm font-black text-white uppercase tracking-tight leading-none mb-1">
                          {tx.type.replace("_", " ")}
                        </p>
                        <p className="text-[10px] text-gray-500 font-mono">
                          REF:{" "}
                          {tx.referenceId || tx._id?.slice(-8).toUpperCase()}
                        </p>
                      </div>
                    </td>
                    <td className="p-5 text-sm text-gray-400 font-medium">
                      {new Date(tx.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td
                      className={`p-5 text-sm font-black text-right ${tx.type === "deposit" || tx.type === "trading_yield" ? "text-emerald-500" : "text-white"}`}
                    >
                      {tx.type === "deposit" ? "+" : "-"}$
                      {tx.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="p-5 text-center">
                      <span
                        className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase border tracking-tighter ${getStatusStyle(tx.status)}`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <EmptyState />
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Slide-over */}
      {selectedTx && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-in fade-in"
            onClick={() => setSelectedTx(null)}
          />
          <div className="fixed top-4 right-4 bottom-4 w-full max-w-[420px] bg-[#0A0C10] border border-white/10 z-[110] rounded-[2.5rem] p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-right duration-500 flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-2">
                <HiOutlineDocumentText className="text-sky-500" size={20} />
                <h2 className="text-lg font-black text-white uppercase italic">
                  Transaction <span className="text-sky-500">Receipt</span>
                </h2>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="p-2 hover:bg-white/10 rounded-full text-gray-500 transition-colors"
              >
                <HiXMark size={24} />
              </button>
            </div>

            <div className="flex-grow space-y-8">
              <div className="text-center py-12 rounded-[2rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5">
                <p className="text-gray-500 text-[10px] uppercase font-black tracking-[0.2em] mb-3">
                  Gross Settlement
                </p>
                <h3 className="text-5xl font-black text-white tracking-tighter">
                  <span className="text-gray-600 text-2xl mr-1">$</span>
                  {selectedTx.amount.toLocaleString()}
                </h3>
                <div
                  className={`mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black border ${getStatusStyle(selectedTx.status)}`}
                >
                  <div
                    className={`h-1.5 w-1.5 rounded-full animate-pulse ${selectedTx.status === "completed" ? "bg-emerald-500" : "bg-amber-500"}`}
                  />
                  {selectedTx.status}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-1">
                <DetailRow label="Transaction Type" value={selectedTx.type} />
                <DetailRow
                  label="Funding Method"
                  value={selectedTx.method || "System Protocol"}
                />
                <DetailRow
                  label="Execution Time"
                  value={new Date(selectedTx.createdAt).toLocaleString()}
                />
                <DetailRow
                  label="Internal Hash"
                  value={selectedTx._id}
                  isMono
                />
              </div>
            </div>

            <button className="w-full py-5 bg-[#2962ff] hover:bg-[#1e4bd8] text-white font-black rounded-2xl transition-all text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 active:scale-[0.98] mt-6">
              Download Official PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const DetailRow = ({ label, value, isMono }) => (
  <div className="flex flex-col py-4 border-b border-white/5 last:border-0">
    <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">
      {label}
    </span>
    <span
      className={`text-white text-sm font-bold uppercase truncate ${isMono ? "font-mono text-sky-400 text-xs" : ""}`}
    >
      {value}
    </span>
  </div>
);

const LoadingSkeleton = () => (
  <tr>
    <td colSpan="4" className="p-24 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-2 border-sky-500/20 border-t-sky-500 animate-spin" />
          <HiOutlineCreditCard
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sky-500"
            size={20}
          />
        </div>
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
          Syncing Blockchain Data...
        </p>
      </div>
    </td>
  </tr>
);

const EmptyState = () => (
  <tr>
    <td colSpan="4" className="p-24 text-center">
      <div className="max-w-xs mx-auto">
        <HiOutlineArrowsRightLeft
          size={48}
          className="mx-auto text-white/5 mb-6"
        />
        <h3 className="text-white font-black uppercase text-sm mb-2">
          No Transactions Detected
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed">
          Your ledger is currently empty. Start trading or fund your account to
          see your activity here.
        </p>
      </div>
    </td>
  </tr>
);

export default Transactions;
