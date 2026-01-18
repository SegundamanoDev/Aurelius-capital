import React from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineLightningBolt,
  HiOutlineGlobeAlt,
  HiOutlineCube,
  HiCheckCircle,
  HiOutlineTrendingUp,
  HiOutlineShieldCheck,
  HiOutlineBadgeCheck,
} from "react-icons/hi";
import { FaBiohazard } from "react-icons/fa";
import { GiGasStove, GiFertilizerBag, GiMicroscope } from "react-icons/gi";

const Home = () => {
  return (
    <div className="bg-white overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-10 pb-20 lg:pt-28 lg:pb-36 px-6 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-green-50 via-white to-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-[10px] font-black tracking-widest text-green-700 bg-green-100 rounded-lg uppercase">
              <HiOutlineShieldCheck className="text-sm" />
              Accredited Engineering: BN 8941617
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-none mb-6 tracking-tighter">
              Stop Evacuating. <br />
              <span className="text-[#1B4332]">Start Harvesting.</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0 font-medium">
              Join the 24-hour waste-to-energy revolution. Our anaerobic
              technology turns domestic sewage into{" "}
              <span className="text-[#1B4332] underline decoration-[#FFD600] decoration-4 underline-offset-4">
                cooking gas
              </span>{" "}
              and{" "}
              <span className="text-[#1B4332] underline decoration-[#FFD600] decoration-4 underline-offset-4">
                organic manure
              </span>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/contact"
                className="px-10 py-5 bg-[#1B4332] text-[#FFD600] font-black rounded-2xl shadow-[0_20px_50px_rgba(27,67,50,0.3)] hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                REQUEST A SITE SURVEY
              </Link>
              <Link
                to="/training"
                className="px-10 py-5 bg-white text-[#1B4332] border-2 border-gray-200 font-bold rounded-2xl hover:border-[#1B4332] transition-all flex items-center justify-center"
              >
                Training Academy
              </Link>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#FFD600] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="relative z-10">
              <img
                src="/digestor.jpg"
                alt="Biodigester"
                className="rounded-4xl lg:rounded-[3rem] shadow-2xl border-4 lg:border-8 border-white w-full h-auto max-h-[350px] md:max-h-[500px] object-contain bg-gray-50 lg:object-cover"
              />
              <div className="absolute -bottom-14 md:-bottom-8 left-1/2 -translate-x-1/2 bg-[#1B4332] text-white p-6 rounded-3xl shadow-2xl flex items-center gap-6 min-w-[280px]">
                <div className="text-center border-r border-white/20 pr-6">
                  <p className="text-[#FFD600] font-black text-3xl">100%</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest opacity-70">
                    Odorless
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[#FFD600] font-black text-3xl">0</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest opacity-70">
                    Maintenance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <div className="bg-[#1B4332] py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-white/80">
          <div className="flex flex-col items-center border-r border-white/10 last:border-0">
            <HiOutlineBadgeCheck className="text-[#FFD600] text-3xl mb-1" />
            <span className="text-xs font-bold uppercase tracking-widest">
              CAC Registered
            </span>
          </div>
          <div className="flex flex-col items-center border-r border-white/10 last:border-0">
            <HiOutlineLightningBolt className="text-[#FFD600] text-3xl mb-1" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Gas Conversion
            </span>
          </div>
          <div className="flex flex-col items-center border-r border-white/10 last:border-0">
            <HiOutlineGlobeAlt className="text-[#FFD600] text-3xl mb-1" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Nationwide Delivery
            </span>
          </div>
          <div className="flex flex-col items-center border-r border-white/10 last:border-0">
            <HiOutlineTrendingUp className="text-[#FFD600] text-3xl mb-1" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Lifetime Warranty
            </span>
          </div>
        </div>
      </div>

      {/* 3. CORE TECHNOLOGY */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-black text-[#1B4332] uppercase tracking-[0.4em] mb-4">
              Scientific Process
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Biotech Engineering <br /> Meets Modern Household Needs
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaBiohazard />,
                title: "Micro-Organism Tech",
                desc: "Using specialized microbes to breakdown human waste in an oxygen-free environment.",
              },
              {
                icon: <GiGasStove />,
                title: "Domestic Biogas",
                desc: "Convert waste into gas for cooking or powering generating sets for commercial use.",
              },
              {
                icon: <GiFertilizerBag />,
                title: "Liquid Manure",
                desc: "The end result of digestion is a clean, odorless liquid manure for agriculture.",
              },
              {
                icon: <HiOutlineGlobeAlt />,
                title: "100% Odorless",
                desc: "Does not accommodate insects or give room for contamination because it's odorless.",
              },
              {
                icon: <HiOutlineCube />,
                title: "Space Management",
                desc: "Compact anaerobic system that doesn't get full and manages site space perfectly.",
              },
              {
                icon: <HiOutlineLightningBolt />,
                title: "Power Generation",
                desc: "Our system is capable of powering generating sets through efficient gas output.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-12 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all border border-transparent hover:border-green-100 group"
              >
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-4xl text-[#1B4332] mb-8 group-hover:bg-[#FFD600] transition-all">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROOF OF CONCEPT */}
      <section className="py-24 px-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-10 -left-10 text-[10rem] font-black text-gray-100 select-none">
              BLUE
            </div>
            <div className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.2)]">
              <img
                src="/blueflame.jpg"
                alt="Blue Flame"
                className="w-full h-auto min-h-[300px] max-h-[500px] object-contain md:object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-12">
                <div className="text-white">
                  <p className="text-[#FFD600] font-black tracking-widest uppercase mb-2">
                    Real Site Test
                  </p>
                  <h4 className="text-3xl font-black">
                    Harvesting High-Purity Methane
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-5xl font-black text-gray-900 mb-10 leading-tight">
              Why Upgrade Your <br />
              <span className="text-[#1B4332]">Waste Infrastructure?</span>
            </h2>
            <div className="grid gap-6">
              {[
                {
                  t: "Economic Savings",
                  d: "Zero monthly evacuation bills. Forever.",
                },
                {
                  t: "Energy Freedom",
                  d: "Cook for hours using waste you normally pay to remove.",
                },
                {
                  t: "Health Protection",
                  d: "No seepage into groundwater or well water.",
                },
                {
                  t: "Insect Control",
                  d: "A closed system means no cockroaches or flies.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-6 p-6 rounded-3xl hover:bg-green-50 transition-colors"
                >
                  <HiCheckCircle className="text-4xl text-green-600 shrink-0" />
                  <div>
                    <h4 className="font-black text-xl text-gray-900">
                      {item.t}
                    </h4>
                    <p className="text-gray-500 font-medium">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. ANIMAL WASTE & POLLUTION CONTROL (CEO's FEATURED SOLUTION) */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative order-2 lg:order-1">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#FFD600] rounded-full z-0 opacity-20 blur-2xl"></div>
            <img
              src="/animal-waste-gas.jpg"
              alt="Animal Waste Digestion"
              // className="rounded-[3rem] shadow-2xl z-10 relative border-8 border-white object-cover w-full h-[450px]"
              className="rounded-4xl lg:rounded-[3rem] relative shadow-2xl border-4 lg:border-8 border-white w-full h-auto max-h-[350px] md:max-h-[500px] object-contain bg-gray-50 lg:object-cover"
            />
            <div className="absolute -bottom-14 -right-6 bg-[#1B4332] text-[#FFD600] p-8 rounded-3xl shadow-2xl max-w-xs z-20">
              <p className="text-xs font-black uppercase tracking-widest mb-2 text-white/70">
                Industrial Grade
              </p>
              <p className="text-lg font-bold leading-tight">
                Eliminate Smells & Environmental Polution.
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 space-y-8 order-1 lg:order-2">
            <div>
              <h4 className="text-[#1B4332] font-black uppercase tracking-[0.3em] text-sm mb-4">
                Farm Solutions
              </h4>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                Poultry <span className="text-gray-400">&</span> Piggery <br />
                Waste Management
              </h2>
            </div>
            <div className="w-20 h-2 bg-[#FFD600]"></div>
            <p className="text-xl text-gray-600 leading-relaxed font-medium">
              We create specialized digestive systems for large-scale farms that
              turn animal waste runoff into clean, high-pressure gas.
            </p>
            <blockquote className="border-l-8 border-[#1B4332] bg-white p-8 rounded-r-2xl italic text-gray-700 shadow-sm text-lg leading-relaxed">
              "We manage the animal waste i.e poultry waste as well as piggery
              waste. Instead of regular evacuation, we can create a digestive
              system that can manage all animal waste in order to avoid public
              pollution and incessant environmental polution."
            </blockquote>
            <div className="flex flex-col gap-4 pt-4">
              <div className="flex items-center gap-3 font-bold text-[#1B4332]">
                <HiOutlineBadgeCheck className="text-2xl text-[#FFD600]" />
                100% Odorless Operation
              </div>
              <div className="flex items-center gap-3 font-bold text-[#1B4332]">
                <HiOutlineBadgeCheck className="text-2xl text-[#FFD600]" />
                Turn Waste into Revenue (Gas & Manure)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. RESEARCH BREAKTHROUGH NARRATIVE */}
      <section className="py-24 bg-[#1B4332] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <GiMicroscope className="text-4xl text-[#1B4332]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter">
                The Research{" "}
                <span className="text-[#1B4332]">Breakthrough</span>
              </h2>
              <div className="h-1.5 w-20 bg-[#FFD600] mt-4"></div>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 leading-[1.8] font-medium italic">
              <p className="mb-6">
                "After a very careful research on waste management, considering
                the cost and the financial constraints involved in managing
                human waste with the old sewage management system, I decided to
                put in this result with a{" "}
                <span className="text-[#1B4332] font-black underline decoration-[#FFD600]">
                  micro-organism to breakdown the human waste
                </span>{" "}
                in an anaerobic system."
              </p>
              <img
                src="/NQMY4461.JPG"
                alt="Proof"
                className="w-full h-auto rounded-3xl mb-8 border-4 border-gray-50"
              />
              <p className="mb-6">
                "The end result was a{" "}
                <span className="bg-green-100 px-2 text-[#1B4332] font-bold">
                  24-hour digestive system
                </span>{" "}
                whereby microorganisms digest the human waste and convert them
                into liquids, making the liquid end result of the digestion a
                liquid manure."
              </p>
              <p className="mb-8 font-normal not-italic">
                "It therefore serves as the most economical human waste
                management system; it is odorless and does not accommodate
                insects nor give room for contamination. The anaerobic system
                can also produce gas for domestic and commercial use and can as
                well power a generating set."
              </p>
            </div>
            <div className="flex items-center gap-4 pt-8 border-t border-gray-100">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#1B4332]">
                <img
                  src="/AABD3091.JPG"
                  alt="Abraham Ada"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-black text-gray-900 uppercase tracking-widest text-xs">
                  Abraham Ada
                </p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">
                  Lead Researcher & Proprietor
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
