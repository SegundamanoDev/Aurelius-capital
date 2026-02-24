import React, { useState } from "react";
import {
  useGetTradersQuery,
  useCreateTraderMutation,
  useUpdateTraderMutation,
  useDeleteTraderMutation,
} from "../../api/apiSlice";
import {
  HiOutlinePlus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineXMark,
} from "react-icons/hi2";
import toast from "react-hot-toast";

const ManageTraders = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    user: "",
    username: "",
    profileImage: "",
    bio: "",
    verified: false,
    totalROI: 0,
    winRate: 0,
    maxDrawdown: 0,
    riskScore: 5,
    equity: 0,
    totalTrades: 0,
    avgTradeDuration: 0,
    tradingStyle: "Day Trading",
    minCopyAmount: 100,
    performanceFeePercent: 20,
    isActive: true,
  };

  const [formData, setFormData] = useState(initialForm);

  // FIXED: Destructuring data and checking for nested arrays
  const { data: response, isLoading } = useGetTradersQuery();

  // This ensures 'traders' is always an array, regardless of backend structure
  const traders = Array.isArray(response)
    ? response
    : response?.traders || response?.data || [];

  const [createTrader, { isLoading: isCreating }] = useCreateTraderMutation();
  const [updateTrader, { isLoading: isUpdating }] = useUpdateTraderMutation();
  const [deleteTrader] = useDeleteTraderMutation();

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateTrader({ id: editingId, data: formData }).unwrap();
        toast.success("Trader profile updated.");
      } else {
        await createTrader(formData).unwrap();
        toast.success("New Trader profile created.");
      }
      closeModal();
    } catch (err) {
      toast.error(err?.data?.message || "Operation failed.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this trader?")) {
      try {
        await deleteTrader(id).unwrap();
        toast.success("Trader removed.");
      } catch (err) {
        toast.error("Delete failed.");
      }
    }
  };

  const openModal = (trader = null) => {
    if (trader) {
      setFormData({ ...initialForm, ...trader });
      setEditingId(trader._id);
    } else {
      setFormData(initialForm);
      setEditingId(null);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setFormData(initialForm);
  };

  if (isLoading)
    return (
      <div className="p-8 text-white font-black uppercase italic">
        Accessing Terminal...
      </div>
    );

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase italic text-white tracking-tighter">
            Master <span className="text-sky-500">Strategists</span>
          </h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">
            Database Management
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-sky-500 text-black px-6 py-4 rounded-2xl font-black text-xs uppercase hover:bg-sky-400 transition-all"
        >
          <HiOutlinePlus size={20} /> Add New Trader
        </button>
      </div>

      <div className="bg-[#05070A] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-white/[0.02] text-[10px] uppercase font-black text-gray-500 border-b border-white/5">
            <tr>
              <th className="p-6">Trader</th>
              <th className="p-6">ROI / Win Rate</th>
              <th className="p-6">Equity</th>
              <th className="p-6">Status</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {traders.length > 0 ? (
              traders.map((trader) => (
                <tr
                  key={trader._id}
                  className="hover:bg-white/[0.01] transition-colors"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-sky-500/10 rounded-full flex items-center justify-center text-sky-500 font-black border border-sky-500/20">
                        {trader.username?.charAt(0).toUpperCase() || "T"}
                      </div>
                      <p className="font-black text-white uppercase italic">
                        {trader.username}
                      </p>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-emerald-500 font-black">
                      {trader.totalROI}%
                    </span>
                    <span className="text-gray-500 text-[10px] ml-2">
                      ({trader.winRate}% WR)
                    </span>
                  </td>
                  <td className="p-6 text-white font-bold">
                    ${trader.equity?.toLocaleString()}
                  </td>
                  <td className="p-6">
                    <span
                      className={`text-[8px] px-2 py-0.5 rounded-full border font-black uppercase ${trader.isActive ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5" : "text-red-500 border-red-500/20 bg-red-500/5"}`}
                    >
                      {trader.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <button
                      onClick={() => openModal(trader)}
                      className="p-2 text-gray-500 hover:text-sky-500"
                    >
                      <HiOutlinePencilSquare size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(trader._id)}
                      className="p-2 text-gray-500 hover:text-red-500"
                    >
                      <HiOutlineTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="p-10 text-center text-gray-600 uppercase font-black text-xs italic"
                >
                  No Strategists found in database
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex justify-center overflow-y-auto p-4">
          <form
            onSubmit={handleSave}
            className="bg-[#0A0C10] border border-white/10 w-full max-w-4xl rounded-[2.5rem] p-6 md:p-10 my-auto shadow-2xl space-y-8"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black uppercase italic text-white">
                {editingId ? "Edit" : "Register"}{" "}
                <span className="text-sky-500">Trader</span>
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-500 hover:text-white"
              >
                <HiOutlineXMark size={24} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <InputGroup
                label="User ObjectId"
                value={formData.user}
                onChange={(v) => setFormData({ ...formData, user: v })}
                placeholder="Mongoose ID"
              />
              <InputGroup
                label="Username"
                value={formData.username}
                onChange={(v) => setFormData({ ...formData, username: v })}
              />
              <div className="space-y-1">
                <label className="text-[9px] text-gray-500 uppercase font-black ml-1">
                  Trading Style
                </label>
                <select
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-sky-500"
                  value={formData.tradingStyle}
                  onChange={(e) =>
                    setFormData({ ...formData, tradingStyle: e.target.value })
                  }
                >
                  <option value="Scalping">Scalping</option>
                  <option value="Day Trading">Day Trading</option>
                  <option value="Swing">Swing</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InputGroup
                label="Total ROI %"
                type="number"
                value={formData.totalROI}
                onChange={(v) =>
                  setFormData({ ...formData, totalROI: Number(v) })
                }
              />
              <InputGroup
                label="Win Rate %"
                type="number"
                value={formData.winRate}
                onChange={(v) =>
                  setFormData({ ...formData, winRate: Number(v) })
                }
              />
              <InputGroup
                label="Max DD %"
                type="number"
                value={formData.maxDrawdown}
                onChange={(v) =>
                  setFormData({ ...formData, maxDrawdown: Number(v) })
                }
              />
              <InputGroup
                label="Risk Score"
                type="number"
                value={formData.riskScore}
                onChange={(v) =>
                  setFormData({ ...formData, riskScore: Number(v) })
                }
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <InputGroup
                label="Equity ($)"
                type="number"
                value={formData.equity}
                onChange={(v) =>
                  setFormData({ ...formData, equity: Number(v) })
                }
              />
              <InputGroup
                label="Min Copy ($)"
                type="number"
                value={formData.minCopyAmount}
                onChange={(v) =>
                  setFormData({ ...formData, minCopyAmount: Number(v) })
                }
              />
              <InputGroup
                label="Fee %"
                type="number"
                value={formData.performanceFeePercent}
                onChange={(v) =>
                  setFormData({ ...formData, performanceFeePercent: Number(v) })
                }
              />
            </div>

            <textarea
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white h-24 outline-none focus:border-sky-500"
              placeholder="Bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            />

            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-xs text-gray-400 font-black uppercase cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.verified}
                  onChange={(e) =>
                    setFormData({ ...formData, verified: e.target.checked })
                  }
                />{" "}
                Verified
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-400 font-black uppercase cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                />{" "}
                Active
              </label>
            </div>

            <button
              type="submit"
              disabled={isCreating || isUpdating}
              className="w-full py-4 bg-sky-500 text-black font-black uppercase rounded-2xl hover:bg-sky-400 transition-all disabled:opacity-50"
            >
              {editingId ? "Update Profile" : "Create Trader Profile"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const InputGroup = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div className="space-y-1">
    <label className="text-[9px] text-gray-500 uppercase font-black ml-1">
      {label}
    </label>
    <input
      type={type}
      className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-sky-500 transition-all placeholder:text-gray-700"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default ManageTraders;
