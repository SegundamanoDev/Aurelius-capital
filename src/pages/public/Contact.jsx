import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { HiOutlineGlobeAlt, HiOutlineShieldCheck } from "react-icons/hi2";
import { toast, Toaster } from "react-hot-toast";
import { HiOutlineMailOpen } from "react-icons/hi";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          toast.success("Message transmitted successfully to the desk.");
          form.current.reset();
          setLoading(false);
        },
        (error) => {
          toast.error("Transmission failed. Please use the live chat.");
          console.error(error.text);
          setLoading(false);
        },
      );
  };

  return (
    <section className="py-24 bg-white dark:bg-[#0a0c10] transition-colors duration-300">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Institutional Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-sky-600 text-xs font-bold tracking-[0.3em] uppercase mb-3">
                Support Infrastructure
              </h2>
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white uppercase italic">
                Contact the{" "}
                <span className="text-sky-600 text-not-italic">Desk</span>
              </h3>
              <p className="mt-6 text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
                Direct access to our compliance and technical specialists.
                Professional inquiries are processed within one business hour.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-4 group">
                <div className="p-3 rounded-lg bg-gray-100 dark:bg-white/5 text-sky-600">
                  <HiOutlineMailOpen size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Official Inquiry
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium italic">
                    support@aurelius-terminal.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-gray-100 dark:bg-white/5 text-sky-600">
                  <HiOutlineGlobeAlt size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Global Coverage
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium italic">
                    24/7 Digital Asset Monitoring
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border border-gray-100 dark:border-white/5 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-start gap-4">
              <HiOutlineShieldCheck className="text-sky-600 mt-1" size={20} />
              <p className="text-xs text-gray-500 leading-relaxed">
                <strong>End-to-End Encryption:</strong> All communications via
                this terminal are secured using AES-256 standards. Your
                sensitive data is never stored on unencrypted servers.
              </p>
            </div>
          </div>

          {/* Right Column: Secure Form */}
          <div className="bg-gray-50 dark:bg-[#11141b] p-8 md:p-12 rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl shadow-black/5">
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    placeholder="John Doe"
                    className="w-full bg-white dark:bg-[#0a0c10] border border-gray-200 dark:border-white/10 p-4 rounded-xl text-sm focus:border-sky-600 outline-none transition-all dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Secure Email
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    placeholder="name@company.com"
                    className="w-full bg-white dark:bg-[#0a0c10] border border-gray-200 dark:border-white/10 p-4 rounded-xl text-sm focus:border-sky-600 outline-none transition-all dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Message Detail
                </label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  placeholder="Describe your inquiry..."
                  className="w-full bg-white dark:bg-[#0a0c10] border border-gray-200 dark:border-white/10 p-4 rounded-xl text-sm focus:border-sky-600 outline-none transition-all dark:text-white resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-sky-600 hover:bg-sky-500 text-white font-bold uppercase text-xs tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-sky-600/20 disabled:opacity-50 active:scale-[0.98]"
              >
                {loading ? "Transmitting..." : "Initialize Transmission"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
