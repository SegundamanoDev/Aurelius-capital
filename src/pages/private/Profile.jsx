import React, { useEffect, useState } from "react";
import {
  HiOutlineEnvelope,
  HiOutlineChartBar,
  HiOutlineIdentification,
  HiOutlineMapPin,
  HiOutlineBriefcase,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useGetTradersQuery,
} from "../../api/apiSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const {
    data: user,
    isLoading: profileLoading,
    refetch: refetchProfile,
  } = useGetMyProfileQuery();

  const { data: allTraders = [] } = useGetTradersQuery();
  const [updateProfile, { isLoading: isSaving }] = useUpdateMyProfileMutation();

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

  const normalizeId = (id) => (typeof id === "object" ? id?._id : id);

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
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData).unwrap();
      toast.success("Identity dossiers updated");
      refetchProfile();
    } catch (err) {
      toast.error(err?.data?.message || "Protocol update failed");
    }
  };

  if (profileLoading)
    return (
      <div className="p-20 text-center text-gray-500 animate-pulse uppercase font-black tracking-widest">
        Decrypting Profile Data...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-10">
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
            User <span className="text-sky-500">Identity</span>
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full text-[10px] font-black text-sky-400 uppercase tracking-widest">
              {user?.accountType || "Basic"} Tier
            </span>
            <span className="text-gray-500 text-[10px] font-bold uppercase italic">
              UID: {user?._id?.slice(-8)}
            </span>
          </div>
        </div>

        <div className="flex">
          <FinancialChip
            label="Portfolio"
            value={`$${user?.balance?.toLocaleString()}`}
          />
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* LEFT: SETTINGS FORM */}
        <div className="lg:col-span-8 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* PERSONAL DATA */}
            <section className="bg-[#05070A] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
              <h2 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-8 flex items-center gap-3">
                <HiOutlineIdentification className="text-sky-500" size={20} />{" "}
                Personal Dossier
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <InputField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <InputField
                  label="Middle Name"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                />
                <InputField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />

                <SelectField
                  label="Sex"
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  options={["male", "female", "other"]}
                />
                <SelectField
                  label="Marital Status"
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  options={["single", "married", "divorced", "widowed"]}
                />
                <InputField
                  label="Occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                />
              </div>
            </section>

            {/* ADDRESS DATA */}
            <section className="bg-[#05070A] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
              <h2 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-8 flex items-center gap-3">
                <HiOutlineMapPin className="text-sky-500" size={20} /> Physical
                Location
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <InputField
                    label="Street Address"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                  />
                </div>
                <InputField
                  label="City"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                />
                <InputField
                  label="State / Province"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                />
                <InputField
                  label="Country"
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleChange}
                />
                <InputField
                  label="Zip Code"
                  name="address.zipCode"
                  value={formData.address.zipCode}
                  onChange={handleChange}
                />
              </div>
            </section>

            <button
              disabled={isSaving}
              className="w-full py-6 bg-sky-500 hover:bg-sky-400 text-black font-black uppercase rounded-2xl transition-all shadow-xl shadow-sky-500/10 text-sm tracking-widest active:scale-[0.98]"
            >
              {isSaving ? "Synchronizing..." : "Update Dossier"}
            </button>
          </form>
        </div>

        {/* RIGHT: PORTFOLIO SIDEBAR */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#05070A] border border-sky-500/20 rounded-[2.5rem] p-6 shadow-2xl sticky top-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-white font-black uppercase text-xs tracking-widest flex items-center gap-2">
                <HiOutlineChartBar className="text-sky-500" size={18} /> Managed
                Portfolio
              </h3>
              <span className="text-[10px] text-gray-500 font-bold uppercase">
                {user?.copiedTraders?.length || 0} ACTIVE
              </span>
            </div>

            {user?.copiedTraders?.length > 0 ? (
              <div className="space-y-4">
                {user.copiedTraders.map((copy) => {
                  const tId = normalizeId(copy.traderId);
                  const trader = allTraders.find(
                    (t) => t._id?.toString() === tId?.toString(),
                  );

                  return (
                    <div
                      key={tId}
                      className="bg-white/5 border border-white/5 p-5 rounded-2xl group hover:border-sky-500/30 transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-white font-black uppercase italic text-sm group-hover:text-sky-400 transition-colors">
                            {trader?.name || "Strategist"}
                          </p>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                            AUM: $
                            {trader?.performance?.assetsUnderManagement?.toLocaleString() ||
                              "N/A"}
                          </p>
                        </div>
                        <HiOutlineShieldCheck
                          className="text-sky-500"
                          size={18}
                        />
                      </div>

                      <div className="flex py-3 border-y border-white/5">
                        <StatSmall
                          label="ROI (30D)"
                          value={`${trader?.performance?.roi30d || 0}%`}
                          color="text-sky-400"
                        />
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                          <span className="text-[9px] text-emerald-500 font-black uppercase tracking-widest">
                            Mirroring Live
                          </span>
                        </span>
                        <span className="text-[9px] text-gray-600 font-bold">
                          {trader?.riskMetrics?.riskScore}/10 Risk
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-white/10 rounded-3xl">
                <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest mb-4">
                  No Active Signals
                </p>
                <a
                  href="/dashboard/copy-trading"
                  className="px-6 py-3 bg-white/5 text-white text-[10px] font-black uppercase rounded-xl hover:bg-sky-500 hover:text-black transition-all"
                >
                  Browse Traders
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- HELPER COMPONENTS --- */

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest ml-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:border-sky-500 outline-none transition-all placeholder:text-gray-700"
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest ml-2">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="bg-[#0A0C12] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:border-sky-500 outline-none transition-all appearance-none"
    >
      <option value="">Select Protocol</option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="uppercase">
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const StatSmall = ({ label, value, color = "text-white" }) => (
  <div>
    <p className="text-[8px] text-gray-600 uppercase font-black">{label}</p>
    <p className={`text-[11px] font-black uppercase tracking-tighter ${color}`}>
      {value}
    </p>
  </div>
);

const FinancialChip = ({ label, value, color = "text-emerald-500" }) => (
  <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl min-w-[120px]">
    <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest">
      {label}
    </p>
    <p className={`text-sm font-black ${color}`}>{value}</p>
  </div>
);

export default Profile;
