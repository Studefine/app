import { createTheme } from "@mui/material";

const spacing = 4;
const backgroundColor = "#191919";
const primaryColor = "#d7ff72";

export const customTheme = createTheme({
  components: {
    MuiCheckbox: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        indeterminate: {},
        root: {
          padding: 0,
          "& path": {
            transition: "color .3s",
          },
          ":hover": {
            "& path": {
              color: `${primaryColor}`,
            },
          },
        },
      },
    },
    MuiLink: {
      defaultProps: {
        fontSize: "small",
        component: "button",
        underline: "hover",
      },
    },
    MuiDivider: {
      styleOverrides: { wrapper: { fontSize: "x-small" } },
    },
    MuiButton: {},
    MuiInput: {
      defaultProps: { size: "small" },
    },
    MuiInputBase: {
      defaultProps: {
        sx: { backgroundColor: backgroundColor },
      },
    },
  },
  palette: {
    background: {
      default: "#191919",
      paper: "#191919",
    },
    text: { primary: "#ffffff" },
    primary: { main: "#c190ff" },
    secondary: { main: "#e1ff95" },
    success: { main: "#72ff7e" },
    info: { main: "#75c0ff" },
    warning: { main: "#ffa500" },
    error: { main: "#e74c3c" },
    mode: "dark",
  },
  spacing: spacing,
  shape: { borderRadius: spacing * 2 },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});
