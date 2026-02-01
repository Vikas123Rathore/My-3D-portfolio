import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      // Styling: Fixed position, Bada Size (500px), Bohot zyada Blur, Background ke peeche (z-0)
      className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0 blur-[100px] opacity-20"
      
      // 1. Mouse ke saath move karo (Center karne ke liye -250px kiya kyunki width 500 hai)
      animate={{
        x: mousePosition.x - 250, 
        y: mousePosition.y - 250,
        // 2. COLOR CHANGING ANIMATION (Blue -> Purple -> Pink -> Cyan -> Blue)
        backgroundColor: [
            "#3b82f6", // Blue
            "#a855f7", // Purple
            "#ec4899", // Pink
            "#06b6d4", // Cyan
            "#3b82f6"  // Back to Blue
        ],
      }}
      
      // 3. Smooth Transitions
      transition={{
        // Movement ke liye Spring (Thoda bounce karega)
        x: { type: "spring", stiffness: 100, damping: 20 },
        y: { type: "spring", stiffness: 100, damping: 20 },
        // Color change ke liye Linear Loop (Hamesha chalta rahega)
        backgroundColor: { duration: 5, repeat: Infinity, ease: "linear" }
      }}
    />
  );
};

export default MouseFollower;