import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/project/getall",
          { withCredentials: true }
        );
        setProjects(data.projects);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="min-h-screen py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects && projects.map((element) => (
            <motion.div
              key={element._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              // ✨ ULTRA GLASSMORPHISM & ANIMATED BORDER (Matching Green/Blue gradient) ✨
              className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 shadow-xl transition-all duration-500 group hover:border-green-500/80 hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={element.projectBanner && element.projectBanner.url}
                  alt={element.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-center items-center gap-4 backdrop-blur-sm">
                    <a href={element.projectLink} target="_blank" className="p-3 bg-white/90 rounded-full text-black hover:bg-blue-500 hover:text-white transition duration-300"><ExternalLink size={20} /></a>
                    <a href={element.gitRepoLink} target="_blank" className="p-3 bg-white/90 rounded-full text-black hover:bg-gray-800 hover:text-white transition duration-300"><Github size={20} /></a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-500">{element.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                    {/* Technologies Badges (Glassy) */}
                    {element.technologies.split(",").map((tech, index) => (
                        <span key={index} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md border border-blue-500/30 backdrop-blur-md">
                            {tech.trim()}
                        </span>
                    ))}
                </div>
                <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                    {element.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;