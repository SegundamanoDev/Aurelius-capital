import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
// Import professional icons
import {
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineClipboardCheck,
} from "react-icons/hi";
import { FaWhatsapp, FaRegClock, FaGlobeAfrica } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const sendInquiry = (e) => {
    e.preventDefault();
    setLoading(true);

    // Replace with your actual EmailJS keys or environment variables
    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        form.current,
        "YOUR_PUBLIC_KEY"
      )
      .then(
        () => {
          setLoading(false);
          setSent(true);
        },
        () => {
          setLoading(false);
          alert("Submission failed. Please try again or contact via WhatsApp.");
        }
      );
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 1. PREMIUM MATURE HEADER */}
      <div className="bg-[#1B4332] py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
            Professional <span className="text-[#FFD600]">Consultation</span>
          </h1>
          <div className="h-1.5 w-24 bg-[#FFD600] mx-auto mb-8"></div>

          <div className="space-y-6 text-green-50 text-lg md:text-xl leading-relaxed font-light">
            <p>
              Engineering a sustainable waste-to-energy system requires
              precision, environmental assessment, and a deep understanding of
              anaerobic biology.
            </p>
            <p className="font-medium text-white">
              At Abrada-Biotech, we don't just "install tanks"—we design
              lifelong assets for your property.
            </p>
            <p className="text-base text-green-200/80 italic">
              Whether you are a homeowner looking to eliminate soak-away odors
              or a developer planning a large-scale estate, we provide the
              technical expertise to ensure your site is self-sustaining and
              compliant.
            </p>
          </div>
        </div>
      </div>

      {/* 2. THE THREE-STEP CONSULTATION PROCESS */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 mb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Site Survey",
              desc: "Physical assessment of soil texture, groundwater levels, and waste volume.",
              icon: <HiOutlineLocationMarker />,
            },
            {
              title: "System Design",
              desc: "Engineering a custom anaerobic digester tailored to your specific architectural needs.",
              icon: <HiOutlineClipboardCheck />,
            },
            {
              title: "Final Execution",
              desc: "Installation, gas harvesting setup, and rigorous safety verification protocol.",
              icon: <FaGlobeAfrica />,
            },
          ].map((step, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center flex flex-col items-center hover:border-[#FFD600] transition-colors group"
            >
              <div className="text-3xl text-[#1B4332] mb-4 bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-[#FFD600] transition-colors">
                {step.icon}
              </div>
              <h4 className="font-black text-[#1B4332] mb-2 uppercase tracking-wide">
                {step.title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. MAIN CONTACT GRID */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* LEFT: OFFICE DETAILS */}
        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-black text-[#1B4332] mb-8 uppercase tracking-tight flex items-center gap-3">
              Contact Information
            </h3>
            <div className="space-y-8">
              <div className="flex items-start group">
                <div className="bg-green-50 p-4 rounded-2xl mr-4 text-2xl text-[#1B4332] group-hover:bg-[#FFD600] transition-colors">
                  <HiOutlineLocationMarker />
                </div>
                <div>
                  <p className="font-black text-gray-900">Headquarters</p>
                  <p className="text-gray-600">
                    20, Ogie Street, Off Akure Road, <br /> Benin City, Edo
                    State, Nigeria.
                  </p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="bg-green-50 p-4 rounded-2xl mr-4 text-2xl text-[#1B4332] group-hover:bg-[#FFD600] transition-colors">
                  <HiOutlinePhone />
                </div>
                <div>
                  <p className="font-black text-gray-900">Phone Lines</p>
                  <p className="text-gray-600 font-bold tracking-wide">
                    08053311594 • 08135700782
                  </p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="bg-green-50 p-4 rounded-2xl mr-4 text-2xl text-[#1B4332] group-hover:bg-[#FFD600] transition-colors">
                  <HiOutlineMail />
                </div>
                <div>
                  <p className="font-black text-gray-900">Email Address</p>
                  <p className="text-gray-600">
                    abradabiotechengineering@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BUSINESS HOURS BOX */}
          <div className="bg-[#1B4332] p-8 rounded-4xl text-white relative overflow-hidden shadow-xl">
            <FaGlobeAfrica className="absolute -right-4 -bottom-4 text-white/5 text-9xl" />
            <div className="flex items-center gap-3 mb-4">
              <FaRegClock className="text-[#FFD600] text-xl" />
              <h4 className="font-bold text-[#FFD600] uppercase text-xs tracking-widest">
                Operation Hours
              </h4>
            </div>
            <p className="text-xl font-bold">Mon — Sat: 8AM - 6PM</p>
            <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-4 text-sm font-medium">
              <span className="bg-green-400 w-2 h-2 rounded-full animate-ping"></span>
              Available for site visits nationwide
            </div>
          </div>
        </div>

        {/* RIGHT: INQUIRY FORM */}
        <div
          id="survey-form"
          className="bg-white shadow-2xl rounded-[2.5rem] p-8 md:p-12 border border-gray-100 relative"
        >
          {sent ? (
            <div className="text-center py-20 animate-fade-in">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 text-4xl">
                <IoSendSharp />
              </div>
              <h3 className="text-2xl font-black text-[#1B4332]">
                Inquiry Logged
              </h3>
              <p className="text-gray-500 mt-2 font-medium">
                Abraham Ada will review your project details and reach out
                within 24 hours.
              </p>
            </div>
          ) : (
            <form ref={form} onSubmit={sendInquiry} className="space-y-6">
              <h3 className="text-2xl font-black text-gray-900 mb-8 underline decoration-[#FFD600] decoration-4 underline-offset-8">
                Request Assessment
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400 ml-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    placeholder="John Doe"
                    required
                    className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#1B4332] border border-transparent focus:bg-white transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400 ml-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="user_phone"
                    placeholder="+234..."
                    required
                    className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#1B4332] border border-transparent focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400 ml-2">
                  Service Type
                </label>
                <select
                  name="service_type"
                  className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#1B4332] text-gray-600 border border-transparent focus:bg-white transition appearance-none"
                >
                  <option>Home Bio-Digester System</option>
                  <option>Industrial/Hotel Waste Plant</option>
                  <option>Generator Gas Conversion</option>
                  <option>Academy Enrollment</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400 ml-2">
                  Project Description
                </label>
                <textarea
                  name="message"
                  placeholder="Tell us about your project location or waste management needs..."
                  rows="4"
                  required
                  className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#1B4332] border border-transparent focus:bg-white transition"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1B4332] text-[#FFD600] py-5 rounded-2xl font-black text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                {loading ? (
                  "PROCESSING..."
                ) : (
                  <>
                    REQUEST TECHNICAL ASSESSMENT <IoSendSharp />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
