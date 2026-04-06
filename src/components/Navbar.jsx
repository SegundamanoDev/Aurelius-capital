import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  HiMenuAlt2,
  HiX,
  HiChevronDown,
  HiSun,
  HiMoon,
  HiGlobeAlt,
  HiSearch,
} from "react-icons/hi";
import { setLanguage, getSelectedLanguage } from "../utils/translate";
import { useDarkMode } from "../utils/useDarkMode";

const Navbar = () => {
  const [colorTheme, setTheme] = useDarkMode();
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const currentLang = getSelectedLanguage();

  const languages = [
    { name: "English", code: "en", flag: "🇺🇸" },
    { name: "Español", code: "es", flag: "🇪🇸" },
    { name: "Français", code: "fr", flag: "🇫🇷" },
    { name: "Deutsch", code: "de", flag: "🇩🇪" },
    { name: "Italiano", code: "it", flag: "🇮🇹" },
    { name: "Slovenščina", code: "sl", flag: "🇸🇮" },
    { name: "Slovenčina", code: "sk", flag: "🇸🇰" },
    { name: "Română", code: "ro", flag: "🇷🇴" },
    { name: "Polski", code: "pl", flag: "🇵🇱" },
    { name: "Português", code: "pt", flag: "🇵🇹" },
    { name: "Afrikaans", code: "af", flag: "🇿🇦" },
    { name: "Shqip", code: "sq", flag: "🇦🇱" },
    { name: "العربية", code: "ar", flag: "🇸🇦" },
    { name: "Հայերեն", code: "hy", flag: "🇦🇲" },
    { name: "Azərbaycan", code: "az", flag: "🇦🇿" },
    { name: "Euskara", code: "eu", flag: "🇪🇸" },
    { name: "Беларуская", code: "be", flag: "🇧🇾" },
    { name: "বাংলা", code: "bn", flag: "🇧🇩" },
    { name: "Bosanski", code: "bs", flag: "🇧🇦" },
    { name: "Български", code: "bg", flag: "🇧🇬" },
    { name: "Català", code: "ca", flag: "🇪🇸" },
    { name: "中文 (简体)", code: "zh-CN", flag: "🇨🇳" },
    { name: "中文 (繁體)", code: "zh-TW", flag: "🇭🇰" },
    { name: "Hrvatski", code: "hr", flag: "🇭🇷" },
    { name: "Čeština", code: "cs", flag: "🇨🇿" },
    { name: "Dansk", code: "da", flag: "🇩🇰" },
    { name: "Nederlands", code: "nl", flag: "🇳🇱" },
    { name: "Eesti", code: "et", flag: "🇪🇪" },
    { name: "Filipino", code: "tl", flag: "🇵🇭" },
    { name: "Suomi", code: "fi", flag: "🇫🇮" },
    { name: "Galego", code: "gl", flag: "🇪🇸" },
    { name: "ქართული", code: "ka", flag: "🇬🇪" },
    { name: "Ελληνικά", code: "el", flag: "🇬🇷" },
    { name: "ગુજરાતી", code: "gu", flag: "🇮🇳" },
    { name: "עברית", code: "iw", flag: "🇮🇱" },
    { name: "हिन्दी", code: "hi", flag: "🇮🇳" },
    { name: "Magyar", code: "hu", flag: "🇭🇺" },
    { name: "Íslenska", code: "is", flag: "🇮🇸" },
    { name: "Bahasa Indonesia", code: "id", flag: "🇮🇩" },
    { name: "日本語", code: "ja", flag: "🇯🇵" },
    { name: "ಕನ್ನಡ", code: "kn", flag: "🇮🇳" },
    { name: "Қазақ тілі", code: "kk", flag: "🇰🇿" },
    { name: "한국어", code: "ko", flag: "🇰🇷" },
    { name: "Latviešu", code: "lv", flag: "🇱🇻" },
    { name: "Lietuvių", code: "lt", flag: "🇱🇹" },
    { name: "Македонски", code: "mk", flag: "🇲🇰" },
    { name: "Bahasa Melayu", code: "ms", flag: "🇲🇾" },
    { name: "മലയാളം", code: "ml", flag: "🇮🇳" },
    { name: "मराठी", code: "mr", flag: "🇮🇳" },
    { name: "Norsk", code: "no", flag: "🇳🇴" },
    { name: "فارسی", code: "fa", flag: "🇮🇷" },
    { name: "ਪੰਜਾਬੀ", code: "pa", flag: "🇮🇳" },
    { name: "Русский", code: "ru", flag: "🇷🇺" },
    { name: "Српски", code: "sr", flag: "🇷🇸" },
    { name: "Svenska", code: "sv", flag: "🇸🇪" },
    { name: "தமிழ்", code: "ta", flag: "🇮🇳" },
    { name: "తెలుగు", code: "te", flag: "🇮🇳" },
    { name: "ไทย", code: "th", flag: "🇹🇭" },
    { name: "Türkçe", code: "tr", flag: "🇹🇷" },
    { name: "Українська", code: "uk", flag: "🇺🇦" },
    { name: "اردو", code: "ur", flag: "🇵🇰" },
    { name: "Tiếng Việt", code: "vi", flag: "🇻🇳" },
  ];

  // Logic: Filter languages based on search input
  const filteredLanguages = languages.filter((lang) =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLangOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = nav ? "hidden" : "unset";
  }, [nav]);

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
      <nav
        className={`fixed w-full z-[120] transition-all duration-500 ease-in-out ${
          scrolled || nav
            ? "py-3 bg-white/90 dark:bg-[#05070A]/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/5"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex justify-between items-center">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group z-[110]">
            <div className="w-10 h-10 bg-sky-600 rounded-lg flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-xl italic">A</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white uppercase italic">
              Aurelius
            </span>
          </Link>

          {/* DESKTOP LINKS (Truncated for space) */}
          <ul className="hidden xl:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 hover:text-sky-500 dark:hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* CONTROLS */}
          <div className="flex items-center gap-2 sm:gap-4 z-[130]">
            {/* Desktop Language Selector */}
            <div className="relative hidden md:block" ref={dropdownRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-all border border-transparent dark:border-white/5"
              >
                <span className="text-sm">
                  {languages.find((l) => l.code === currentLang)?.flag || "🌐"}
                </span>
                <HiChevronDown
                  size={12}
                  className={`text-gray-400 transition-transform ${langOpen ? "rotate-180" : ""}`}
                />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-4 w-64 bg-white dark:bg-[#0A0C10] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                  {/* SEARCH INPUT */}
                  <div className="p-3 border-b border-gray-100 dark:border-white/5">
                    <div className="relative">
                      <HiSearch
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={14}
                      />
                      <input
                        autoFocus
                        type="text"
                        placeholder="Search country..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-xl py-2 pl-9 pr-4 text-[11px] font-medium outline-none text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-1 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div className="max-h-64 overflow-y-auto py-2 custom-scrollbar">
                    {filteredLanguages.length > 0 ? (
                      filteredLanguages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setLangOpen(false);
                            setSearchTerm("");
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-sky-500/10 transition-colors ${currentLang === lang.code ? "text-sky-500 bg-sky-500/5" : "text-gray-600 dark:text-gray-400"}`}
                        >
                          <span>{lang.flag}</span> {lang.name}
                        </button>
                      ))
                    ) : (
                      <div className="py-4 text-center text-[10px] text-gray-400 uppercase tracking-widest">
                        No results found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setTheme(colorTheme)}
              className="p-2.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400"
            >
              {colorTheme === "light" ? (
                <HiSun size={18} />
              ) : (
                <HiMoon size={18} className="text-sky-400" />
              )}
            </button>

            <button
              onClick={() => setNav(!nav)}
              className={`p-2.5 rounded-full transition-all lg:hidden ${nav ? "bg-sky-500 text-white" : "bg-gray-900 dark:bg-white text-white dark:text-black"}`}
            >
              {nav ? <HiX size={20} /> : <HiMenuAlt2 size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <aside
        className={`fixed inset-0 z-[115] bg-white dark:bg-[#05070A] transition-transform duration-[800ms] cubic-bezier(0.85, 0, 0.15, 1) ${
          nav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="h-full flex flex-col px-8 pt-28 pb-10 max-w-lg mx-auto">
          {/* MOBILE SEARCH & LANGUAGE */}
          <div
            className={`mb-10 transition-all duration-700 delay-100 ${nav ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400 flex items-center gap-2">
                <HiGlobeAlt /> Language
              </p>
              <div className="relative flex-1 max-w-[160px] ml-4">
                <HiSearch
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={12}
                />
                <input
                  type="text"
                  placeholder="SEARCH..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-lg py-1.5 pl-8 pr-4 text-[9px] font-bold tracking-widest outline-none text-gray-900 dark:text-white focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {filteredLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setSearchTerm("");
                  }}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${
                    currentLang === lang.code
                      ? "bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-500/20"
                      : "border-gray-100 dark:border-white/5 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {lang.flag} {lang.name}
                </button>
              ))}
              {filteredLanguages.length === 0 && (
                <span className="text-[9px] text-gray-400 uppercase italic py-2">
                  No results
                </span>
              )}
            </div>
          </div>

          <nav className="flex flex-col space-y-4 overflow-y-auto custom-scrollbar flex-1 pr-2">
            {links.map((link, i) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setNav(false)}
                style={{ transitionDelay: `${i * 60 + 200}ms` }}
                className={`flex items-baseline gap-4 group transition-all duration-700 ${nav ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
              >
                <span className="text-[10px] font-mono text-gray-400 dark:text-gray-600">
                  0{i + 1}
                </span>
                <span className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white uppercase group-hover:italic group-hover:text-sky-500 transition-all">
                  {link.name}
                </span>
              </Link>
            ))}
          </nav>

          <div
            className={`mt-auto pt-6 space-y-6 transition-all duration-1000 delay-400 ${nav ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/login"
                onClick={() => setNav(false)}
                className="flex items-center justify-center py-4 border border-gray-200 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setNav(false)}
                className="flex items-center justify-center py-4 bg-sky-600 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-sky-500 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
