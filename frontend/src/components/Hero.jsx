import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { Github, Linkedin, Instagram, Mail, Twitter, Download } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const Hero = () => {
  const [user, setUser] = useState(null);

  // Resume Link Backend se laane ke liye
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          "https://my-3d-portfolio-w2c6.onrender.com/api/v1/user/portfolio/me"
        );
        setUser(data.user);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-20"
    >

      {/* 🟣 Static Neon Glows (Background Lights) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse -z-10" />

      {/* 👇 Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 z-10 w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12">

        {/* ==================== LEFT SIDE: TEXT CONTENT ==================== */}
        <div className="w-full md:w-1/2 text-center md:text-left">

            {/* Animated Name */}
            <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            >
            <h2 className="text-blue-400 text-lg md:text-xl font-medium tracking-widest mb-2 drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]">
                HELLO, I'M
            </h2>
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                VIKAS RATHORE
            </h1>
            </motion.div>

            {/* Typing Effect */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6 h-10"
            >
            <TypeAnimation
                sequence={[
                "MERN Stack Developer", 2000,
                "Full Stack Engineer", 2000,
                "Backend Specialist", 2000,
                "React.js Expert", 2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
            />
            </motion.div>

            {/* Description */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-gray-400 max-w-lg mx-auto md:mx-0 mb-8 text-base md:text-lg leading-relaxed"
            >
            I build scalable, secure, and dynamic web applications.
            From crafting beautiful frontends to architecting robust backends.
            </motion.p>

            {/* Social Links */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex gap-4 justify-center md:justify-start mb-10"
            >
                <SocialIcon href="https://github.com/Vikas123Rathore" icon={<Github size={22} />} color="hover:text-white hover:shadow-[0_0_15px_white]" />
                <SocialIcon href="https://www.linkedin.com/in/vikas-rathore-b01599394" icon={<Linkedin size={22} />} color="hover:text-blue-500 hover:shadow-[0_0_15px_#3b82f6]" />
                <SocialIcon href="https://www.instagram.com/i_vikas.rathore?igsh=MnZkMjF5Z3l0bHpt" icon={<Instagram size={22} />} color="hover:text-pink-500 hover:shadow-[0_0_15px_#ec4899]" />
               
            </motion.div>

            {/* 👇 BUTTONS (With Local Resume Download) 👇 */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="flex flex-wrap gap-4 justify-center md:justify-start"
            >
                <a href="#projects" className="px-6 py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 hover:shadow-[0_0_20px_#3b82f6] transition-all">
                    View My Work
                </a>
                <a href="#contact" className="px-6 py-3 rounded-full border border-blue-500 text-blue-400 font-bold hover:bg-blue-500/10 hover:shadow-[0_0_20px_#3b82f6] transition-all">
                    Contact Me
                </a>

                {/* 👇 LOCAL RESUME LINK (Corrected) */}
                <a
                    href="/resume.pdf"  // <-- DIRECT FILE LINK from public folder
                    download="Indrajeet_Resume.pdf" // Force Download with Name
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full border border-purple-500 text-purple-400 font-bold hover:bg-purple-500/10 hover:shadow-[0_0_20px_#a855f7] transition-all flex items-center gap-2"
                >
                    Resume <Download size={18} />
                </a>
            </motion.div>
        </div>

        {/* ==================== RIGHT SIDE: STYLISH PHOTO ==================== */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                whileHover={{ scale: 1.05 }}
                className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] z-10"
            >
                {/* 1. Neon Glow Ring */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-2xl opacity-50 animate-pulse -z-10"></div>

                {/* 2. Glass Border Container */}
                <div className="w-full h-full rounded-[30%_70%_70%_30%/30%_30%_70%_70%] border-2 border-white/20 bg-white/5 backdrop-blur-sm overflow-hidden p-2 shadow-[0_0_30px_rgba(59,130,246,0.3)]">

                    {/* 3. Actual Image */}
                    <img
                        src="/pic.png"
                        alt="vikas-rathore"
                        className="w-full h-full object-cover rounded-[30%_70%_70%_30%/30%_30%_70%_70%]"
                    />
                </div>
            </motion.div>

        </div>
      </div>
    </section>
  );
};

// Helper Component (Social Icons)
const SocialIcon = ({ href, icon, color }) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-full border border-gray-800 bg-[#111]/50 backdrop-blur-sm text-gray-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${color}`}
        >
            {icon}
        </a>
    )
}

export default Hero;
