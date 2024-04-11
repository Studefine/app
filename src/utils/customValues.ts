import { createTheme } from "@mui/material";

export const customTheme = createTheme({
  palette: {
    background: {
      default: "#191919",
      paper: "#191919",
    },
    text: { primary: "#ffffff" },
    primary: { main: "#AED581" },
    secondary: { main: "#af72ff" },
    info: { main: "#75c0ff" },
    warning: { main: "#ffa500" },
    error: { main: "#e74c3c" },
    mode: "dark",
  },
  spacing: 4,
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});
