import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const { data } = await axios.get(
          "https://my-3d-portfolio-w2c6.onrender.com/api/v1/timeline/getall",
          { withCredentials: true }
        );
        setTimeline(data.timelines);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTimeline();
  }, []);

  return (
    <section id="timeline" className="min-h-screen py-20 relative">
      <div className="max-w-4xl mx-auto px-6">
        
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            My Journey
        </h2>

        <div className="relative border-l-2 border-white/10 ml-4 md:ml-0">
          {timeline && timeline.map((element, index) => (
            <motion.div 
                key={element._id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="mb-10 ml-10 relative group"
            >
              {/* Dot on Line (Animated Glow) */}
              <span className="absolute -left-[54px] w-6 h-6 bg-[#0a0a0a] rounded-full border-4 border-purple-600 shadow-[0_0_15px_#a855f7] group-hover:shadow-[0_0_25px_#a855f7] group-hover:scale-125 transition-all duration-500"></span>
              
              {/* ✨ ULTRA GLASSMORPHISM CARD & ANIMATED BORDER (Purple) ✨ */}
              <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 shadow-xl transition-all duration-500 hover:border-purple-500/80 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors duration-500">{element.title}</h3>
                <span className="text-sm text-purple-400 font-mono block mb-3">
                    {element.timeline.from} - {element.timeline.to ? element.timeline.to : "Present"}
                </span>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
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

export default Timeline;
