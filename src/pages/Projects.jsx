import React, { useState } from "react";
import {
  HiOutlineLocationMarker,
  HiOutlineArrowRight,
  HiX,
  HiOutlineChartBar,
  HiOutlineShieldCheck,
  HiOutlineChip,
  HiOutlineSparkles,
} from "react-icons/hi";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      category: "Industrial Power",
      title: "Hybrid Fuel Bio-Reactor",
      location: "Lagos State, Nigeria",
      img: "/WhatsApp Image 2026-01-21 at 2.12.32 AM.jpeg",
      description:
        "A high-capacity subterranean installation engineered to generate consistent fuel for power generators and industrial-scale cooking gas.",
      specs: {
        efficiency: "Dual-Fuel Synergy",
        systemType: "Fixed-Dome Reactor",
        safetyGrade: "Industrial Reinforced",
        lifespan: "35+ Years",
        summary:
          "This Lagos-based project features a high-volume anaerobic chamber designed to convert organic waste into methane at industrial pressures. The gas is scrubbed of impurities, making it safe for long-term use in modified generators.",
      },
    },
    {
      id: 2,
      category: "Estate Solutions",
      title: "Dual-Dome Waste-to-Energy System",
      location: "Lagos State, Nigeria",
      img: "/WhatsApp Image 2026-01-21 at 1.41.44 AM.jpeg",
      description:
        "A continuous-flow tandem system designed for high-occupancy residential estates to eliminate sewage evacuation and provide clean energy.",
      specs: {
        efficiency: "High-Pressure Output",
        systemType: "Tandem Bio-Digester",
        safetyGrade: "ASTM Concrete Standard",
        lifespan: "30+ Years",
        summary:
          "This system utilizes a dual-dome architecture to maximize gas storage capacity. It is designed to handle heavy waste loads from multiple households, providing a permanent, odorless sewage solution.",
      },
    },
    {
      id: 3,
      category: "Industrial Farm",
      title: "Industrial Piggery Digester",
      location: "Ogun State, Nigeria",
      img: "/animal-waste-gas.jpg",
      description:
        "Specialized agricultural waste management system designed to eliminate farm odor and generate constant electricity from animal waste.",
      specs: {
        efficiency: "98.2% Biogas Purity",
        systemType: "Agro-Waste Reactor",
        safetyGrade: "H2S Scrubber Equipped",
        lifespan: "25+ Years",
        summary:
          "This project solves the environmental challenge of piggery waste. By capturing methane from manure, the farm now generates its own electricity while producing high-quality organic fertilizer as a byproduct.",
      },
    },
    {
      id: 4,
      category: "Residential Tech",
      title: "Ologbo Household Bio-System",
      location: "Ologbo, Edo State",
      img: "/WhatsApp biogas ologbo.jpeg",
      description:
        "A precision-engineered family system focused on total waste control and sustainable energy independence for private residences.",
      specs: {
        efficiency: "99% Waste Digestion",
        systemType: "Compact Bio-Digester",
        safetyGrade: "Residential Certified",
        lifespan: "25+ Years",
        summary:
          "Built specifically for a family setting, this system manages all household organic waste on-site. It produces zero-odor, high-utility biogas for the kitchen, removing the need for traditional septic pits.",
      },
    },
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20 font-sans">
      {/* 1. HERO HEADER */}
      <section className="bg-[#1B4332] pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6">
            <HiOutlineSparkles className="text-[#FFD600]" />
            <span className="text-white text-[9px] font-black tracking-[0.3em] uppercase">
              Engineering Portfolio
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter">
            Real Works. <br />
            <span className="text-[#FFD600]">Proven Results.</span>
          </h1>
          <p className="text-green-100/70 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            From industrial farms to private estates, we deploy advanced
            biotechnology to solve Nigeria's energy challenges.
          </p>
        </div>
      </section>

      {/* 2. PROJECT GRID */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col border border-gray-100"
            >
              <div className="relative h-96 w-full overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 bg-[#1B4332] text-[#FFD600] text-[9px] font-black px-4 py-2 rounded-xl uppercase tracking-widest">
                  {project.category}
                </div>
              </div>

              <div className="p-10 flex flex-col grow">
                <div className="flex items-center text-[#1B4332] text-[10px] font-black mb-4 uppercase tracking-widest">
                  <HiOutlineLocationMarker className="text-lg mr-2 text-[#FFD600]" />
                  {project.location}
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8 grow">
                  {project.description}
                </p>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full bg-gray-50 text-gray-400 group-hover:bg-[#FFD600] group-hover:text-[#1B4332] py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3"
                >
                  View Technical Specs <HiOutlineArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TECHNICAL MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#1B4332]/95 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          ></div>
          <div className="relative bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:row animate-in fade-in zoom-in duration-300 max-h-[90vh]">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-50 bg-white shadow-xl p-3 rounded-full hover:bg-red-500 hover:text-white transition-all"
            >
              <HiX className="text-xl" />
            </button>
            <div className="w-full md:w-1/2 h-64 md:h-auto">
              <img
                src={selectedProject.img}
                className="w-full h-full object-cover"
                alt="Installation Detail"
              />
            </div>
            <div className="w-full md:w-1/2 p-10 md:p-14 overflow-y-auto">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Technical Report
              </span>
              <h2 className="text-4xl font-black text-[#1B4332] mt-2 mb-6 tracking-tighter">
                {selectedProject.title}
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  {
                    icon: <HiOutlineChartBar />,
                    label: "Efficiency",
                    val: selectedProject.specs.efficiency,
                  },
                  {
                    icon: <HiOutlineChip />,
                    label: "Architecture",
                    val: selectedProject.specs.systemType,
                  },
                  {
                    icon: <HiOutlineShieldCheck />,
                    label: "Security",
                    val: selectedProject.specs.safetyGrade,
                  },
                  {
                    icon: <HiOutlineSparkles className="text-[#FFD600]" />,
                    label: "Durability",
                    val: selectedProject.specs.lifespan,
                    dark: true,
                  },
                ].map((spec, i) => (
                  <div
                    key={i}
                    className={`p-5 rounded-2xl ${spec.dark ? "bg-[#1B4332] text-white" : "bg-gray-50 border border-gray-100"}`}
                  >
                    <div
                      className={`${spec.dark ? "text-[#FFD600]" : "text-[#1B4332]"} text-xl mb-2`}
                    >
                      {spec.icon}
                    </div>
                    <p
                      className={`text-[8px] font-black uppercase tracking-widest ${spec.dark ? "text-white/40" : "text-gray-400"}`}
                    >
                      {spec.label}
                    </p>
                    <p className="text-sm font-black mt-1">{spec.val}</p>
                  </div>
                ))}
              </div>

              <div className="border-l-4 border-[#FFD600] pl-6 py-2 mb-10">
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  "{selectedProject.specs.summary}"
                </p>
              </div>

              <a
                href="https://wa.me/2348053311594"
                className="block w-full text-center bg-[#FFD600] text-[#1B4332] py-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:-translate-y-1 transition-all"
              >
                Request Professional Survey
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 4. FINAL CTA SECTION */}
      <section className="max-w-7xl mx-auto px-6 mt-32 mb-20">
        <div className="bg-[#1B4332] rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
              Ready to Start Your <br />
              <span className="text-[#FFD600]">Bio-Energy Project?</span>
            </h2>
            <a
              href="https://wa.me/2348053311594"
              className="inline-block bg-[#FFD600] text-[#1B4332] px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:scale-105 transition-all"
            >
              Consult Our Engineers
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
