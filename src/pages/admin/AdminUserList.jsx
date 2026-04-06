import React, { useState, useEffect } from "react";
import {
  useGetAllUsersQuery,
  useUpdateUserAdminMutation,
  useDeleteUserMutation,
  useInjectProfitMutation,
} from "../../api/apiSlice";
import {
  HiMagnifyingGlass,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineTrash,
  HiOutlineXMark,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import toast from "react-hot-toast";

const AdminUserList = () => {
  const { data: allUsers = [], isLoading } = useGetAllUsersQuery();
  const [updateUser] = useUpdateUserAdminMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [topupAmount, setTopupAmount] = useState("");
  const [injectProfit, { isLoading: isTopupLoading }] =
    useInjectProfitMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Prevent background scrolling when modal is active
  useEffect(() => {
    if (isEditModalOpen || isDeleteModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isEditModalOpen, isDeleteModalOpen]);

  const filteredUsers = allUsers.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleInjectProfit = async () => {
    if (Number(topupAmount) <= 0) return toast.error("Enter a valid amount");
    try {
      await injectProfit({
        userId: selectedUser._id,
        amount: Number(topupAmount),
        description: `+${topupAmount} Profit`,
      }).unwrap();

      toast.success(`$${topupAmount} successfully injected!`, {
        style: {
          borderRadius: "10px",
          background: "#05070A",
          color: "#fff",
          border: "1px solid #10b981",
        },
      });

      setTopupAmount("");
      setEditModalOpen(false);
    } catch (err) {
      toast.error(err.data?.message || "Failed to inject profit");
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setTopupAmount("");
    setEditModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(selectedUser._id).unwrap();
      toast.success("Investor purged from database.");
      setDeleteModalOpen(false);
    } catch (err) {
      toast.error("Deletion failed.");
    }
  };

  if (isLoading)
    return (
      <div className="p-20 text-center text-sky-600 dark:text-white font-black uppercase italic animate-pulse tracking-widest text-xs">
        Accessing Encrypted Records...
      </div>
    );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">
            Investor{" "}
            <span className="text-sky-600 dark:text-sky-500">Directory</span>
          </h2>
          <p className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest mt-1">
            Global User Management Terminal
          </p>
        </div>
        <div className="relative w-full md:w-96">
          <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search database..."
            className="w-full bg-white dark:bg-[#05070A] border border-slate-200 dark:border-white/5 p-3 pl-12 rounded-xl text-sm outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white shadow-sm dark:shadow-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-[#05070A] border border-slate-200 dark:border-white/5 rounded-[2rem] overflow-x-auto shadow-sm dark:shadow-2xl transition-colors">
        <table className="w-full text-left min-w-[700px]">
          <thead className="bg-slate-50/50 dark:bg-white/[0.02] text-[10px] text-slate-400 dark:text-gray-500 uppercase font-black tracking-widest">
            <tr>
              <th className="p-6">Investor</th>
              <th className="p-6">Capital</th>
              <th className="p-6">Returns</th>
              <th className="p-6">Tier</th>
              <th className="p-6 text-right">Terminal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-slate-50 dark:hover:bg-white/[0.01] transition-colors group"
              >
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center font-bold text-sky-600 dark:text-sky-500 text-xs shrink-0 uppercase">
                      {user?.firstName ? user.firstName.charAt(0) : "U"}
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-bold text-slate-900 dark:text-white uppercase">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-gray-500 uppercase font-bold">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-6 font-mono text-slate-900 dark:text-white text-sm font-bold">
                  ${(user?.wallet?.totalBalance || 0).toLocaleString()}
                </td>
                <td className="p-6 font-mono text-emerald-600 dark:text-emerald-500 text-sm font-bold">
                  +{(user.totalProfits || 0).toLocaleString()}
                </td>
                <td className="p-6">
                  <span
                    className={`px-3 py-1 text-[10px] font-black rounded-full border uppercase ${
                      user.accountType === "vip"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20"
                        : "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20"
                    }`}
                  >
                    {user.accountType || "basic"}
                  </span>
                </td>
                <td className="p-6 text-right space-x-2">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="p-2 text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    <HiOutlineAdjustmentsHorizontal size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(user)}
                    className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                  >
                    <HiOutlineTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* REFINED PROFIT INJECTION MODAL */}
      {isEditModalOpen && (
        <div className="fixed min-h-screen inset-0 z-[200] flex justify-center bg-slate-900/60 dark:bg-black/90 backdrop-blur-md transition-colors overflow-y-auto pt-20 pb-20 px-4">
          <div className="bg-white dark:bg-[#05070A] border border-slate-200 dark:border-white/10 w-full max-w-md rounded-[2.5rem] shadow-2xl relative animate-in zoom-in-95 duration-200 h-fit overflow-hidden">
            {/* Header */}
            <div className="p-8 pb-4 flex justify-between items-center bg-slate-50 dark:bg-white/[0.02] border-b border-slate-100 dark:border-white/5">
              <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                Add Profit To User
              </h3>
              <button
                onClick={() => setEditModalOpen(false)}
                className="p-2 bg-white dark:bg-white/5 rounded-full text-slate-400 hover:text-red-500 transition-colors shadow-sm"
              >
                <HiOutlineXMark size={20} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* User Info Display (Read Only) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    Investor Name
                  </p>
                  <div className="w-full bg-slate-100 dark:bg-white/5 p-3 rounded-xl text-slate-500 dark:text-gray-400 text-sm font-bold border border-transparent">
                    {selectedUser?.firstName} {selectedUser?.lastName}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-sky-600 uppercase tracking-widest">
                    Live Balance
                  </p>
                  <div className="w-full bg-sky-500/5 p-3 rounded-xl text-sky-600 dark:text-sky-400 text-sm font-mono font-bold border border-sky-500/10">
                    $
                    {(selectedUser?.wallet?.totalBalance || 0).toLocaleString()}
                  </div>
                </div>
              </div>

              <hr className="border-slate-100 dark:border-white/5" />

              {/* The Main Action: Top-Up */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-amber-600 dark:text-amber-500 uppercase tracking-[0.2em] block text-center">
                  Enter Credit Amount
                </label>

                <div className="">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    autoFocus
                    className="w-full bg-slate-50 dark:bg-white/[0.03] border-2 border-slate-200 dark:border-white/10 p-5 pl-10 rounded-2xl text-2xl text-slate-900 dark:text-white font-mono outline-none focus:border-amber-500 transition-all text-center"
                    value={topupAmount}
                    onChange={(e) => setTopupAmount(e.target.value)}
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleInjectProfit}
                disabled={isTopupLoading || !topupAmount || topupAmount <= 0}
                className="w-full py-5 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-200 dark:disabled:bg-white/5 text-white dark:text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-amber-500/20 disabled:shadow-none"
              >
                {isTopupLoading
                  ? "Processing Transaction..."
                  : "Confirm Profit Injection"}
              </button>

              <p className="text-[9px] text-center text-slate-400 uppercase font-medium">
                Funds will be added to total returns and balance instantly.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FAILSAFE DELETE MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[250] flex justify-center bg-slate-900/60 dark:bg-black/80 backdrop-blur-xl overflow-y-auto pt-20 pb-20 px-4">
          <div className="bg-white dark:bg-[#05070A] border border-red-500/20 w-full max-w-md rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-200 h-fit">
            <div className="p-8 text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-600 dark:text-red-500 mb-4">
                <HiOutlineExclamationTriangle size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                Purge Investor?
              </h3>
              <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">
                Deleting{" "}
                <span className="text-slate-900 dark:text-white font-bold">
                  {selectedUser?.firstName}
                </span>{" "}
                is irreversible.
              </p>
              <div className="pt-6 flex flex-col gap-3">
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="w-full py-4 bg-red-600 dark:bg-red-500 text-white font-black uppercase text-[11px] tracking-widest rounded-2xl"
                >
                  {isDeleting ? "Purging..." : "Confirm Final Purge"}
                </button>
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="w-full py-4 text-slate-400 dark:text-gray-500 font-black uppercase text-[10px] tracking-widest"
                >
                  Abort Action
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserList;
