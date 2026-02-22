// components/ThemeToggle.js
import React from "react";
import { HiSun, HiMoon } from "react-icons/hi2";
import { useDarkMode } from "../utils/useDarkMode";

const ThemeToggle = () => {
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <button
      onClick={() => setTheme(colorTheme)}
      className="p-2 rounded-xl bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-yellow-400 transition-all hover:scale-110 active:scale-95"
    >
      {colorTheme === "light" ? (
        <HiSun size={24} />
      ) : (
        <HiMoon size={24} className="text-sky-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
