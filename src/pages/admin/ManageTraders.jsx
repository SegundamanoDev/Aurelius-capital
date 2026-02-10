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
  HiOutlineChartBar,
  HiOutlineUsers,
  HiOutlineXMark,
} from "react-icons/hi2";
import toast from "react-hot-toast";

const ManageTraders = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Initial state matching all Mongoose schema fields
  const initialForm = {
    name: "",
    avatar: "",
    strategy: "Institutional",
    roi: "",
    winRate: "",
    followers: 0,
    maxDrawdown: "-0.0%",
    isPublic: true,
    isTrending: false,
  };

  const [formData, setFormData] = useState(initialForm);

  const { data: traders = [], isLoading } = useGetTradersQuery();
  const [createTrader, { isLoading: isCreating }] = useCreateTraderMutation();
  const [updateTrader, { isLoading: isUpdating }] = useUpdateTraderMutation();
  const [deleteTrader] = useDeleteTraderMutation();

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateTrader({ id: editingId, ...formData }).unwrap();
        toast.success("Strategist updated successfully.");
      } else {
        await createTrader(formData).unwrap();
        toast.success("New Master Strategist deployed.");
      }
      closeModal();
    } catch (err) {
      toast.error(err?.data?.message || "Operation failed.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanent Deletion: Are you sure?")) {
      try {
        await deleteTrader(id).unwrap();
        toast.error("Strategist removed.");
      } catch (err) {
        toast.error("Delete failed.");
      }
    }
  };

  const openModal = (trader = null) => {
    if (trader) {
      setFormData({
        name: trader.name,
        avatar: trader.avatar,
        strategy: trader.strategy,
        roi: trader.roi,
        winRate: trader.winRate,
        followers: trader.followers,
        maxDrawdown: trader.maxDrawdown,
        isPublic: trader.isPublic,
        isTrending: trader.isTrending,
      });
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
  };

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase italic text-white tracking-tighter">
            Master <span className="text-sky-500">Strategists</span>
          </h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">
            Terminal Inventory
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-sky-500 text-black px-6 py-4 rounded-2xl font-black text-xs uppercase hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/20 active:scale-95"
        >
          <HiOutlinePlus size={20} /> Deploy New Strategist
        </button>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden lg:block bg-[#05070A] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-white/[0.02] text-[10px] uppercase font-black text-gray-500 border-b border-white/5">
            <tr>
              <th className="p-6">Profile</th>
              <th className="p-6">Strategy</th>
              <th className="p-6">Performance (ROI/Win)</th>
              <th className="p-6">Followers</th>
              <th className="p-6">Status</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {traders.map((trader) => (
              <tr
                key={trader._id}
                className="hover:bg-white/[0.01] transition-colors group"
              >
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-sky-500/10 rounded-full flex items-center justify-center text-sky-500 font-black border border-sky-500/20">
                      {trader.avatar.length > 3 ? "IMG" : trader.avatar}
                    </div>
                    <div>
                      <p className="font-black text-white uppercase italic">
                        {trader.name}
                      </p>
                      <p className="text-[10px] text-gray-500 font-mono">
                        ID: {trader._id.slice(-6)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <span className="text-xs bg-white/5 px-3 py-1 rounded-lg text-gray-300 font-bold border border-white/5 uppercase">
                    {trader.strategy}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500 font-black text-sm">
                      {trader.roi}
                    </span>
                    <span className="text-gray-600 text-[10px]">/</span>
                    <span className="text-sky-400 font-black text-sm">
                      {trader.winRate}
                    </span>
                  </div>
                  <p className="text-[9px] text-rose-400 font-bold uppercase mt-1">
                    DD: {trader.maxDrawdown}
                  </p>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2 text-gray-400 font-bold">
                    <HiOutlineUsers /> {trader.followers.toLocaleString()}
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex flex-col gap-1">
                    {trader.isTrending && (
                      <span className="text-[8px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full border border-amber-500/20 w-fit font-black uppercase tracking-tighter">
                        Trending
                      </span>
                    )}
                    {trader.isPublic ? (
                      <span className="text-[8px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full border border-emerald-500/20 w-fit font-black uppercase tracking-tighter">
                        Live
                      </span>
                    ) : (
                      <span className="text-[8px] bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded-full border border-white/5 w-fit font-black uppercase tracking-tighter">
                        Hidden
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-6 text-right space-x-1">
                  <button
                    onClick={() => openModal(trader)}
                    className="p-3 text-gray-500 hover:text-sky-500 transition-all hover:bg-sky-500/5 rounded-xl"
                  >
                    <HiOutlinePencilSquare size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(trader._id)}
                    className="p-3 text-gray-500 hover:text-red-500 transition-all hover:bg-red-500/5 rounded-xl"
                  >
                    <HiOutlineTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="lg:hidden space-y-4">
        {traders.map((trader) => (
          <div
            key={trader._id}
            className="bg-[#05070A] border border-white/5 rounded-3xl p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="h-12 w-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-500 font-black border border-sky-500/20">
                  {trader.avatar}
                </div>
                <div>
                  <h3 className="text-white font-black uppercase italic">
                    {trader.name}
                  </h3>
                  <p className="text-[10px] text-sky-500 font-black uppercase">
                    {trader.strategy}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(trader)}
                  className="p-2 bg-white/5 rounded-lg text-gray-400"
                >
                  <HiOutlinePencilSquare size={18} />
                </button>
                <button
                  onClick={() => handleDelete(trader._id)}
                  className="p-2 bg-white/5 rounded-lg text-rose-500"
                >
                  <HiOutlineTrash size={18} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/5">
              <div className="text-center">
                <p className="text-[8px] text-gray-500 uppercase font-black">
                  ROI
                </p>
                <p className="text-xs font-black text-emerald-500">
                  {trader.roi}
                </p>
              </div>
              <div className="text-center border-x border-white/5">
                <p className="text-[8px] text-gray-500 uppercase font-black">
                  Win Rate
                </p>
                <p className="text-xs font-black text-white">
                  {trader.winRate}
                </p>
              </div>
              <div className="text-center">
                <p className="text-[8px] text-gray-500 uppercase font-black">
                  Followers
                </p>
                <p className="text-xs font-black text-gray-400">
                  {trader.followers}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md overflow-y-auto">
          <form
            onSubmit={handleSave}
            className="bg-[#0A0C10] border border-white/10 w-full max-w-2xl rounded-[2.5rem] p-6 md:p-10 my-auto shadow-2xl space-y-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-black uppercase italic text-white">
                {editingId ? "Modify" : "Deploy"}{" "}
                <span className="text-sky-500">Strategist</span>
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-500 hover:text-white"
              >
                <HiOutlineXMark size={24} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Profile Details */}
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
                  Identity & Strategy
                </p>
                <InputGroup
                  label="Name"
                  placeholder="E.g. Alpha Knight"
                  value={formData.name}
                  onChange={(val) => setFormData({ ...formData, name: val })}
                />
                <InputGroup
                  label="Avatar URL or Initials"
                  placeholder="E.g. BTC or https://..."
                  value={formData.avatar}
                  onChange={(val) => setFormData({ ...formData, avatar: val })}
                />
                <div className="space-y-1">
                  <label className="text-[9px] text-gray-500 uppercase font-black ml-1">
                    Strategy Type
                  </label>
                  <select
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-sky-500 transition-all appearance-none"
                    value={formData.strategy}
                    onChange={(e) =>
                      setFormData({ ...formData, strategy: e.target.value })
                    }
                  >
                    <option value="Institutional">Institutional</option>
                    <option value="Scalping">Scalping</option>
                    <option value="HFT">HFT (High Frequency)</option>
                    <option value="Swing">Swing Trading</option>
                  </select>
                </div>
              </div>

              {/* Performance & Metrics */}
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
                  Manual Performance Injection
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup
                    label="ROI (%)"
                    placeholder="+140.5%"
                    value={formData.roi}
                    onChange={(val) => setFormData({ ...formData, roi: val })}
                  />
                  <InputGroup
                    label="Win Rate"
                    placeholder="94%"
                    value={formData.winRate}
                    onChange={(val) =>
                      setFormData({ ...formData, winRate: val })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup
                    label="Followers"
                    type="number"
                    placeholder="1500"
                    value={formData.followers}
                    onChange={(val) =>
                      setFormData({
                        ...formData,
                        followers: parseInt(val) || 0,
                      })
                    }
                  />
                  <InputGroup
                    label="Max Drawdown"
                    placeholder="-2.4%"
                    value={formData.maxDrawdown}
                    onChange={(val) =>
                      setFormData({ ...formData, maxDrawdown: val })
                    }
                  />
                </div>

                {/* Toggles */}
                <div className="flex gap-4 pt-4">
                  <label className="flex-1 flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10 cursor-pointer">
                    <span className="text-[10px] font-black uppercase text-gray-400">
                      Public Live
                    </span>
                    <input
                      type="checkbox"
                      checked={formData.isPublic}
                      onChange={(e) =>
                        setFormData({ ...formData, isPublic: e.target.checked })
                      }
                      className="accent-sky-500"
                    />
                  </label>
                  <label className="flex-1 flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10 cursor-pointer">
                    <span className="text-[10px] font-black uppercase text-gray-400">
                      Trending
                    </span>
                    <input
                      type="checkbox"
                      checked={formData.isTrending}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isTrending: e.target.checked,
                        })
                      }
                      className="accent-amber-500"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button
                type="submit"
                disabled={isCreating || isUpdating}
                className="w-full py-4 bg-sky-500 text-black font-black uppercase rounded-2xl shadow-lg shadow-sky-500/20 hover:bg-sky-400 transition-all disabled:opacity-50"
              >
                {editingId
                  ? "Update Strategist Profile"
                  : "Deploy Master Strategist"}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="w-full py-2 text-gray-600 font-bold uppercase text-[10px] tracking-[0.2em]"
              >
                Abort Operation
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// Internal Helper Component
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
