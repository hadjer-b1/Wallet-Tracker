import React from "react";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export const LanguageContext = React.createContext({
  language: "en",
  setLanguage: () => {},
});
