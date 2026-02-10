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
  HiOutlineFunnel,
} from "react-icons/hi2";
import toast from "react-hot-toast";

const AdminTransactions = () => {
  const {
    data: transactions = [],
    isLoading,
    refetch,
  } = useGetAllTransactionsQuery();
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateTransactionStatusMutation();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Logic for approving/declining
  const handleStatusChange = async (transactionId, newStatus) => {
    try {
      await updateStatus({ transactionId, status: newStatus }).unwrap();
      toast.success(`Transaction ${newStatus} successfully`, {
        style: {
          background: "#05070A",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.1)",
        },
      });
    } catch (err) {
      toast.error(err?.data?.message || "Action failed");
    }
  };

  const filteredData = transactions.filter((tx) => {
    const matchesFilter = filter === "all" || tx.status === filter;
    const matchesSearch =
      tx.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.type?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
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
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white uppercase italic tracking-tight">
            Global <span className="text-sky-500">Settlements</span>
          </h1>
          <p className="text-gray-500 text-xs font-medium">
            Manage and audit all system-wide financial flows.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative group">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-sky-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by email..."
              className="bg-[#0A0C10] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-sky-500/50 w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Filter */}
          <select
            className="bg-[#0A0C10] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none cursor-pointer"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-32 bg-white/5 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      )}

      {/* Desktop Table View (Hidden on Mobile) */}
      <div className="hidden lg:block bg-[#05070A] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-white/[0.02] border-b border-white/5">
            <tr>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">
                Client / User
              </th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">
                Transaction Info
              </th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">
                Volume
              </th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">
                Status
              </th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.03]">
            {filteredData.map((tx) => (
              <tr
                key={tx._id}
                className="hover:bg-white/[0.01] transition-colors group"
              >
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500 border border-sky-500/20">
                      <HiOutlineUser size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white leading-none">
                        {tx.userId?.firstName} {tx.userId?.lastName}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1 font-mono">
                        {tx.userId?.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-5">
                  <p className="text-xs font-black text-gray-300 uppercase tracking-tight">
                    {tx.type.replace("_", " ")}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1">
                    {new Date(tx.createdAt).toLocaleString()}
                  </p>
                </td>
                <td className="p-5">
                  <span className="text-sm font-black text-white">
                    ${tx.amount.toLocaleString()}
                  </span>
                  <p className="text-[9px] text-gray-600 uppercase font-bold">
                    {tx.method || "System"}
                  </p>
                </td>
                <td className="p-5">
                  <span
                    className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${getStatusColor(tx.status)}`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="p-5 text-right">
                  {tx.status === "pending" && (
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleStatusChange(tx._id, "completed")}
                        className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition-all"
                        title="Approve"
                      >
                        <HiOutlineCheckCircle size={18} />
                      </button>
                      <button
                        onClick={() => handleStatusChange(tx._id, "failed")}
                        className="p-2 bg-rose-500/10 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all"
                        title="Decline"
                      >
                        <HiOutlineXCircle size={18} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (Hidden on Desktop) */}
      <div className="lg:hidden space-y-4">
        {filteredData.map((tx) => (
          <div
            key={tx._id}
            className="bg-[#0A0C10] border border-white/10 rounded-2xl p-5 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400">
                  <HiOutlineUser size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm leading-none">
                    {tx.userId?.firstName} {tx.userId?.lastName}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-mono mt-1">
                    {tx.userId?.email}
                  </p>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-md text-[8px] font-black uppercase border ${getStatusColor(tx.status)}`}
              >
                {tx.status}
              </span>
            </div>

            <div className="flex justify-between items-end border-t border-white/5 pt-4">
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
                  Amount & Type
                </p>
                <p className="text-lg font-black text-white">
                  ${tx.amount.toLocaleString()}
                </p>
                <p className="text-[10px] text-sky-500 font-bold uppercase">
                  {tx.type}
                </p>
              </div>

              {tx.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange(tx._id, "failed")}
                    className="px-4 py-2 bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase rounded-lg border border-rose-500/20"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => handleStatusChange(tx._id, "completed")}
                    className="px-4 py-2 bg-emerald-500 text-black text-[10px] font-black uppercase rounded-lg"
                  >
                    Approve
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && !isLoading && (
        <div className="text-center py-20 bg-white/[0.02] rounded-[2rem] border border-dashed border-white/10">
          <HiOutlineClock className="mx-auto text-gray-600 mb-4" size={48} />
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
            No matching transactions found
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminTransactions;
