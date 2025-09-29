import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link as RouterLink, useLocation } from "react-router-dom";
import dscLogo from "../assets/DSC-logo.png";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext, LanguageContext } from "../context/AppContext";
import TranslateIcon from "@mui/icons-material/Translate";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { t } from "../i18n";

const NavBar = () => {
  const { pathname } = useLocation();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const { language, setLanguage } = React.useContext(LanguageContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleLangClick = (event) => setAnchorEl(event.currentTarget);
  const handleLangClose = () => setAnchorEl(null);
  const chooseLang = (lng) => {
    setLanguage(lng);
    handleLangClose();
  };
  return (
    <AppBar position="static">
      <Toolbar sx={{ minHeight: 150 }}>
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "inherit",
            textDecoration: "none",
            flexGrow: 1,
          }}
        >
          <AccountBalanceWalletIcon fontSize="large" sx={{ mr: 1 }} />
          <Typography variant="h5">{t(language, "title")}</Typography>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            sx={
              pathname === "/"
                ? { color: "rgb(21, 86, 78)", fontWeight: 600 }
                : undefined
            }
          >
            {t(language, "home")}
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/add"
            sx={
              pathname === "/add"
                ? { color: "rgb(21, 86, 78)", fontWeight: 600 }
                : undefined
            }
          >
            {t(language, "addExpense")}
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/stats"
            sx={
              pathname === "/stats"
                ? { color: "rgb(21, 86, 78)", fontWeight: 600 }
                : undefined
            }
          >
            {t(language, "statistics")}
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/invest"
            sx={
              pathname === "/invest"
                ? { color: "rgb(21, 86, 78)", fontWeight: 600 }
                : undefined
            }
          >
            {language === "ar"
              ? "الاستثمارات"
              : language === "fr"
              ? "Investissements"
              : "Investments"}
          </Button>
          <Tooltip
            title={theme.palette.mode === "dark" ? "Light mode" : "Dark mode"}
          >
            <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Language">
            <IconButton color="inherit" onClick={handleLangClick}>
              <TranslateIcon />
            </IconButton>
          </Tooltip>
          <Menu anchorEl={anchorEl} open={open} onClose={handleLangClose}>
            <MenuItem
              selected={language === "en"}
              onClick={() => chooseLang("en")}
            >
              English
            </MenuItem>
            <MenuItem
              selected={language === "fr"}
              onClick={() => chooseLang("fr")}
            >
              Français
            </MenuItem>
            <MenuItem
              selected={language === "ar"}
              onClick={() => chooseLang("ar")}
            >
              العربية
            </MenuItem>
          </Menu>
          <Tooltip title="Visit Data Science Club" placement="bottom">
            <Box
              component="a"
              href="https://datascienceclubusthb.netlify.app/?fbclid=PAZXh0bgNhZW0CMTEAAaceCJ5_N3asSDxjjvTZacj9w0tVgb3AJTfkvqVVw_KDmnYOnNtUUCkkMfF9Lw_aem_av1Gw0SfwuR81wCdsh3aVQ"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: "inline-flex", alignItems: "center" }}
            >
              <Box
                component="img"
                src={dscLogo}
                alt="DSC Collaboration"
                sx={{
                  height: 80,
                  ml: 2,
                  borderRadius: 0.5,
                  p: 0.5,
                }}
              />
            </Box>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
