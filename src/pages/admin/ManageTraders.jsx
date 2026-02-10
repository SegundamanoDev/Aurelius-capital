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
} from "react-icons/hi2";
import toast from "react-hot-toast";

const ManageTraders = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    winRate: "",
    roi: "",
    followers: 0,
    strategy: "Institutional",
  });

  // RTK Query Hooks
  const { data: traders = [], isLoading } = useGetTradersQuery();
  const [createTrader] = useCreateTraderMutation();
  const [updateTrader] = useUpdateTraderMutation();
  const [deleteTrader] = useDeleteTraderMutation();

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateTrader({ id: editingId, ...formData }).unwrap();
        toast.success("Strategist profiles updated.");
      } else {
        await createTrader(formData).unwrap();
        toast.success("New Master Strategist deployed.");
      }
      closeModal();
    } catch (err) {
      toast.error("Operation failed.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Remove this strategist from the terminal?")) {
      await deleteTrader(id);
      toast.error("Strategist decommissioned.");
    }
  };

  const openModal = (trader = null) => {
    if (trader) {
      setFormData(trader);
      setEditingId(trader._id);
    } else {
      setFormData({
        name: "",
        avatar: "",
        winRate: "",
        roi: "",
        followers: 0,
        strategy: "Institutional",
      });
      setEditingId(null);
    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black uppercase italic text-white">
          Manage Master <span className="text-sky-500">Strategists</span>
        </h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-sky-500 text-black px-6 py-3 rounded-xl font-black text-xs uppercase hover:bg-sky-400 transition-all"
        >
          <HiOutlinePlus size={18} /> Deploy New Strategist
        </button>
      </div>

      <div className="bg-[#05070A] border border-white/5 rounded-[2rem] overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.02] text-[10px] uppercase font-black text-gray-500 border-b border-white/5">
            <tr>
              <th className="p-5">Name</th>
              <th className="p-5">ROI / WinRate</th>
              <th className="p-5">Followers</th>
              <th className="p-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {traders.map((trader) => (
              <tr
                key={trader._id}
                className="hover:bg-white/[0.01] transition-colors"
              >
                <td className="p-5 font-bold text-white uppercase italic">
                  {trader.name}
                </td>
                <td className="p-5 text-emerald-500 font-mono text-xs">
                  {trader.roi} / {trader.winRate}
                </td>
                <td className="p-5 text-gray-400">{trader.followers}</td>
                <td className="p-5 text-right space-x-2">
                  <button
                    onClick={() => openModal(trader)}
                    className="p-2 text-gray-500 hover:text-sky-500 transition-colors"
                  >
                    <HiOutlinePencilSquare size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(trader._id)}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <HiOutlineTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL (Same as your UI, but with formData connected) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <form
            onSubmit={handleSave}
            className="bg-[#05070A] border border-white/10 w-full max-w-md rounded-[2.5rem] p-8 space-y-6 shadow-2xl"
          >
            <h2 className="text-xl font-black uppercase italic text-white">
              {editingId ? "Edit" : "Create"} Strategist
            </h2>
            <input
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none"
              placeholder="Avatar (e.g. BTC)"
              value={formData.avatar}
              onChange={(e) =>
                setFormData({ ...formData, avatar: e.target.value })
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none"
                placeholder="ROI (+120%)"
                value={formData.roi}
                onChange={(e) =>
                  setFormData({ ...formData, roi: e.target.value })
                }
              />
              <input
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none"
                placeholder="Win Rate (90%)"
                value={formData.winRate}
                onChange={(e) =>
                  setFormData({ ...formData, winRate: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-sky-500 text-black font-black uppercase rounded-xl"
            >
              Confirm Deployment
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="w-full py-2 text-gray-500 font-bold uppercase text-[10px]"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageTraders;
