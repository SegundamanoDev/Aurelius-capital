import React, { useEffect, useState } from "react";
import {
  HiOutlineEnvelope,
  HiOutlineChartBar,
  HiOutlineStop,
} from "react-icons/hi2";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useGetTradersQuery,
  useStopCopyingMutation,
} from "../../api/apiSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const { data: user, isLoading: profileLoading } = useGetMyProfileQuery();
  const { data: allTraders = [] } = useGetTradersQuery();
  const [updateProfile, { isLoading: isSaving }] = useUpdateMyProfileMutation();
  const [stopCopying, { isLoading: isStopping }] = useStopCopyingMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    sex: "",
    maritalStatus: "",
    occupation: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        middleName: user.middleName || "",
        lastName: user.lastName || "",
        sex: user.sex || "",
        maritalStatus: user.maritalStatus || "",
        occupation: user.occupation || "",
        address: {
          street: user.address?.street || "",
          city: user.address?.city || "",
          state: user.address?.state || "",
          country: user.address?.country || "",
          zipCode: user.address?.zipCode || "",
        },
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData).unwrap();
      toast.success("Profile synchronized successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  const handleStopMirroring = async (traderId) => {
    if (!window.confirm("Terminate this institutional connection?")) return;
    try {
      await stopCopying({ traderId }).unwrap();
      toast.success("Connection severed. Funds returned.");
    } catch (err) {
      toast.error("Termination failed.");
    }
  };

  if (profileLoading)
    return (
      <div className="p-10 text-gray-500 animate-pulse">
        Loading Terminal Data...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <header>
        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
          User <span className="text-sky-500">Identity</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest font-bold">
          Account Tier:{" "}
          <span className="text-sky-400">
            {user?.accountType || "Standard"}
          </span>
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT: FORM SECTION */}
        <div className="lg:col-span-2 space-y-8">
          <form
            onSubmit={handleSubmit}
            className="bg-[#05070A] border border-white/5 rounded-[2.5rem] p-8 space-y-6 shadow-2xl"
          >
            <h3 className="text-white font-black uppercase text-xs tracking-widest border-b border-white/5 pb-4 mb-6">
              Personal Dossier
            </h3>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-gray-600 font-black uppercase ml-2">
                  First Name
                </label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-gray-600 font-black uppercase ml-2">
                  Middle Name
                </label>
                <input
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-gray-600 font-black uppercase ml-2">
                  Last Name
                </label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-gray-600 font-black uppercase ml-2 flex items-center gap-1">
                <HiOutlineEnvelope /> Registered Email
              </label>
              <input
                value={user.email}
                disabled
                className="input-field opacity-40 cursor-not-allowed"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4 pt-4">
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
              <input
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="Occupation"
                className="input-field"
              />
            </div>

            <h3 className="text-white font-black uppercase text-xs tracking-widest border-b border-white/5 pb-4 mt-10 mb-6">
              Residential Verification
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                placeholder="Street"
                className="input-field"
              />
              <input
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                placeholder="City"
                className="input-field"
              />
              <input
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                placeholder="State"
                className="input-field"
              />
              <input
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                placeholder="Country"
                className="input-field"
              />
            </div>

            <button
              disabled={isSaving}
              className="w-full py-5 bg-sky-500 hover:bg-sky-400 text-black font-black uppercase rounded-2xl transition-all shadow-lg shadow-sky-500/20 mt-4"
            >
              {isSaving ? "Synchronizing..." : "Update Dossier"}
            </button>
          </form>
        </div>

        {/* RIGHT: FOLLOWED TRADERS SECTION */}
        <div className="space-y-6">
          <div className="bg-[#05070A] border border-sky-500/20 rounded-[2.5rem] p-6 shadow-2xl">
            <h3 className="text-white font-black uppercase text-xs tracking-widest flex items-center gap-2 mb-6">
              <HiOutlineChartBar className="text-sky-500" size={18} /> Managed
              Portfolio
            </h3>

            {user?.copiedTraders?.length > 0 ? (
              <div className="space-y-4">
                {user.copiedTraders.map((copy) => {
                  const traderDetails = allTraders.find(
                    (t) => t._id === copy.traderId,
                  );
                  return (
                    <div
                      key={copy.traderId}
                      className="bg-white/5 border border-white/5 p-4 rounded-2xl group hover:border-sky-500/30 transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-bold uppercase italic text-sm">
                            {traderDetails?.name || "Strategist"}
                          </p>
                          <p className="text-[10px] text-emerald-500 font-black mt-1 uppercase">
                            Allocated: ${copy.amountAllocated?.toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleStopMirroring(copy.traderId)}
                          className="p-2 text-gray-600 hover:text-rose-500 transition-colors"
                          title="Stop Mirroring"
                        >
                          <HiOutlineStop size={20} />
                        </button>
                      </div>
                      <div className="mt-3 flex justify-between items-center border-t border-white/5 pt-3">
                        <span className="text-[9px] text-gray-500 font-bold uppercase">
                          ROI:{" "}
                          <span className="text-sky-400">
                            {traderDetails?.roi || "0%"}
                          </span>
                        </span>
                        <span className="text-[9px] text-sky-500 font-black uppercase animate-pulse">
                          Mirroring Live
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest mb-4">
                  No Active Strategists
                </p>
                <a
                  href="/dashboard/copy-trading"
                  className="text-sky-500 text-xs font-bold hover:underline"
                >
                  Browse Master Traders →
                </a>
              </div>
            )}
          </div>

          {/* BALANCE OVERVIEW CARD */}
          <div className="bg-sky-500 p-6 rounded-[2rem] text-black">
            <p className="text-[10px] font-black uppercase opacity-60">
              Total Liquidity
            </p>
            <h2 className="text-3xl font-black italic tracking-tighter">
              ${user?.balance?.toLocaleString()}
            </h2>
            <div className="mt-4 pt-4 border-t border-black/10 flex justify-between">
              <div>
                <p className="text-[8px] font-black uppercase">Trading Pool</p>
                <p className="font-bold text-sm">
                  ${user?.tradingBalance?.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[8px] font-black uppercase">Active Yield</p>
                <p className="font-bold text-sm text-white">
                  ${user?.totalProfits?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
