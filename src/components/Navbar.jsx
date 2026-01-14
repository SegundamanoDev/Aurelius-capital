import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Section */}
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black text-[#1B4332] leading-none">
              ABRADA-BIOTECH
            </span>
            <span className="text-[9px] md:text-[10px] font-bold text-gray-500 tracking-[0.15em]">
              ENGINEERING & VENTURES
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8 font-semibold text-gray-600">
            <Link
              to="/"
              className="hover:text-[#1B4332] transition underline-offset-4 hover:underline"
            >
              Home
            </Link>
            <Link
              to="/projects"
              className="hover:text-[#1B4332] transition underline-offset-4 hover:underline"
            >
              Projects
            </Link>
            <Link
              to="/about"
              className="hover:text-[#1B4332] transition underline-offset-4 hover:underline"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#1B4332] transition underline-offset-4 hover:underline"
            >
              Contact
            </Link>
            <Link
              to="/training"
              className="bg-[#1B4332] text-white px-6 py-2 rounded-lg hover:bg-green-800 transition shadow-lg"
            >
              Training
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#1B4332] p-2 focus:outline-none transition-transform duration-300"
              style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            >
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Smooth Mobile Dropdown Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-gray-100 p-6 space-y-4 shadow-inner">
          <Link
            onClick={() => setIsOpen(false)}
            to="/"
            className="block text-lg font-semibold text-gray-700 hover:text-[#1B4332]"
          >
            Home
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/projects"
            className="block text-lg font-semibold text-gray-700 hover:text-[#1B4332]"
          >
            Projects
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/about"
            className="block text-lg font-semibold text-gray-700 hover:text-[#1B4332]"
          >
            About Us
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/contact"
            className="block text-lg font-semibold text-gray-700 hover:text-[#1B4332]"
          >
            Contact Us
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/training"
            className="block bg-[#1B4332] text-[#FFD600] p-4 rounded-xl text-center font-black tracking-widest shadow-md"
          >
            START TRAINING
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
