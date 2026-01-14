import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
// Professional Icons
import {
  HiOutlineAcademicCap,
  HiOutlineIdentification,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineHome,
} from "react-icons/hi";
import { IoSendSharp, IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";

const Training = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    // VITE Environment variables for security
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY).then(
      () => {
        setLoading(false);
        setSubmitted(true);
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      },
      (error) => {
        setLoading(false);
        alert(
          "Submission failed. Please check your internet or contact the Boss via WhatsApp."
        );
      }
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#1B4332] py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-[#FFD600] mb-4 uppercase tracking-tight">
          Engineering Academy
        </h1>
        <p className="text-white max-w-2xl mx-auto text-lg opacity-90">
          Professional Enrollment for Anaerobic Digestion & Biogas
          Certification.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Course Info */}
        <div className="space-y-8">
          <h2 className="text-3xl font-black text-[#1B4332] flex items-center gap-3">
            <HiOutlineAcademicCap className="text-[#FFD600]" /> Curriculum
            Overview
          </h2>
          <div className="space-y-4">
            {[
              "Biotech Micro-organism Cultivation",
              "Industrial & Domestic Digester Design",
              "Biogas Harvesting & Piping Systems",
              "Organic Liquid Manure Production",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center p-5 bg-gray-50 rounded-2xl border-l-4 border-[#1B4332]"
              >
                <IoCheckmarkCircleOutline className="text-[#1B4332] text-xl mr-3 shrink-0" />
                <p className="text-gray-700 font-bold">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enrollment Form */}
        <div className="bg-white shadow-2xl rounded-[2.5rem] p-8 md:p-10 border border-gray-100 lg:-mt-32 z-10 relative">
          {submitted ? (
            <div className="text-center py-20 animate-pulse">
              <IoCheckmarkCircleOutline className="text-7xl text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-black text-[#1B4332]">
                Form Submitted!
              </h3>
              <p className="text-gray-500 mt-2">
                Please proceed to payment below.
              </p>
            </div>
          ) : (
            <form ref={form} onSubmit={sendEmail} className="space-y-5">
              <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                Student Registration
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                    className="w-full pl-11 p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#1B4332] transition"
                  />
                </div>
                <div className="relative">
                  <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    className="w-full pl-11 p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#1B4332] transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <HiOutlineIdentification className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="nin_number"
                    placeholder="NIN (11 Digits)"
                    required
                    className="w-full pl-11 p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#1B4332] transition"
                  />
                </div>
                <div className="relative">
                  <HiOutlineCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    name="dob"
                    required
                    className="w-full pl-11 p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#1B4332] transition text-gray-500"
                  />
                </div>
              </div>

              <div className="relative">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full pl-11 p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#1B4332] transition"
                />
              </div>

              <div className="relative">
                <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="WhatsApp Number"
                  required
                  className="w-full pl-11 p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#1B4332] transition"
                />
              </div>

              <div className="relative">
                <HiOutlineAcademicCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="qualification"
                  placeholder="Highest Qualification (e.g. B.Sc, SSCE)"
                  required
                  className="w-full pl-11 p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#1B4332] transition"
                />
              </div>

              <div className="relative">
                <HiOutlineHome className="absolute left-4 top-4 text-gray-400" />
                <textarea
                  name="address"
                  placeholder="Residential Address"
                  rows="3"
                  required
                  className="w-full pl-11 p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#1B4332] transition"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1B4332] text-[#FFD600] py-5 rounded-2xl font-black text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3"
              >
                {loading ? (
                  "PROCESSING..."
                ) : (
                  <>
                    SUBMIT ENROLLMENT <IoSendSharp />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Payment Section */}
      <section className="bg-gray-950 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[#FFD600] text-3xl font-black mb-12 uppercase">
            Payment Details
          </h2>
          <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
              <div>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">
                  Bank Name
                </p>
                <p className="text-xl font-bold">ACCESS BANK</p>
              </div>
              <div>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">
                  Account Number
                </p>
                <p className="text-3xl font-black text-[#FFD600] font-mono tracking-tighter">
                  0123456789
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">
                  Account Name
                </p>
                <p className="text-xl font-bold">ABRAHAM ADA</p>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <a
                href="https://wa.me/2348053311594"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition shadow-lg"
              >
                SEND PAYMENT SLIP <FaWhatsapp className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Training;
