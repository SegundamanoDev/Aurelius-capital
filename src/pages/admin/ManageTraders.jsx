import React, { useState, useRef } from "react";
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
  HiOutlineUserCircle,
  HiOutlineUsers,
  HiOutlineCloudArrowUp,
} from "react-icons/hi2";
import toast from "react-hot-toast";

const ManageTraders = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const initialForm = {
    user: "",
    username: "",
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
    followersCount: 0,
    totalCopiedCapital: 0,
    isActive: true,
  };

  const [formData, setFormData] = useState(initialForm);
  const { data: response, isLoading } = useGetTradersQuery();

  const traders = Array.isArray(response)
    ? response
    : response?.traders || response?.data || [];

  const [createTrader, { isLoading: isCreating }] = useCreateTraderMutation();
  const [updateTrader, { isLoading: isUpdating }] = useUpdateTraderMutation();
  const [deleteTrader] = useDeleteTraderMutation();

  const handleSave = async (e) => {
    e.preventDefault();

    // Use FormData for file upload support
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (selectedFile) {
      data.append("profileImage", selectedFile);
    }

    try {
      if (editingId) {
        await updateTrader({ id: editingId, data }).unwrap();
        toast.success("Trader profile updated.");
      } else {
        await createTrader(data).unwrap();
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
    setSelectedFile(null);
  };

  if (isLoading)
    return (
      <div className="p-20 text-center animate-pulse">
        Accessing Terminal...
      </div>
    );

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase italic text-slate-900 dark:text-white">
            Master <span className="text-sky-600">Strategists</span>
          </h1>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-sky-600 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase shadow-lg shadow-sky-500/20 hover:scale-[1.02] transition-transform"
        >
          <HiOutlinePlus size={20} /> Add New Trader
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-[#05070A] border border-slate-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1000px]">
            <thead className="bg-slate-50 dark:bg-white/[0.02] text-[10px] uppercase font-black text-slate-400 border-b border-slate-100 dark:border-white/5">
              <tr>
                <th className="p-6">Trader Profile</th>
                <th className="p-6">ROI / Win Rate</th>
                <th className="p-6">Social Proof</th>
                <th className="p-6">Assets</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {traders.map((trader) => (
                <tr
                  key={trader._id}
                  className="hover:bg-slate-50 dark:hover:bg-white/[0.01] transition-colors"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="relative group">
                        <img
                          src={
                            trader.profileImage ||
                            `https://ui-avatars.com/api/?name=${trader.username}`
                          }
                          className="h-12 w-12 rounded-2xl object-cover border-2 border-white dark:border-slate-800 shadow-md transform group-hover:scale-110 transition-transform"
                          alt="avatar"
                        />
                        {trader.verified && (
                          <div className="absolute -top-1 -right-1 bg-sky-500 text-white p-0.5 rounded-full border-2 border-white dark:border-slate-900" />
                        )}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
                          {trader.username}
                        </p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase">
                          {trader.tradingStyle}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="text-emerald-500 font-black text-sm">
                      {trader.totalROI}%
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">
                      {trader.winRate}% Win Rate
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-bold">
                      <HiOutlineUsers className="text-sky-500" />{" "}
                      {trader.followersCount?.toLocaleString()}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="text-slate-900 dark:text-white font-black">
                      ${trader.totalCopiedCapital?.toLocaleString()}
                    </div>
                    <div className="text-[9px] text-slate-400 font-bold uppercase">
                      Equity: ${trader.equity?.toLocaleString()}
                    </div>
                  </td>
                  <td className="p-6">
                    <span
                      className={`text-[8px] px-3 py-1 rounded-full border font-black uppercase ${trader.isActive ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5" : "text-red-500 border-red-500/20 bg-red-500/5"}`}
                    >
                      {trader.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <button
                      onClick={() => openModal(trader)}
                      className="p-2 hover:text-sky-500 transition-colors"
                    >
                      <HiOutlinePencilSquare size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(trader._id)}
                      className="p-2 hover:text-red-500 transition-colors"
                    >
                      <HiOutlineTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-md flex justify-center overflow-y-auto p-4 animate-in zoom-in-95 duration-200">
          <form
            onSubmit={handleSave}
            className="bg-white dark:bg-[#0A0C10] border border-slate-200 dark:border-white/10 w-full max-w-5xl rounded-[3rem] p-6 md:p-10 my-auto shadow-2xl space-y-10"
          >
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-white/5 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-sky-500/10 rounded-2xl text-sky-500">
                  <HiOutlineUserCircle size={24} />
                </div>
                <h2 className="text-xl font-black uppercase italic text-slate-900 dark:text-white leading-none">
                  {editingId ? "Update" : "Enroll"}{" "}
                  <span className="text-sky-600">Strategist</span>
                </h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <HiOutlineXMark size={28} />
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              {/* SECTION 1 */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-black text-sky-600 uppercase tracking-widest">
                  Identity Settings
                </h3>
                {!editingId && (
                  <InputGroup
                    label="Owner User ID"
                    value={formData.user}
                    onChange={(v) => setFormData({ ...formData, user: v })}
                    placeholder="Paste User ObjectID"
                  />
                )}
                <InputGroup
                  label="Display Username"
                  value={formData.username}
                  onChange={(v) => setFormData({ ...formData, username: v })}
                />

                <div className="space-y-2">
                  <label className="text-[9px] text-slate-400 uppercase font-black ml-1">
                    Profile Photo
                  </label>
                  <div
                    onClick={() => fileInputRef.current.click()}
                    className="cursor-pointer border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl p-6 hover:border-sky-500 transition-all bg-slate-50 dark:bg-white/5 text-center"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                    {selectedFile ? (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        className="h-20 w-20 rounded-2xl mx-auto object-cover"
                        alt="Preview"
                      />
                    ) : formData.profileImage ? (
                      <img
                        src={formData.profileImage}
                        className="h-20 w-20 rounded-2xl mx-auto object-cover"
                        alt="Current"
                      />
                    ) : (
                      <HiOutlineCloudArrowUp
                        size={30}
                        className="mx-auto text-slate-400 mb-2"
                      />
                    )}
                    <p className="text-[9px] font-black uppercase text-slate-500 mt-2">
                      Click to Upload Image
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-black ml-1">
                    Trading Style
                  </label>
                  <select
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-xl text-sm outline-none focus:border-sky-500"
                    value={formData.tradingStyle}
                    onChange={(e) =>
                      setFormData({ ...formData, tradingStyle: e.target.value })
                    }
                  >
                    <option value="Scalping">Scalping</option>
                    <option value="Day Trading">Day Trading</option>
                    <option value="Swing">Swing</option>
                    <option value="Position">Position</option>
                  </select>
                </div>
              </div>

              {/* SECTION 2 */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                  Market Performance
                </h3>
                <div className="grid grid-cols-2 gap-4">
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
                    label="Risk Score"
                    type="number"
                    value={formData.riskScore}
                    onChange={(v) =>
                      setFormData({ ...formData, riskScore: Number(v) })
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
                </div>
                <InputGroup
                  label="Total Trades"
                  type="number"
                  value={formData.totalTrades}
                  onChange={(v) =>
                    setFormData({ ...formData, totalTrades: Number(v) })
                  }
                />
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-black ml-1">
                    Strategist Bio
                  </label>
                  <textarea
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-xl text-sm h-24 outline-none focus:border-sky-500 resize-none"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* SECTION 3 */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-widest">
                  Financials & Social
                </h3>
                <InputGroup
                  label="Trader Equity ($)"
                  type="number"
                  value={formData.equity}
                  onChange={(v) =>
                    setFormData({ ...formData, equity: Number(v) })
                  }
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup
                    label="Followers"
                    type="number"
                    value={formData.followersCount}
                    onChange={(v) =>
                      setFormData({ ...formData, followersCount: Number(v) })
                    }
                  />
                  <InputGroup
                    label="Fee %"
                    type="number"
                    value={formData.performanceFeePercent}
                    onChange={(v) =>
                      setFormData({
                        ...formData,
                        performanceFeePercent: Number(v),
                      })
                    }
                  />
                </div>
                <InputGroup
                  label="Copied Capital ($)"
                  type="number"
                  value={formData.totalCopiedCapital}
                  onChange={(v) =>
                    setFormData({ ...formData, totalCopiedCapital: Number(v) })
                  }
                />

                <div className="bg-slate-50 dark:bg-white/[0.02] p-5 rounded-3xl border border-slate-100 dark:border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-slate-500">
                      Verified Badge
                    </span>
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-sky-500"
                      checked={formData.verified}
                      onChange={(e) =>
                        setFormData({ ...formData, verified: e.target.checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-slate-500">
                      Market Visibility
                    </span>
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-emerald-500"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isCreating || isUpdating}
              className="w-full py-5 bg-sky-600 text-white font-black uppercase rounded-2xl text-[11px] tracking-widest hover:bg-sky-500 transition-all shadow-xl shadow-sky-500/20"
            >
              {isCreating || isUpdating
                ? "Processing Data..."
                : editingId
                  ? "Save Updates"
                  : "Create Strategist Profile"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const InputGroup = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div className="space-y-1">
    <label className="text-[9px] text-slate-400 uppercase font-black ml-1">
      {label}
    </label>
    <input
      type={type}
      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-xl text-slate-900 dark:text-white text-sm outline-none focus:border-sky-500 transition-all font-medium"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default ManageTraders;
