import "intl-pluralrules";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your language resources
import enTranslations from "./locales/en.json";
import trTranslations from "./locales/tr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    tr: { translation: trTranslations },
  },
  lng: "en", // Set the default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: "v3", // Add this line
});

export default i18n;
