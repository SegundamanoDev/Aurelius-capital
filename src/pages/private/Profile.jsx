import React, { useEffect, useState } from "react";
import { HiOutlineUser, HiOutlineEnvelope } from "react-icons/hi2";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "../../api/apiSlice";

const Profile = () => {
  const { data: user, isLoading } = useGetMyProfileQuery();
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

  // Populate form when user loads
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
      alert("Profile updated successfully");
    } catch (err) {
      alert(err?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) {
    return <p className="text-gray-400">Loading profile...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">
          Update your personal information
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#05070A] border border-white/5 rounded-3xl p-8 space-y-6"
      >
        {/* BASIC INFO */}
        <div className="grid md:grid-cols-3 gap-4">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="input"
          />
          <input
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            placeholder="Middle Name"
            className="input"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="input"
          />
        </div>

        {/* EMAIL (READ ONLY) */}
        <div>
          <label className="text-xs text-gray-500 uppercase flex items-center gap-2">
            <HiOutlineEnvelope /> Email
          </label>
          <input
            value={user.email}
            disabled
            className="input opacity-60 cursor-not-allowed"
          />
        </div>

        {/* PERSONAL */}
        <div className="grid md:grid-cols-3 gap-4">
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="input"
          >
            <option value="">Sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            className="input"
          >
            <option value="">Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>

          <input
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            placeholder="Occupation"
            className="input"
          />
        </div>

        {/* ADDRESS */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            placeholder="Street"
            className="input"
          />
          <input
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            placeholder="City"
            className="input"
          />
          <input
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
            placeholder="State"
            className="input"
          />
          <input
            name="address.country"
            value={formData.address.country}
            onChange={handleChange}
            placeholder="Country"
            className="input"
          />
          <input
            name="address.zipCode"
            value={formData.address.zipCode}
            onChange={handleChange}
            placeholder="Zip Code"
            className="input"
          />
        </div>

        <button
          disabled={isSaving}
          className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-black font-black uppercase rounded-2xl transition-all disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
