"use no memo";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // We use a try/catch or a safe check to ensure the hook
  // doesn't crash the whole app if the context is momentarily missing
  try {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // Use instant to prevent flickering during navigation
      });
    }, [pathname]);
  } catch (e) {
    console.warn("ScrollToTop failed to access router context.");
  }

  return null;
};

export default ScrollToTop;
