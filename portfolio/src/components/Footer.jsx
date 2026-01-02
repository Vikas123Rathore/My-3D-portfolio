import React from "react";

const Footer = () => {
  return (
    <footer className="py-6 text-center border-t border-gray-900 relative z-10 backdrop-blur-sm bg-black/20">
      <p className="text-gray-500 text-sm">
        © {new Date().getFullYear()} Vikas Rathore. All rights reserved.
      </p>
      <p className="text-gray-600 text-xs mt-1">
        Built with MERN Stack + Tailwind + Framer Motion
      </p>
    </footer>
  );
};

export default Footer;
