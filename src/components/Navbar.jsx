import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt2, HiX, HiChevronDown, HiSun, HiMoon } from "react-icons/hi";
import { setLanguage, getSelectedLanguage } from "../utils/translate";
import { useDarkMode } from "../utils/useDarkMode";

const Navbar = () => {
  const [colorTheme, setTheme] = useDarkMode();
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      <nav
        className={`fixed w-full z-[100] transition-all duration-500 ${
          scrolled || nav
            ? "bg-white dark:bg-[#05070A]/90 backdrop-blur-lg border-b border-gray-100 dark:border-white/5 py-4 shadow-sm dark:shadow-none"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group z-[110]">
            <div className="w-10 h-10 bg-sky-600 rounded-lg flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-xl italic">A</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white uppercase italic">
              Aurelius
            </span>
          </Link>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4 z-[110]">
            <button
              onClick={() => setTheme(colorTheme)}
              className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-yellow-400 hover:scale-110 transition-all"
            >
              {colorTheme === "light" ? (
                <HiSun size={20} />
              ) : (
                <HiMoon size={20} className="text-sky-400" />
              )}
            </button>

            {/* Language Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-3 py-1.5 rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition-all text-gray-900 dark:text-white text-[10px] font-bold uppercase tracking-widest"
              >
                <span className="text-sm">
                  {languages.find((l) => l.code === currentLang)?.flag || "🌐"}
                </span>
                <span className="hidden sm:inline">{currentLang}</span>
                <HiChevronDown
                  className={`transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`}
                />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-[#05070A] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 backdrop-blur-xl">
                  <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left text-[10px] font-bold tracking-widest uppercase transition-colors hover:bg-sky-500/10 ${
                          currentLang === lang.code
                            ? "text-sky-500 bg-sky-500/5"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Menu Toggle */}
            <button
              onClick={() => setNav(!nav)}
              className="text-gray-900 dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-all"
            >
              {nav ? (
                <HiX size={30} className="text-sky-500" />
              ) : (
                <HiMenuAlt2 size={30} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md z-[101] transition-opacity duration-500 ${
          nav
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setNav(false)}
      />

      <aside
        className={`fixed top-0 left-0 h-screen w-full md:w-[450px] bg-white dark:bg-[#0a0c10] text-gray-900 dark:text-white border-r border-gray-200 dark:border-white/10 z-[102] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          nav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-8 md:p-10 pt-24 md:pt-28">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-gray-500 dark:text-gray-400">
            Navigation Protocol
          </p>

          <ul className="space-y-4 overflow-y-auto no-scrollbar pb-10 flex-grow">
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
                  className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 hover:italic transition-all flex items-center gap-4 group"
                >
                  <span className="text-xs font-mono text-sky-500/40 group-hover:text-sky-500 italic">
                    0{i + 1}
                  </span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div
            className={`mt-auto pt-6 border-t border-gray-100 dark:border-white/5 transition-all duration-700 delay-500 ${
              nav ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* FIXED SIGN UP BUTTON */}
            <Link
              to="/register"
              onClick={() => setNav(false)}
              className="block text-center w-full md:w-auto px-12 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 active:scale-95"
            >
              Start Trading Now
            </Link>

            <div className="mt-6 flex justify-between text-[9px] font-black text-gray-500 dark:text-gray-600 uppercase tracking-widest">
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
