import React, { useState } from "react";
import { useSelector } from "react-redux";
// Corrected
import {
  HiOutlineArrowsRightLeft,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXCircle,
  HiOutlineReceiptRefund,
  HiXMark,
} from "react-icons/hi2";

const Transactions = () => {
  const { transactions } = useSelector((state) => state.user);
  const [selectedTx, setSelectedTx] = useState(null);

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "pending":
      case "processing":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "failed":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-white/5";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Ledger History
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          A detailed record of all your financial movements and terminal
          activities.
        </p>
      </div>

      {/* Transactions Table */}
      <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">
                  Transaction
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">
                  Date
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">
                  Amount
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.length > 0 ? (
                transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    onClick={() => setSelectedTx(tx)}
                    className="hover:bg-white/3 transition-colors cursor-pointer group"
                  >
                    <td className="p-6 flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-sky-400 border border-white/5 group-hover:border-sky-500/30 transition-all">
                        <HiOutlineReceiptRefund size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white uppercase tracking-tight">
                          {tx.type}
                        </p>
                        <p className="text-[10px] text-gray-500">
                          ID: TX-{tx.id.toString().slice(-6)}
                        </p>
                      </div>
                    </td>
                    <td className="p-6 text-sm text-gray-400 font-medium">
                      {tx.date}
                    </td>
                    <td
                      className={`p-6 text-sm font-bold ${tx.amount > 0 ? "text-emerald-500" : "text-white"}`}
                    >
                      {tx.amount > 0 ? "+" : ""}
                      {tx.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="p-6">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getStatusStyle(tx.status)}`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-20 text-center">
                    <HiOutlineArrowsRightLeft
                      size={48}
                      className="mx-auto text-gray-700 mb-4"
                    />
                    <p className="text-gray-500 font-medium">
                      No ledger records found.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Slide-over Panel */}
      {selectedTx && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-110"
            onClick={() => setSelectedTx(null)}
          />
          <div className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#020408] border-l border-white/10 z-120 p-8 shadow-2xl animate-in slide-in-from-right duration-500">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-xl font-bold text-white">Receipt Details</h2>
              <button
                onClick={() => setSelectedTx(null)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500"
              >
                <HiXMark size={24} />
              </button>
            </div>

            <div className="space-y-8">
              <div className="text-center py-10 bg-white/2 border border-white/5 rounded-4xl">
                <p className="text-gray-500 text-xs uppercase font-black tracking-widest mb-2">
                  Total Amount
                </p>
                <h3 className="text-4xl font-black text-white">
                  ${Math.abs(selectedTx.amount).toLocaleString()}
                </h3>
                <span
                  className={`mt-4 inline-block px-4 py-1 rounded-full text-[10px] font-black border ${getStatusStyle(selectedTx.status)}`}
                >
                  {selectedTx.status}
                </span>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-gray-500 text-sm">
                    Transaction Type
                  </span>
                  <span className="text-white text-sm font-bold uppercase">
                    {selectedTx.type}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-gray-500 text-sm">Reference ID</span>
                  <span className="text-sky-400 text-sm font-mono uppercase">
                    AXN-{selectedTx.id}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-gray-500 text-sm">Timestamp</span>
                  <span className="text-white text-sm font-medium">
                    {selectedTx.date}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-gray-500 text-sm">Network Fee</span>
                  <span className="text-emerald-500 text-sm font-bold">
                    $0.00
                  </span>
                </div>
              </div>

              <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all text-sm uppercase tracking-widest">
                Download PDF Receipt
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Transactions;
