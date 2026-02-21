// src/utils/translate.js

export const setLanguage = (targetLang) => {
  const hostLang = "en"; // Your site's base language
  const cookieValue = `/${hostLang}/${targetLang}`;

  // We set the cookie for both the root path and the current domain
  // This ensures Google Translate picks it up immediately
  document.cookie = `googtrans=${cookieValue}; path=/;`;
  document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname};`;

  // Reload the page to apply the translation
  window.location.reload();
};

export const getSelectedLanguage = () => {
  const match = document.cookie.match(new RegExp("(^| )googtrans=([^;]+)"));
  if (match) return match[2].split("/")[2];
  return "en";
};

/**
 * PRO TIP: Auto-detect browser language on first visit
 */
export const initAutoTranslate = () => {
  const hasSetLanguage = document.cookie.includes("googtrans");
  const browserLang = navigator.language.split("-")[0]; // e.g., 'es' or 'fr'

  // If the user hasn't chosen a language yet and their browser isn't English
  if (!hasSetLanguage && browserLang !== "en") {
    setLanguage(browserLang);
  }
};
