import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  HiOutlineAcademicCap,
  HiOutlineCash,
  HiOutlineUserGroup,
  HiOutlineLightBulb,
} from "react-icons/hi";
import { GiMicroscope, GiGasStove, GiFertilizerBag } from "react-icons/gi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const Training = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    // Using Vite's environment variables
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY).then(
      () => {
        setLoading(false);
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      (error) => {
        setLoading(false);
        alert(
          "Submission failed. Please check your network or contact Abraham Ada on WhatsApp."
        );
        console.error("EmailJS Error:", error);
      }
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="bg-[#1B4332] py-20 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Become a Certified <br />
            <span className="text-[#FFD600]">Biotech Engineer</span>
          </h1>
          <p className="text-xl text-green-100 opacity-90 leading-relaxed font-light">
            Master the science of anaerobic digestion. Learn to build systems
            that turn waste into wealth. No prior engineering degree
            required—just a passion for innovation.
          </p>
        </div>
      </section>

      {/* 2. CURRICULUM SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase">
            Training Curriculum
          </h2>
          <p className="text-gray-500 mt-4 font-medium">
            Directed by Lead Researcher Abraham Ada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Microbial Science",
              desc: "Understanding microorganisms in the 24-hr cycle.",
              icon: <GiMicroscope />,
            },
            {
              title: "System Design",
              desc: "Building odorless, non-evacuating digesters.",
              icon: <HiOutlineLightBulb />,
            },
            {
              title: "Gas Harvesting",
              desc: "Safe trapping and piping of domestic biogas.",
              icon: <GiGasStove />,
            },
            {
              title: "Liquid Manure",
              desc: "Processing organic fertilizer for commercial use.",
              icon: <GiFertilizerBag />,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 rounded-4xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-xl transition-all group"
            >
              <div className="text-4xl text-[#1B4332] mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-black mb-3 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. APPLICATION FORM SECTION */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          {/* Left Panel */}
          <div className="lg:w-1/3 bg-[#FFD600] p-12 text-[#1B4332]">
            <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter">
              Enroll Now
            </h3>
            <div className="space-y-6 font-bold">
              <div className="flex items-center gap-4">
                <HiOutlineCash className="text-2xl" /> <p>Affordable Tuition</p>
              </div>
              <div className="flex items-center gap-4">
                <HiOutlineAcademicCap className="text-2xl" />{" "}
                <p>Hands-on Certificate</p>
              </div>
              <div className="flex items-center gap-4">
                <HiOutlineUserGroup className="text-2xl" />{" "}
                <p>Direct Mentorship</p>
              </div>
            </div>
            <div className="mt-12 p-6 bg-[#1B4332] rounded-2xl text-white">
              <p className="text-xs uppercase tracking-widest font-bold opacity-70 mb-2">
                Next Intake
              </p>
              <p className="text-xl font-black">Open for 2026</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-2/3 p-8 md:p-12">
            {submitted ? (
              <div className="text-center py-10">
                <IoCheckmarkCircleOutline className="text-7xl text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-black text-[#1B4332]">
                  Application Received!
                </h3>
                <p className="text-gray-500 mt-2 font-medium">
                  Abraham Ada will contact you via Email or WhatsApp shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-sm font-bold text-[#1B4332] underline"
                >
                  Send another application
                </button>
              </div>
            ) : (
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                {/* HIDDEN FIELD: Tells the template this is an Academy Enrollment */}
                <input
                  type="hidden"
                  name="service_type"
                  value="Academy Enrollment"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase mb-2">
                      Full Name
                    </label>
                    <input
                      name="name"
                      required
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#1B4332] outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase mb-2">
                      WhatsApp Number
                    </label>
                    <input
                      name="phone"
                      required
                      type="tel"
                      placeholder="+234..."
                      className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#1B4332] outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase mb-2">
                      Email Address
                    </label>
                    <input
                      name="email"
                      required
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#1B4332] outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase mb-2">
                      Your Location
                    </label>
                    <input
                      name="location"
                      required
                      type="text"
                      placeholder="City, State"
                      className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#1B4332] outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase mb-2">
                    Why do you want to join this Academy?
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    placeholder="Briefly describe your interest..."
                    className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#1B4332] outline-none transition"
                  ></textarea>
                </div>

                <button
                  disabled={loading}
                  className={`w-full py-5 rounded-xl font-black text-lg transition-all shadow-lg ${
                    loading
                      ? "bg-gray-400 cursor-wait"
                      : "bg-[#1B4332] text-[#FFD600] hover:scale-[1.02] active:scale-95"
                  }`}
                >
                  {loading ? "PROCESSING..." : "SUBMIT ENROLLMENT"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Training;
