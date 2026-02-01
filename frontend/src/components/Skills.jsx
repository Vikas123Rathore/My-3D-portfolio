import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await axios.get(
          "https://my-3d-portfolio-w2c6.onrender.com/api/v1/softwareapplication/getall",
          { withCredentials: true }
        );
        setSkills(data.softwareApplications);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSkills();
  }, []);

  return (
    <section id="skills" className="w-full min-h-screen py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
        >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                Technical Skills
            </h2>
            <p className="text-gray-400 text-lg">My Tech Stack & Tools</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {skills && skills.map((element) => (
            <motion.div
              key={element._id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              // ✨ ULTRA GLASSMORPHISM & ANIMATED BORDER ✨
              className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-xl flex flex-col items-center justify-center gap-4 transition-all duration-500 group hover:border-blue-500/80 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
            >
              <img
                src={element.svg && element.svg.url}
                alt={element.name}
                className="w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.8)] transition-all duration-500"
              />
              <h3 className="font-semibold text-gray-300 group-hover:text-white transition-colors duration-500 text-lg">
                {element.name}
              </h3>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
