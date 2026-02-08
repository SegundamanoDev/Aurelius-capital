import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { RiCopperCoinLine } from "react-icons/ri"; // Example Logo Icon

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { name: "Portfolios", path: "/portfolio" },
    { name: "Academy", path: "/academy" },
    { name: "Company", path: "/about" },
  ];

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-500 ${scrolled ? "bg-[#05070A]/90 backdrop-blur-lg border-b border-white/5 py-3" : "bg-transparent py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-sky-500 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <RiCopperCoinLine className="text-white text-2xl" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase">
            Aurelius
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-10">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className="text-sm font-medium text-gray-400 hover:text-sky-400 transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <Link
            to="/register"
            className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-sky-400 hover:text-white transition-all"
          >
            Get Started
          </Link>
        </ul>

        {/* Mobile Menu Button */}
        <div
          className="md:hidden text-white z-[110]"
          onClick={() => setNav(!nav)}
        >
          {nav ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
        </div>
      </div>

      {/* Mobile Menu - Top to Bottom Slide */}
      <div
        className={`fixed top-0 left-0 w-full bg-[#05070A] transition-all duration-500 ease-in-out z-[105] flex flex-col items-center justify-center overflow-hidden ${nav ? "h-screen opacity-100" : "h-0 opacity-0"}`}
      >
        <ul className="flex flex-col items-center space-y-8">
          {links.map((link) => (
            <li
              key={link.name}
              className={`transform transition-all duration-700 delay-150 ${nav ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <Link
                to={link.path}
                onClick={() => setNav(false)}
                className="text-4xl font-semibold text-white hover:text-sky-500"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li
            className={`pt-6 transform transition-all duration-700 delay-300 ${nav ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <button className="bg-sky-500 text-white px-12 py-4 rounded-full text-xl font-bold">
              Join Aurelius
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
