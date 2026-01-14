import React from "react";
import {
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineGlobe,
  HiOutlineLightBulb,
  HiOutlineCheckCircle,
} from "react-icons/hi";
import { FaQuoteLeft } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO VISION SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            {/* The "Stacked Frame" look we discussed for the Boss */}
            <div className="absolute inset-0 border-2 border-[#FFD600] translate-x-6 translate-y-6 rounded-[3rem] z-0"></div>
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl bg-[#1B4332]">
              <img
                src="/AABD3091.JPG"
                alt="Abraham Ada - Proprietor"
                className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-10 -right-6 bg-[#FFD600] p-10 rounded-3xl shadow-2xl border-b-8 border-[#1B4332] z-20">
              <p className="text-[#1B4332] font-black text-4xl">2024</p>
              <p className="text-[#1B4332] text-[10px] font-black uppercase tracking-widest opacity-80">
                Founding Year
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="text-[#1B4332] font-black tracking-[0.3em] uppercase text-xs mb-4">
                The Visionary Behind the Tech
              </h4>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 leading-[1.1]">
                Engineering <br />
                <span className="text-[#1B4332]">Sustainable</span> <br />
                Solutions.
              </h2>
            </div>

            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <div className="relative p-8 bg-green-50 rounded-3xl border-l-8 border-[#FFD600]">
                <FaQuoteLeft className="text-[#FFD600] text-3xl mb-4 opacity-40" />
                <p className="italic font-bold text-[#1B4332] text-xl">
                  "After years of studying waste patterns in Nigeria, I
                  committed to a system that doesn't just manage waste—it
                  harvests it."
                </p>
              </div>
              <p>
                Founded by **Abraham Ada**, Abrada-Biotech Enterprise
                specializes in anaerobic biotechnology. We solve the perennial
                problem of foul-smelling, overflowing soak-aways by transforming
                waste into usable energy.
              </p>
              <p className="font-medium">
                Headquartered in **Benin City**, we are on a mission to ensure
                every Nigerian home can access odorless, insect-free, and
                permanent sewage solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR CORE STANDARDS (The "Design Lack" Fix) */}
      <section className="py-24 bg-[#0b1a14] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[#FFD600] font-black uppercase tracking-widest text-sm mb-4">
              Why We Are Different
            </h2>
            <h3 className="text-4xl font-black italic">The Abrada Standard</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Eco-Friendly",
                desc: "100% Micro-organism based digestion with zero chemicals.",
                icon: <HiOutlineGlobe />,
              },
              {
                title: "Permanent",
                desc: "Designed to last for decades without a single evacuation.",
                icon: <HiOutlineShieldCheck />,
              },
              {
                title: "Productive",
                desc: "Turn human waste into organic manure and cooking gas.",
                icon: <HiOutlineLightBulb />,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:border-[#FFD600] transition-all"
              >
                <div className="text-4xl text-[#FFD600] mb-6">{item.icon}</div>
                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OFFICIAL ACCREDITATION (Wall of Trust) */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black text-[#1B4332] uppercase tracking-tighter">
                Legal Accreditation
              </h2>
              <p className="text-gray-500 mt-4">
                We are a fully compliant entity, certified by the Corporate
                Affairs Commission (CAC) and the Federal Inland Revenue Service
                (FIRS).
              </p>
            </div>
            <div className="bg-white px-6 py-3 rounded-full border border-gray-200 shadow-sm flex items-center gap-3">
              <HiOutlineCheckCircle className="text-green-500 text-xl" />
              <span className="text-xs font-black uppercase tracking-widest">
                Status: Active & Verified
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                img: "/certificate.jpg",
                title: "CAC Certificate",
                detail: "BN 8941617",
              },
              {
                img: "/taxI.jpg",
                title: "FIRS Tax Compliance",
                detail: "TIN: 33641157-0001",
              },
              {
                img: "/taxII.jpg",
                title: "Status Report",
                detail: "Proprietorship Verified",
              },
            ].map((doc, i) => (
              <div key={i} className="group">
                <div className="bg-white p-4 rounded-4xlshadow-md border border-gray-100 group-hover:shadow-2xl transition-all duration-500">
                  <div className="h-[400px] overflow-hidden rounded-2xl mb-6 bg-gray-50">
                    <img
                      src={doc.img}
                      alt={doc.title}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="px-4 pb-4">
                    <h3 className="text-lg font-black text-gray-900">
                      {doc.title}
                    </h3>
                    <p className="text-[#1B4332] font-bold text-sm mt-1">
                      {doc.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
