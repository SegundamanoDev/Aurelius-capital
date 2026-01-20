import React from "react";
import {
  HiOutlineShieldCheck,
  HiOutlineGlobe,
  HiOutlineLightBulb,
  HiOutlineCheckCircle,
  HiOutlineFingerPrint,
  HiOutlineOfficeBuilding,
  HiOutlineAcademicCap,
  HiOutlineTrendingUp,
} from "react-icons/hi";
import { FaQuoteLeft } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO VISION SECTION */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute inset-0 border-2 border-[#FFD600] translate-x-6 translate-y-6 rounded-[3rem] z-0"></div>
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl bg-[#1B4332]">
              <img
                src="/AABD3091.JPG"
                alt="Abraham Ada - Proprietor"
                className="w-full h-[650px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-10 -left-6 bg-[#FFD600] p-10 rounded-3xl shadow-2xl border-b-8 border-[#1B4332] z-20">
              <p className="text-[#1B4332] font-black text-5xl tracking-tighter">
                2024
              </p>
              <p className="text-[#1B4332] text-[10px] font-black uppercase tracking-[0.2em] opacity-80">
                Founding Year
              </p>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h4 className="text-[#1B4332] font-black tracking-[0.4em] uppercase text-[10px] mb-4 bg-green-50 inline-block px-4 py-2 rounded-full">
                The Visionary Behind the Tech
              </h4>
              <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.05] tracking-tighter">
                Engineering <br />
                <span className="text-[#1B4332]">Sustainable</span> <br />
                Solutions.
              </h2>
            </div>

            <div className="space-y-8 text-gray-600 text-lg leading-relaxed">
              <div className="relative p-10 bg-[#f8faf9] rounded-[2.5rem] border-l-[12px] border-[#FFD600] shadow-sm">
                <FaQuoteLeft className="text-[#FFD600] text-4xl mb-6 opacity-30" />
                <p className="italic font-bold text-[#1B4332] text-2xl leading-snug">
                  "After years of studying waste patterns in Nigeria, I
                  committed to a system that doesn't just manage waste—it
                  harvests it."
                </p>
                <p className="mt-4 text-xs font-black uppercase tracking-widest text-gray-400">
                  — Abraham Ada, Founder
                </p>
              </div>
              <p className="font-medium">
                Founded by{" "}
                <span className="text-[#1B4332] font-bold underline decoration-[#FFD600] decoration-4">
                  Abraham Ada
                </span>
                , Abrada-Biotech Enterprise specializes in anaerobic
                biotechnology. We solve the perennial problem of foul-smelling,
                overflowing soak-aways by transforming waste into usable energy.
              </p>
              <p className="font-medium text-gray-500">
                Headquartered in Benin City, we are on a mission to ensure every
                Nigerian home can access odorless, insect-free, and permanent
                sewage solutions. Our tech is built for the African climate,
                ensuring 24/7 efficiency regardless of weather patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR CORE STANDARDS */}
      <section className="py-28 bg-[#0b1a14] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-green-900/10 blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-[#FFD600] font-black uppercase tracking-[0.4em] text-[10px] mb-4">
                Operational Excellence
              </h2>
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter">
                The Abrada Standard
              </h3>
            </div>
            <p className="text-gray-400 max-w-sm text-sm text-center md:text-right font-medium">
              We don't just build systems; we engineer future-proof
              environmental solutions for generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Eco-Friendly",
                desc: "100% Micro-organism based digestion with zero chemicals or pollutants.",
                icon: <HiOutlineGlobe />,
              },
              {
                title: "Permanent",
                desc: "Designed to last for decades without a single manual evacuation needed.",
                icon: <HiOutlineShieldCheck />,
              },
              {
                title: "Productive",
                desc: "Harnessing human waste to create organic manure and blue-flame cooking gas.",
                icon: <HiOutlineLightBulb />,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/5 p-12 rounded-[3rem] border border-white/10 hover:bg-white/10 hover:border-[#FFD600] transition-all duration-500 group"
              >
                <div className="w-16 h-16 bg-[#1B4332] rounded-2xl flex items-center justify-center text-4xl text-[#FFD600] mb-8 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-2xl font-black mb-4 uppercase tracking-tight">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NEW SECTION: PROFESSIONAL MISSION TILES */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
            <HiOutlineAcademicCap className="text-3xl text-[#1B4332] mb-4" />
            <h5 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-2">
              Research Driven
            </h5>
            <p className="text-gray-500 text-xs font-medium leading-relaxed">
              Our microbial cultures are lab-tested for Nigeria's specific
              organic waste types.
            </p>
          </div>
          <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
            <HiOutlineOfficeBuilding className="text-3xl text-[#1B4332] mb-4" />
            <h5 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-2">
              Industrial Grade
            </h5>
            <p className="text-gray-500 text-xs font-medium leading-relaxed">
              Scaling solutions from domestic homes to large-scale livestock
              farms.
            </p>
          </div>
          <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
            <HiOutlineTrendingUp className="text-3xl text-[#1B4332] mb-4" />
            <h5 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-2">
              Cost Effective
            </h5>
            <p className="text-gray-500 text-xs font-medium leading-relaxed">
              Save up to ₦500k annually on gas and sewage evacuation costs.
            </p>
          </div>
          <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
            <HiOutlineFingerPrint className="text-3xl text-[#1B4332] mb-4" />
            <h5 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-2">
              Custom Built
            </h5>
            <p className="text-gray-500 text-xs font-medium leading-relaxed">
              Every site gets a custom engineering blueprint based on soil
              topography.
            </p>
          </div>
        </div>
      </section>

      {/* 4. MODERN LEGAL ACCREDITATION (Replacement for Certificates) */}
      <section className="pb-32 pt-16 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-[#1B4332] uppercase tracking-tighter mb-6">
              Official Compliance
            </h2>
            <p className="text-gray-500 font-medium">
              Abrada-Biotech is a legally registered entity in the Federal
              Republic of Nigeria. You can verify our status on the official
              government portals using the credentials below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* CAC CARD */}
            <div className="bg-[#f8faf9] p-8 md:p-12 rounded-[3.5rem] border-2 border-dashed border-gray-200 flex flex-col md:flex-row items-center gap-8 hover:border-[#1B4332] transition-colors group">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform">
                <img
                  src="/Coat_of_arms_of_Nigeria.svg.png"
                  className="w-16 h-16 object-contain"
                  alt="Nigeria Coat of Arms"
                />
              </div>
              <div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                  Business Registration
                </span>
                <h3 className="text-3xl font-black text-[#1B4332] mt-1 mb-2">
                  CAC VERIFIED
                </h3>
                <div className="flex items-center gap-3">
                  <span className="bg-[#1B4332] text-[#FFD600] px-4 py-2 rounded-xl font-black text-lg tracking-wider">
                    BN 8941617
                  </span>
                  <div className="flex items-center gap-1 text-green-600 text-[10px] font-bold uppercase">
                    <HiOutlineCheckCircle /> Verified
                  </div>
                </div>
              </div>
            </div>

            {/* FIRS CARD */}
            <div className="bg-[#0b1a14] p-8 md:p-12 rounded-[3.5rem] flex flex-col md:flex-row items-center gap-8 hover:shadow-2xl transition-all group">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center shadow-xl group-hover:-rotate-12 transition-transform">
                <HiOutlineShieldCheck className="text-[#FFD600] text-5xl" />
              </div>
              <div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">
                  Tax Identification
                </span>
                <h3 className="text-3xl font-black text-white mt-1 mb-2 tracking-tight uppercase">
                  Tax Compliant
                </h3>
                <div className="flex items-center gap-3">
                  <span className="bg-[#FFD600] text-[#1B4332] px-4 py-2 rounded-xl font-black text-lg tracking-wider">
                    33641157-0001
                  </span>
                  <div className="flex items-center gap-1 text-[#FFD600] text-[10px] font-bold uppercase">
                    <HiOutlineCheckCircle /> Active
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center mt-12 text-gray-400 text-xs font-bold uppercase tracking-widest">
            Federal Inland Revenue Service (FIRS) • Corporate Affairs Commission
            (CAC)
          </p>
        </div>
      </section>

      {/* NEW: THE ENGINEERING PROCESS SECTION */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-[#1B4332] font-black uppercase tracking-[0.4em] text-[10px] mb-4">
              How We Work
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
              From Survey to{" "}
              <span className="text-[#1B4332]">Sovereignty.</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Step 1 */}
            <div className="p-8 rounded-[2.5rem] bg-[#f8faf9] border border-gray-100 relative group hover:bg-[#1B4332] transition-all duration-500">
              <span className="text-6xl font-black text-gray-100 group-hover:text-white/10 absolute top-4 right-4 transition-colors">
                01
              </span>
              <div className="relative z-10">
                <h4 className="font-black text-[#1B4332] group-hover:text-[#FFD600] mb-4 uppercase text-sm tracking-widest">
                  Site Survey
                </h4>
                <p className="text-gray-500 group-hover:text-gray-300 text-xs leading-relaxed font-medium">
                  Detailed analysis of soil porosity, waste volume, and
                  topography.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-[2.5rem] bg-[#f8faf9] border border-gray-100 relative group hover:bg-[#1B4332] transition-all duration-500">
              <span className="text-6xl font-black text-gray-100 group-hover:text-white/10 absolute top-4 right-4 transition-colors">
                02
              </span>
              <div className="relative z-10">
                <h4 className="font-black text-[#1B4332] group-hover:text-[#FFD600] mb-4 uppercase text-sm tracking-widest">
                  Blueprint
                </h4>
                <p className="text-gray-500 group-hover:text-gray-300 text-xs leading-relaxed font-medium">
                  Custom CAD design of the anaerobic digester tailored to the
                  facility.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-[2.5rem] bg-[#f8faf9] border border-gray-100 relative group hover:bg-[#1B4332] transition-all duration-500">
              <span className="text-6xl font-black text-gray-100 group-hover:text-white/10 absolute top-4 right-4 transition-colors">
                03
              </span>
              <div className="relative z-10">
                <h4 className="font-black text-[#1B4332] group-hover:text-[#FFD600] mb-4 uppercase text-sm tracking-widest">
                  Execution
                </h4>
                <p className="text-gray-500 group-hover:text-gray-300 text-xs leading-relaxed font-medium">
                  Precision engineering and installation of the bio-digester
                  system.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-8 rounded-[2.5rem] bg-[#1B4332] shadow-xl relative group">
              <span className="text-6xl font-black text-white/10 absolute top-4 right-4">
                04
              </span>
              <div className="relative z-10">
                <h4 className="font-black text-[#FFD600] mb-4 uppercase text-sm tracking-widest">
                  Inoculation
                </h4>
                <p className="text-gray-300 text-xs leading-relaxed font-medium">
                  Seeding the system with specific microbial cultures for gas
                  production.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="bg-[#1B4332] rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
              Ready to Build the <br />
              <span className="text-[#FFD600]">Future of Energy?</span>
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a
                href="https://wa.me/2348053311594"
                className="bg-[#FFD600] text-[#1B4332] px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
              >
                Start Site Survey
              </a>
              <p className="text-white/60 font-bold uppercase text-[10px] tracking-widest">
                Over 50+ Verified Installations Nationwide
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
