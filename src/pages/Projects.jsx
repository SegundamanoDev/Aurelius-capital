import React, { useState } from "react";
import { projects } from "../data/projectData";

const Projects = () => {
  const [activeTab, setActiveTab] = useState("All");
  const categories = ["All", "Industrial", "Energy", "Scientific"];

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-[#1B4332] py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Our Engineering <span className="text-[#FFD600]">Impact</span>
          </h1>
          <p className="text-green-100 text-lg max-w-3xl mx-auto leading-relaxed">
            From residential biogas solutions to massive industrial
            waste-to-energy plants. Explore our certified construction projects
            across Nigeria.
          </p>
        </div>
      </div>

      {/* Modern Filter Bar */}
      <div className="sticky top-20 z-40 bg-white shadow-sm py-6 mb-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeTab === cat
                  ? "bg-[#1B4332] text-[#FFD600] shadow-lg scale-105"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Image Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all group border border-gray-100"
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-[#FFD600] text-[#1B4332] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                  {project.category}
                </div>
              </div>

              {/* Text Content */}
              <div className="p-8">
                <div className="flex items-center text-gray-400 text-xs font-bold mb-3 uppercase tracking-widest">
                  <svg
                    className="w-4 h-4 mr-1 text-[#1B4332]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {project.location}
                </div>
                <h3 className="text-2xl font-black text-[#1B4332] mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {project.description}
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button className="text-[#1B4332] font-black text-sm flex items-center hover:gap-2 transition-all">
                    VIEW PROJECT DETAILS
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Banner at the bottom of the page */}
      <div className="max-w-5xl mx-auto mt-24 px-4">
        <div className="bg-[#FFD600] rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between shadow-xl">
          <div className="text-[#1B4332] mb-6 md:mb-0">
            <h2 className="text-3xl font-black leading-none">
              Ready for a similar project?
            </h2>
            <p className="font-bold mt-2">
              Get a free survey and quotation from Abraham Ada.
            </p>
          </div>
          <a
            href="https://wa.me/2348053311594"
            className="bg-[#1B4332] text-white px-10 py-4 rounded-2xl font-black hover:scale-105 transition shadow-lg text-center"
          >
            DISCUSS YOUR SITE
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;
