import React, { useState } from "react";
import {
  HiOutlinePlus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineCheck,
} from "react-icons/hi2";
import toast from "react-hot-toast";

const ManageTraders = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Initial Mock Data
  const [traders, setTraders] = useState([
    {
      id: 1,
      name: "Alexander K.",
      winRate: "94%",
      roi: "+124.5%",
      followers: 1240,
      risk: "Low",
    },
    {
      id: 2,
      name: "Elena 'The Hawk'",
      winRate: "89%",
      roi: "+82.1%",
      followers: 850,
      risk: "Medium",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    winRate: "",
    roi: "",
    followers: "",
    risk: "Low",
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      setTraders(
        traders.map((t) =>
          t.id === editingId ? { ...formData, id: editingId } : t,
        ),
      );
      toast.success("Trader updated successfully");
    } else {
      setTraders([...traders, { ...formData, id: Date.now() }]);
      toast.success("New Master Trader created");
    }
    closeModal();
  };

  const openModal = (trader = null) => {
    if (trader) {
      setFormData(trader);
      setEditingId(trader.id);
    } else {
      setFormData({
        name: "",
        winRate: "",
        roi: "",
        followers: "",
        risk: "Low",
      });
      setEditingId(null);
    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black uppercase italic tracking-tighter">
            Manage Master Traders
          </h1>
          <p className="text-gray-500 text-xs">
            Configure the professionals users can copy.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-sky-500 text-black px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-sky-400 transition-all"
        >
          <HiOutlinePlus size={18} /> Add New Trader
        </button>
      </div>

      {/* TRADERS TABLE */}
      <div className="bg-[#05070A] border border-white/5 rounded-[2rem] overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.02] text-[10px] uppercase font-black text-gray-500 border-b border-white/5">
            <tr>
              <th className="p-5">Name</th>
              <th className="p-5">Win Rate</th>
              <th className="p-5">ROI</th>
              <th className="p-5">Followers</th>
              <th className="p-5">Risk</th>
              <th className="p-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {traders.map((trader) => (
              <tr
                key={trader.id}
                className="hover:bg-white/[0.01] transition-colors"
              >
                <td className="p-5 font-bold text-white">{trader.name}</td>
                <td className="p-5 text-sky-400 font-mono">{trader.winRate}</td>
                <td className="p-5 text-emerald-500 font-mono">{trader.roi}</td>
                <td className="p-5 text-gray-400">{trader.followers}</td>
                <td className="p-5">
                  <span
                    className={`text-[10px] font-black px-2 py-1 rounded uppercase ${
                      trader.risk === "Low"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : trader.risk === "Medium"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {trader.risk}
                  </span>
                </td>
                <td className="p-5 text-right space-x-2">
                  <button
                    onClick={() => openModal(trader)}
                    className="p-2 text-gray-500 hover:text-sky-500 transition-colors"
                  >
                    <HiOutlinePencilSquare size={20} />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                    <HiOutlineTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE/EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#05070A] border border-white/10 w-full max-w-md rounded-[2.5rem] p-8 space-y-6 shadow-2xl">
            <h2 className="text-xl font-black uppercase italic text-white">
              {editingId ? "Edit Trader Profile" : "Create Master Trader"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase">
                  Trader Name
                </label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-sky-500"
                  placeholder="e.g. Satoshi Master"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase">
                    Win Rate (%)
                  </label>
                  <input
                    required
                    value={formData.winRate}
                    onChange={(e) =>
                      setFormData({ ...formData, winRate: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-sky-500"
                    placeholder="98%"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase">
                    ROI (%)
                  </label>
                  <input
                    required
                    value={formData.roi}
                    onChange={(e) =>
                      setFormData({ ...formData, roi: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-sky-500"
                    placeholder="+150%"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase">
                  Risk Level
                </label>
                <select
                  value={formData.risk}
                  onChange={(e) =>
                    setFormData({ ...formData, risk: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-sky-500"
                >
                  <option value="Low">Low Risk</option>
                  <option value="Medium">Medium Risk</option>
                  <option value="High">High Risk</option>
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-4 text-gray-500 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-sky-500 text-black font-black uppercase rounded-xl shadow-lg shadow-sky-500/20"
                >
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTraders;
