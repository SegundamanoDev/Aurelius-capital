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
    username: "",
    avatar: "",
    bio: "",
    verified: false,
    experienceYears: 0,
    location: "",

    performance: {
      roi30d: 0,
      roi90d: 0,
      roi1y: 0,
      totalRoi: 0,
      monthlyAverage: 0,
      totalProfit: 0,
      assetsUnderManagement: 0,
      winRate: 0,
      totalTrades: 0,
      winningTrades: 0,
      losingTrades: 0,
      avgWin: 0,
      avgLoss: 0,
      profitFactor: 0,
    },

    riskMetrics: {
      riskScore: 1,
      maxDrawdown: 0,
      sharpeRatio: 0,
      averageTradeDuration: "",
      maxConsecutiveLosses: 0,
      leverageUsed: "",
    },

    strategy: {
      style: "",
      markets: [],
      preferredAssets: [],
      timeframe: "",
      riskLevel: "",
    },

    social: {
      followers: 0,
      copiers: 0,
      rating: 0,
      reviewsCount: 0,
    },

    isActive: true,
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
        await updateTrader({
          id: editingId,
          data: formData,
        }).unwrap();
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
        ...initialForm,
        ...trader,
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
                      {trader.avatar?.length > 3 ? "IMG" : trader.avatar || "T"}
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
                    {trader.strategy?.style || "N/A"}
                  </span>
                </td>

                <td className="p-6">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500 font-black text-sm">
                      {trader.performance?.roi30d ?? 0}%
                    </span>
                    <span className="text-gray-600 text-[10px]">/</span>
                    <span className="text-sky-400 font-black text-sm">
                      {trader.performance?.winRate ?? 0}%
                    </span>
                  </div>
                  <p className="text-[9px] text-rose-400 font-bold uppercase mt-1">
                    DD: {trader.riskMetrics?.maxDrawdown ?? 0}%
                  </p>
                </td>

                <td className="p-6">
                  <div className="flex items-center gap-2 text-gray-400 font-bold">
                    <HiOutlineUsers />
                    {trader.social?.followers?.toLocaleString() ?? 0}
                  </div>
                </td>

                <td className="p-6">
                  {trader.isActive ? (
                    <span className="text-[8px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full border border-emerald-500/20 w-fit font-black uppercase tracking-tighter">
                      Active
                    </span>
                  ) : (
                    <span className="text-[8px] bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded-full border border-white/5 w-fit font-black uppercase tracking-tighter">
                      Inactive
                    </span>
                  )}
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
                  {trader.avatar?.length > 3 ? "IMG" : trader.avatar || "T"}
                </div>
                <div>
                  <h3 className="text-white font-black uppercase italic">
                    {trader.name}
                  </h3>
                  <p className="text-[10px] text-sky-500 font-black uppercase">
                    {trader.strategy?.style || "N/A"}
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
                  ROI 30D
                </p>
                <p className="text-xs font-black text-emerald-500">
                  {trader.performance?.roi30d ?? 0}%
                </p>
              </div>

              <div className="text-center border-x border-white/5">
                <p className="text-[8px] text-gray-500 uppercase font-black">
                  Win Rate
                </p>
                <p className="text-xs font-black text-white">
                  {trader.performance?.winRate ?? 0}%
                </p>
              </div>

              <div className="text-center">
                <p className="text-[8px] text-gray-500 uppercase font-black">
                  Followers
                </p>
                <p className="text-xs font-black text-gray-400">
                  {trader.social?.followers ?? 0}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <div className="inset-0 z-[200] bg-black/95 backdrop-blur-md flex justify-center overflow-y-auto ">
          <form
            onSubmit={handleSave}
            className="bg-[#0A0C10] border border-white/10 w-full max-w-4xl rounded-[2.5rem] p-6 md:p-10 mt-10 mb-10 shadow-2xl space-y-8 max-h-[95vh] overflow-y-auto"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center">
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

            {/* ===================== */}
            {/* 1️⃣ IDENTITY SECTION */}
            {/* ===================== */}
            <div className="space-y-4">
              <h3 className="section-title">Identity</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <InputGroup
                  label="Name"
                  value={formData.name}
                  onChange={(val) => setFormData({ ...formData, name: val })}
                />

                <InputGroup
                  label="Username"
                  value={formData.username}
                  onChange={(val) =>
                    setFormData({ ...formData, username: val })
                  }
                />

                <InputGroup
                  label="Avatar URL"
                  value={formData.avatar}
                  onChange={(val) => setFormData({ ...formData, avatar: val })}
                />

                <InputGroup
                  label="Location"
                  value={formData.location}
                  onChange={(val) =>
                    setFormData({ ...formData, location: val })
                  }
                />

                <InputGroup
                  label="Experience (Years)"
                  type="number"
                  value={formData.experienceYears}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      experienceYears: Number(val),
                    })
                  }
                />
              </div>

              <textarea
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white"
                placeholder="Trader Bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />

              <label className="flex items-center gap-3 text-xs text-gray-400 uppercase font-bold">
                <input
                  type="checkbox"
                  checked={formData.verified}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      verified: e.target.checked,
                    })
                  }
                />
                Verified Trader
              </label>
            </div>

            {/* ===================== */}
            {/* 2️⃣ PERFORMANCE */}
            {/* ===================== */}
            <div className="space-y-4">
              <h3 className="section-title">Performance Metrics</h3>

              <div className="grid md:grid-cols-3 gap-4">
                <InputGroup
                  label="30D ROI (%)"
                  type="number"
                  value={formData.performance.roi30d}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      performance: {
                        ...formData.performance,
                        roi30d: Number(val),
                      },
                    })
                  }
                />

                <InputGroup
                  label="90D ROI (%)"
                  type="number"
                  value={formData.performance.roi90d}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      performance: {
                        ...formData.performance,
                        roi90d: Number(val),
                      },
                    })
                  }
                />

                <InputGroup
                  label="Win Rate (%)"
                  type="number"
                  value={formData.performance.winRate}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      performance: {
                        ...formData.performance,
                        winRate: Number(val),
                      },
                    })
                  }
                />

                <InputGroup
                  label="Total Profit"
                  type="number"
                  value={formData.performance.totalProfit}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      performance: {
                        ...formData.performance,
                        totalProfit: Number(val),
                      },
                    })
                  }
                />

                <InputGroup
                  label="AUM"
                  type="number"
                  value={formData.performance.assetsUnderManagement}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      performance: {
                        ...formData.performance,
                        assetsUnderManagement: Number(val),
                      },
                    })
                  }
                />
              </div>
            </div>

            {/* ===================== */}
            {/* 3️⃣ RISK METRICS */}
            {/* ===================== */}
            <div className="space-y-4">
              <h3 className="section-title">Risk Metrics</h3>

              <div className="grid md:grid-cols-3 gap-4">
                <InputGroup
                  label="Risk Score"
                  type="number"
                  value={formData.riskMetrics.riskScore}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      riskMetrics: {
                        ...formData.riskMetrics,
                        riskScore: Number(val),
                      },
                    })
                  }
                />

                <InputGroup
                  label="Max Drawdown (%)"
                  type="number"
                  value={formData.riskMetrics.maxDrawdown}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      riskMetrics: {
                        ...formData.riskMetrics,
                        maxDrawdown: Number(val),
                      },
                    })
                  }
                />

                <InputGroup
                  label="Sharpe Ratio"
                  type="number"
                  value={formData.riskMetrics.sharpeRatio}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      riskMetrics: {
                        ...formData.riskMetrics,
                        sharpeRatio: Number(val),
                      },
                    })
                  }
                />
              </div>
            </div>

            {/* ===================== */}
            {/* 4️⃣ STRATEGY */}
            {/* ===================== */}
            <div className="space-y-4">
              <h3 className="section-title">Strategy</h3>

              <InputGroup
                label="Style"
                value={formData.strategy.style}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    strategy: {
                      ...formData.strategy,
                      style: val,
                    },
                  })
                }
              />

              <InputGroup
                label="Markets (comma separated)"
                value={formData.strategy.markets.join(",")}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    strategy: {
                      ...formData.strategy,
                      markets: val.split(","),
                    },
                  })
                }
              />
            </div>

            {/* ===================== */}
            {/* 5️⃣ SOCIAL */}
            {/* ===================== */}
            <div className="space-y-4">
              <h3 className="section-title">Social Metrics</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <InputGroup
                  label="Followers"
                  type="number"
                  value={formData.social.followers}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      social: {
                        ...formData.social,
                        followers: Number(val),
                      },
                    })
                  }
                />

                <InputGroup
                  label="Rating (0-5)"
                  type="number"
                  value={formData.social.rating}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      social: {
                        ...formData.social,
                        rating: Number(val),
                      },
                    })
                  }
                />
              </div>
            </div>

            {/* ACTIVE TOGGLE */}
            <label className="flex items-center gap-3 text-xs text-gray-400 uppercase font-bold">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isActive: e.target.checked,
                  })
                }
              />
              Active Strategist
            </label>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isCreating || isUpdating}
              className="w-full py-4 bg-sky-500 text-black font-black uppercase rounded-2xl shadow-lg shadow-sky-500/20 hover:bg-sky-400 transition-all"
            >
              {editingId
                ? "Update Strategist Profile"
                : "Deploy Master Strategist"}
            </button>
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
