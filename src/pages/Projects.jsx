import React, { useState, useEffect } from "react";
import axios from "axios";
import { PiProjectorScreenChartBold } from "react-icons/pi"; // Project icon
import ProjectCard from "../components/ProjectCard"; // We will create this component next

// Define the base URL for your API
// NOTE: This must match the port your Express server is running on (e.g., 5000)
const API_URL = "https://portfolio-backend-1-sx2x.onrender.com/api/v1/projects";
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Data Fetching Logic ---
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // The API call to your Express backend
        const response = await axios.get(API_URL);

        // Assuming your API returns { success: true, count: N, data: [...] }
        setProjects(response.data.data);
        setLoading(false);
      } catch (err) {
        // The error handler we built on the backend will return clean messages
        console.error("Error fetching projects:", err);
        setError(
          "Failed to load projects. Please check the backend API server."
        );
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // --- Rendering Logic: Loading, Error, and Success ---

  // 1. Loading State
  if (loading) {
    return (
      <section
        id="projects"
        className="py-20 flex justify-center items-center min-h-[50vh]"
      >
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-mint-accent"></div>
        <p className="ml-4 text-mint-accent font-mono">Loading Projects...</p>
      </section>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <section
        id="projects"
        className="py-20 flex justify-center items-center min-h-[50vh] text-center text-red-500"
      >
        <PiProjectorScreenChartBold size={40} className="mr-3" />
        <p className="text-xl font-bold">{error}</p>
      </section>
    );
  }

  // 3. Success State
  return (
    <section id="projects" className="py-20 sm:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* --- Section Title --- */}
        <h3 className="text-3xl font-bold text-slate-light mb-12 flex items-center">
          <span className="text-mint-accent font-mono mr-3">02.</span>
          My Projects Showcase ({projects.length})
          <span className="grow ml-4 border-t border-slate-dark opacity-30"></span>
        </h3>

        {/* --- Project Grid --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            // Pass the fetched project data to a dedicated card component
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
