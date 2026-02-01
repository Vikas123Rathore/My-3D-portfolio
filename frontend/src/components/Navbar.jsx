import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-scroll";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 1, text: "Home", to: "home" },
    { id: 2, text: "Skills", to: "skills" },
    { id: 3, text: "Projects", to: "projects" },
    { id: 4, text: "Timeline", to: "timeline" },
    { id: 5, text: "Contact", to: "contact" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Neon Glow */}
          <div className="flex-shrink-0 cursor-pointer">
            <h1 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
              Vikas<span className="text-blue-500">Rathore</span>
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.to}
                  smooth={true}
                  duration={500}
                  className="cursor-pointer text-gray-300 hover:text-blue-500 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all text-lg  font-semibold"
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-blue-500 transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                smooth={true}
                duration={500}
                onClick={() => setIsOpen(false)}
                className="cursor-pointer text-gray-300 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-semiboald transition-all"
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
