import React, { useState } from "react";
import {
  useGetAllTransactionsQuery,
  useUpdateTransactionStatusMutation,
} from "../../api/apiSlice";
import {
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowPath,
} from "react-icons/hi2";
import { getSymbol } from "../public/Register";
import toast from "react-hot-toast";

const AdminTransactions = () => {
  const {
    data: transactions = [],
    isLoading,
    refetch,
    isFetching,
  } = useGetAllTransactionsQuery();

  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateTransactionStatusMutation();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  console.log("Current transactions state:", transactions);
  const handleStatusChange = async (transactionId, newStatus) => {
    const promise = updateStatus({ transactionId, status: newStatus }).unwrap();

    toast.promise(
      promise,
      {
        loading: `Updating settlement to ${newStatus}...`,
        success: `Transaction marked as ${newStatus}`,
        error: (err) => err?.data?.message || "Internal protocol error",
      },
      {
        style: {
          background: "#05070A",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.1)",
          fontSize: "12px",
        },
      },
    );
  };

  const filteredData = transactions.filter((tx) => {
    const matchesFilter = filter === "all" || tx.status === filter;
    const searchStr = searchTerm.toLowerCase();
    const matchesSearch =
      tx.userId?.email?.toLowerCase().includes(searchStr) ||
      tx.userId?.firstName?.toLowerCase().includes(searchStr) ||
      tx.type?.toLowerCase().includes(searchStr);
    return matchesFilter && matchesSearch;
  });

  // Calculate quick stats for the header
  const pendingCount = transactions.filter(
    (t) => t.status === "pending",
  ).length;

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      case "pending":
        return "text-amber-500 bg-amber-500/10 border-amber-500/20";
      case "failed":
        return "text-rose-500 bg-rose-500/10 border-rose-500/20";
      default:
        return "text-gray-400 bg-gray-500/10 border-white/5";
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">
              Global <span className="text-sky-500">Settlements</span>
            </h1>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-1">
              Live Audit Stream • {transactions.length} total records
            </p>
          </div>
          {pendingCount > 0 && (
            <div className="px-3 py-1 bg-amber-500 text-black text-[10px] font-black rounded-full animate-pulse">
              {pendingCount} PENDING
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => refetch()}
            className={`p-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-all ${isFetching && "animate-spin"}`}
          >
            <HiOutlineArrowPath size={20} />
          </button>
          <div className="relative group">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-sky-500 transition-colors" />
            <input
              type="text"
              placeholder="Search User or Type..."
              className="bg-[#0A0C10] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-sky-500/50 w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="bg-[#0A0C10] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none cursor-pointer"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Filter: All Status</option>
            <option value="pending">Status: Pending</option>
            <option value="completed">Status: Completed</option>
            <option value="failed">Status: Failed</option>
          </select>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-40 bg-white/5 animate-pulse rounded-[2rem]"
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] border-b border-white/5">
                <th className="p-6">Investor Profile</th>
                <th className="p-6">Allocation Type</th>
                <th className="p-6">Settlement Vol.</th>
                <th className="p-6">Network Status</th>
                <th className="p-6 text-right">Master Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {filteredData.map((tx) => (
                <tr
                  key={tx._id}
                  className="hover:bg-white/[0.01] transition-colors group"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-600/5 flex items-center justify-center text-sky-500 border border-sky-500/20">
                        <HiOutlineUser size={22} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-white uppercase italic">
                          {tx.userId?.firstName} {tx.userId?.lastName}
                        </p>
                        <p className="text-[10px] text-gray-500 font-mono tracking-tighter">
                          {tx.userId?.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="inline-block px-2 py-1 rounded bg-white/5 text-[9px] font-black text-sky-400 uppercase mb-1">
                      {tx.type.replace("_", " ")}
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium">
                      {new Date(tx.createdAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </td>
                  <td className="p-6">
                    <p className="text-base font-black text-white font-mono tracking-tighter">
                      {getSymbol(tx.userId?.currency)}
                      {tx.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-[9px] text-gray-600 font-bold uppercase">
                      {tx.userId?.currency || "USD"} Base Asset
                    </p>
                  </td>
                  <td className="p-6">
                    <span
                      className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase border ${getStatusStyle(tx.status)}`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex justify-end gap-2">
                      {tx.status === "pending" ? (
                        <>
                          <button
                            onClick={() =>
                              handleStatusChange(tx._id, "completed")
                            }
                            disabled={isUpdating}
                            className="h-10 w-10 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-black transition-all flex items-center justify-center border border-emerald-500/20"
                            title="Confirm Settlement"
                          >
                            <HiOutlineCheckCircle size={20} />
                          </button>
                          <button
                            onClick={() => handleStatusChange(tx._id, "failed")}
                            disabled={isUpdating}
                            className="h-10 w-10 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center border border-rose-500/20"
                            title="Void Transaction"
                          >
                            <HiOutlineXCircle size={20} />
                          </button>
                        </>
                      ) : (
                        <p className="text-[9px] text-gray-600 font-black uppercase italic">
                          Archived
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <div className="text-center py-32 bg-white/[0.01]">
              <HiOutlineClock
                className="mx-auto text-gray-800 mb-4"
                size={64}
              />
              <p className="text-gray-600 font-black uppercase tracking-[0.4em] text-[10px]">
                No Transactions Synchronized
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminTransactions;
