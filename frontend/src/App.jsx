import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import MouseFollower from "./components/MouseFollower";

const App = () => {
  return (
    // 🟢 FIX 1: 'cursor-none' hata diya. Ab mouse hamesha dikhega.
    // 🟢 FIX 2: 'bg-[#050505]' yahi rahega, baaki sab transparent honge.
    <div className="font-sans text-white bg-[#050505] min-h-screen relative overflow-hidden">
      
      {/* 🖱️ Cursor Animation (Background Layer - Z Index 0) */}
      <MouseFollower />

      {/* 🟢 Main Content (Z-Index 10 taaki ye glow ke upar rahe par transparent ho) */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
        <Footer />
      </div>

    </div>
  );
};

export default App;