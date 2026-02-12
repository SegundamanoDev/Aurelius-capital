import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt2, HiX } from "react-icons/hi";
import { RiCopperCoinLine } from "react-icons/ri";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (nav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [nav]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { name: "Portfolios", path: "/portfolio" },
    { name: "Copy Trading", path: "/copy-trading" },
    { name: "Academy", path: "/academy" },
    { name: "Insurance", path: "/insurance" },
    { name: "AML Policy", path: "/aml-policy" },
    { name: "FAQs", path: "/faqs" },
    { name: "Company", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* 1. MAIN NAVIGATION BAR */}
      <nav
        className={`fixed w-full z-[100] transition-all duration-500 ${
          scrolled || nav
            ? "bg-[#05070A]/90 backdrop-blur-lg border-b border-white/5 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group z-[110]">
            <div className="bg-sky-500 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <RiCopperCoinLine className="text-white text-2xl" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase italic">
              Aurelius
            </span>
          </Link>

          {/* Toggle Button */}
          <button
            onClick={() => setNav(!nav)}
            className="text-white z-[110] p-2 hover:bg-white/5 rounded-full transition-all"
          >
            {nav ? (
              <HiX size={30} className="text-sky-500" />
            ) : (
              <HiMenuAlt2 size={30} />
            )}
          </button>
        </div>
      </nav>

      {/* 2. BACKDROP OVERLAY (Closes Menu on Click) */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-md z-[101] transition-opacity duration-500 ${
          nav
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setNav(false)}
      />

      {/* 3. SIDEBAR DRAWER */}
      <aside
        className={`fixed top-0 left-0 h-screen w-full md:w-[450px] bg-[#05070A] border-r border-white/5 z-[102] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          nav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Close Icon (Inside Drawer) */}
        <div className="absolute top-6 right-6 md:hidden">
          <button
            onClick={() => setNav(false)}
            className="text-white p-2 bg-white/5 rounded-full"
          >
            <HiX size={24} />
          </button>
        </div>

        <div className="flex flex-col h-full p-8 md:p-10 pt-24 md:pt-32">
          <p className="text-[10px] font-black text-sky-500 uppercase tracking-[0.4em] mb-10">
            Navigation Protocol
          </p>

          <ul className="space-y-4 overflow-y-auto no-scrollbar pb-10">
            {links.map((link, i) => (
              <li
                key={link.name}
                style={{ transitionDelay: `${nav ? i * 50 + 200 : 0}ms` }}
                className={`transform transition-all duration-700 ${
                  nav
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-10 opacity-0"
                }`}
              >
                <Link
                  to={link.path}
                  onClick={() => setNav(false)}
                  className="text-3xl md:text-4xl font-black text-white/40 hover:text-white hover:italic transition-all flex items-center gap-4 group"
                >
                  <span className="text-xs font-mono text-sky-500/40 group-hover:text-sky-500 italic">
                    0{i + 1}
                  </span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Sidebar Footer */}
          <div
            className={`mt-auto pt-10 border-t border-white/5 transition-all duration-700 delay-500 ${
              nav ? "opacity-100" : "opacity-0"
            }`}
          >
            <Link
              to="/register"
              onClick={() => setNav(false)}
              className="block w-full bg-white text-black py-5 rounded-2xl text-center font-black uppercase text-xs tracking-widest hover:bg-sky-500 transition-all shadow-xl shadow-white/5"
            >
              Start Trading Now
            </Link>
            <div className="mt-6 flex justify-between text-[9px] font-black text-gray-600 uppercase tracking-widest">
              <span>V3.0 ALPHA PROTOCOL</span>
              <span>© 2026</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
