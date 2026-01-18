import React, { useState } from "react";
import {
  HiOutlineLocationMarker,
  HiOutlineArrowRight,
  HiX,
  HiOutlineChartBar,
  HiOutlineShieldCheck,
  HiOutlineChip,
} from "react-icons/hi";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const ProjectCard = ({
    category,
    title,
    location,
    description,
    img,
    specs,
  }) => (
    <div className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
      {/* Fixed Card Image Height */}
      <div className="relative h-72 w-full overflow-hidden bg-gray-200">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-6 left-6 backdrop-blur-md bg-black/30 text-white text-[9px] font-black px-4 py-1.5 rounded-full border border-white/20 uppercase tracking-[0.2em]">
          {category}
        </div>
      </div>

      <div className="p-8 flex flex-col grow">
        <div className="flex items-center text-[#1B4332] text-[10px] font-black mb-4 uppercase tracking-[0.2em]">
          <HiOutlineLocationMarker className="text-lg mr-2 text-[#FFD600]" />
          {location}
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-[#1B4332] transition-colors leading-tight">
          {title}
        </h3>
        <p className="text-gray-500 leading-relaxed text-sm font-medium mb-8 grow">
          {description}
        </p>

        <div className="pt-6 border-t border-gray-50">
          <button
            onClick={() =>
              setSelectedProject({ title, location, img, ...specs })
            }
            className="w-full bg-gray-50 group-hover:bg-[#FFD600] group-hover:text-[#1B4332] text-gray-400 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            View Technical Specs
            <HiOutlineArrowRight className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20">
      {/* 1. Header Section */}
      <div className="bg-[#1B4332] pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-[#FFD600] text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">
            Nationwide Portfolio
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            Engineering <span className="text-[#FFD600]">Impact.</span>
          </h1>
          <p className="text-green-100/80 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Deploying sustainable waste-to-energy systems across Nigeria's
            industrial and residential sectors.
          </p>
        </div>
      </div>

      {/* 2. Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <ProjectCard
            category="Industrial"
            title="Industrial Piggery Digester"
            location="Ogun State, Nigeria"
            img="/animal-waste-gas.jpg"
            description="High-capacity system designed to manage animal waste runoff and convert it into constant electricity."
            specs={{
              efficiency: "98.2% Output",
              systemType: "Anaerobic",
              safetyGrade: "Industrial",
              lifespan: "25+ Years",
              summary:
                "This installation utilizes high-purity micro-organism cultures to facilitate rapid waste breakdown. The system features a custom-built H2S scrubber for 100% odorless gas output.",
            }}
          />
          {/* Add more cards as needed using the same props */}
        </div>
      </div>

      {/* 3. FIXED MODAL COMPONENT */}
      {selectedProject && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#1B4332]/95 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          ></div>

          {/* Modal Card */}
          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-4xl md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
            {/* Close Button - More visible */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-50 bg-white/90 hover:bg-red-500 hover:text-white p-3 rounded-full shadow-lg transition-all"
            >
              <HiX className="text-xl md:text-2xl" />
            </button>

            {/* FIXED MODAL IMAGE SECTION */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-100">
              <img
                src={selectedProject.img}
                className="w-full h-full object-cover"
                alt="Technical View"
              />
              {/* Gradient overlay fixed to cover full image area */}
              <div className="absolute inset-0 bg-linear-to-t from-[#1B4332] via-transparent to-transparent opacity-70"></div>
            </div>

            {/* MODAL CONTENT SECTION */}
            <div className="w-full md:w-1/2 p-6 md:p-14 overflow-y-auto bg-white">
              <div className="mb-8">
                <span className="text-[#1B4332] text-[10px] font-black tracking-widest uppercase bg-green-50 px-3 py-1 rounded-md">
                  Technical Documentation
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-4 leading-tight">
                  {selectedProject.title}
                </h2>
                <p className="text-gray-500 mt-3 flex items-center gap-2 font-bold text-sm">
                  <HiOutlineLocationMarker className="text-[#FFD600] text-lg" />
                  {selectedProject.location}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-gray-50 p-4 md:p-5 rounded-2xl border border-gray-100">
                  <HiOutlineChartBar className="text-[#1B4332] text-xl mb-2" />
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">
                    Efficiency
                  </p>
                  <p className="text-sm md:text-base font-black text-[#1B4332]">
                    {selectedProject.efficiency}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 md:p-5 rounded-2xl border border-gray-100">
                  <HiOutlineChip className="text-[#1B4332] text-xl mb-2" />
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">
                    System
                  </p>
                  <p className="text-sm md:text-base font-black text-[#1B4332]">
                    {selectedProject.systemType}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 md:p-5 rounded-2xl border border-gray-100">
                  <HiOutlineShieldCheck className="text-[#1B4332] text-xl mb-2" />
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">
                    Safety
                  </p>
                  <p className="text-sm md:text-base font-black text-[#1B4332]">
                    {selectedProject.safetyGrade}
                  </p>
                </div>
                <div className="bg-[#1B4332] p-4 md:p-5 rounded-2xl shadow-lg">
                  <p className="text-[8px] font-black text-white/50 uppercase tracking-widest">
                    Lifespan
                  </p>
                  <p className="text-sm md:text-base font-black text-[#FFD600]">
                    {selectedProject.lifespan}
                  </p>
                </div>
              </div>

              {/* Engineering Summary */}
              <div className="space-y-6">
                <div className="border-l-4 border-[#FFD600] pl-4">
                  <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-2">
                    Engineering Summary
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {selectedProject.summary}
                  </p>
                </div>

                <a
                  href="https://wa.me/2348053311594"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#FFD600] text-[#1B4332] py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:shadow-[#FFD600]/20 hover:-translate-y-1 transition-all"
                >
                  Request Technical Blueprint
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. CTA Banner */}
      <div className="max-w-7xl mx-auto mt-32 px-6">
        <div className="bg-[#1B4332] rounded-[3rem] p-10 md:p-20 flex flex-col lg:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
          <div className="text-white relative z-10 max-w-2xl text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
              Need a Custom <br />
              <span className="text-[#FFD600]">Farm Waste System?</span>
            </h2>
            <p className="text-green-100/70 font-medium text-lg">
              Stop pollution and avoid environmental petitions today. Join the
              biogas revolution.
            </p>
          </div>
          <a
            href="https://wa.me/2348053311594"
            className="mt-12 lg:mt-0 bg-[#FFD600] text-[#1B4332] px-14 py-6 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
          >
            BOOK SITE SURVEY
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;
