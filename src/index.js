import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext, LanguageContext } from "./context/AppContext";

function getDesignTokens(mode) {
  return {
    palette: {
      mode,
      primary: {
        main: "#22b3a6",
        light: "#5ee0d1",
        dark: "#1a8c83",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#14b8a6",
        light: "#6ee7d2",
        dark: "#0e8a7b",
        contrastText: "#0b1b28",
      },
      background:
        mode === "light"
          ? {
              default: "#e0f2f1",
              paper: "#ffffff",
            }
          : {
              default: "#0f172a",
              paper: "#111827",
            },
      text:
        mode === "light"
          ? {
              primary: "#111827",
              secondary: "#374151",
            }
          : {
              primary: "#e5e7eb",
              secondary: "#cbd5e1",
            },
    },
  };
}

const CssVarsController = () => {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );
  const [language, setLanguage] = React.useState("en");
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </LanguageContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CssVarsController />
    </BrowserRouter>
  </React.StrictMode>
);
