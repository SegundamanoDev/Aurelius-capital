import React, { useState } from "react";
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
} from "react-icons/hi2";
import toast from "react-hot-toast";

const AdminUserList = () => {
  // 1. RTK Query Hooks (Replaces useSelector)
  const { data: allUsers = [], isLoading } = useGetAllUsersQuery();
  const [updateUser] = useUpdateUserAdminMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [topupAmount, setTopupAmount] = useState(0);
  const [injectProfit, { isLoading: isTopupLoading }] =
    useInjectProfitMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // 2. Form State (Mapped to your Model)
  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    balance: 0,
    totalProfits: 0,
    accountType: "",
  });

  // Filter Logic
  const filteredUsers = allUsers.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const handleInjectProfit = async () => {
    // Convert to number to ensure validation works
    if (Number(topupAmount) <= 0) return toast.error("Enter a valid amount");

    try {
      await injectProfit({
        userId: selectedUser._id,
        amount: Number(topupAmount),
        description: `+${topupAmount} Profit`,
      }).unwrap();

      toast.success("Profit successfully topped up!");
      setTopupAmount(0); // Reset the input
      setEditModalOpen(false);
    } catch (err) {
      toast.error(err.data?.message || "Failed to inject profit");
    }
  };
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setTopupAmount(0);
    setEditFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      balance: user.balance,
      totalProfits: user.totalProfits || 0,
      accountType: user.accountType || "demo",
    });
    setEditModalOpen(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ id: selectedUser._id, ...editFormData }).unwrap();
      toast.success(`Account for ${editFormData.firstName} updated.`);
      setEditModalOpen(false);
    } catch (err) {
      toast.error(err.data?.message || "Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Purge this user? This cannot be undone.")) {
      try {
        await deleteUser(id).unwrap();
        toast.success("User removed.");
      } catch (err) {
        toast.error("Deletion failed.");
      }
    }
  };

  if (isLoading)
    return (
      <div className="p-20 text-center text-white font-black uppercase italic animate-pulse">
        Accessing Encrypted Records...
      </div>
    );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">
          Investor Directory
        </h2>
        <div className="relative w-full md:w-96">
          <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search database..."
            className="w-full bg-[#05070A] border border-white/5 p-3 pl-12 rounded-xl text-sm outline-none focus:border-sky-500 transition-all text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-[#05070A] border border-white/5 rounded-[2rem] overflow-x-auto shadow-2xl">
        <table className="w-full text-left min-w-[700px]">
          <thead className="bg-white/[0.02] text-[10px] text-gray-500 uppercase font-black tracking-widest">
            <tr>
              <th className="p-6">Investor</th>
              <th className="p-6">Capital</th>
              <th className="p-6">Returns</th>
              <th className="p-6">Tier</th>
              <th className="p-6 text-right">Terminal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-white/[0.01] transition-colors group"
              >
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sky-500 text-xs shrink-0">
                      {user.firstName.charAt(0)}
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-bold text-white uppercase">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-[10px] text-gray-500 uppercase font-bold">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-6 font-mono text-white text-sm font-bold">
                  ${(user.balance || 0).toLocaleString()}
                </td>
                <td className="p-6 font-mono text-emerald-500 text-sm font-bold">
                  +{(user.totalProfits || 0).toLocaleString()}
                </td>
                <td className="p-6">
                  <span
                    className={`px-3 py-1 text-[10px] font-black rounded-full border ${
                      user.accountType === "vip"
                        ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        : "bg-sky-500/10 text-sky-400 border-sky-500/20"
                    }`}
                  >
                    {user.accountType || "basic"}
                  </span>
                </td>
                <td className="p-6 text-right space-x-2">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="p-2 text-gray-500 hover:text-sky-400 transition-colors"
                  >
                    <HiOutlineAdjustmentsHorizontal size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <HiOutlineTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT USER MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="bg-[#05070A] border border-white/10 w-full max-w-lg rounded-[2.5rem] shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="p-8 pb-0 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">
                  Override Account
                </h3>
                <p className="text-gray-500 text-[10px] uppercase font-bold mt-1">
                  Ref: {selectedUser?._id}
                </p>
              </div>
              <button
                onClick={() => setEditModalOpen(false)}
                className="p-2 bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors"
              >
                <HiOutlineXMark size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="p-8 pt-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    First Name
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-sm outline-none focus:border-sky-500"
                    value={editFormData.firstName}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    Last Name
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-sm outline-none focus:border-sky-500"
                    value={editFormData.lastName}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-sky-500 uppercase tracking-widest">
                    Capital ($)
                  </label>
                  <input
                    type="number"
                    className="w-full bg-sky-500/5 border border-sky-500/20 p-4 rounded-xl text-white font-mono outline-none focus:border-sky-500"
                    value={editFormData.balance}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        balance: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                    Profits ($)
                  </label>
                  <input
                    type="number"
                    className="w-full bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl text-white font-mono outline-none focus:border-emerald-500"
                    value={editFormData.totalProfits}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        totalProfits: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Account Tier
                </label>
                <select
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-sm outline-none focus:border-sky-500"
                  value={editFormData.accountType}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      accountType: e.target.value,
                    })
                  }
                >
                  <option value="demo">Demo Account</option>
                  <option value="basic">Basic Tier</option>
                  <option value="silver">Silver Tier</option>
                  <option value="gold">Gold Tier</option>
                  <option value="vip">VIP Institutional</option>
                </select>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest block mb-3">
                  Admin Profit Injection (Manual Top-up)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Amount to add as profit"
                    className="flex-1 bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl text-white text-sm outline-none focus:border-amber-500"
                    value={topupAmount}
                    onChange={(e) => setTopupAmount(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleInjectProfit}
                    disabled={isTopupLoading}
                    className="bg-amber-500 hover:bg-amber-400 text-black font-black uppercase text-[10px] px-6 rounded-xl transition-all disabled:opacity-50"
                  >
                    {isTopupLoading ? "Injecting..." : "Top-up Profit"}
                  </button>
                </div>
              </div>
              <div className="pt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="flex-1 py-4 text-gray-500 font-black uppercase text-[10px] tracking-widest hover:bg-white/5 rounded-2xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-2 py-4 px-8 bg-sky-500 text-black font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-sky-400 transition-all"
                >
                  Commit Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserList;
