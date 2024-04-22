import { GlobalStyles, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

export const GlobalCustomStyle = () => {
  const { spacing, palette } = useTheme();

  return (
    <GlobalStyles
      styles={{
        ".markdown-card": { marginTop: 0, fontSize: "75%" },
        ".markdown-card p": {
          marginTop: 0,
        },
        ".markdown-card a": {
          color: palette.info.main,
        },
        ".markdown a": {
          color: palette.info.main,
        },
        ".markdown": {
            height: "100%",
        },
        ".markdown, .markdown-card": {
          overflow: "auto",
        },

        ".markdown-scroll": {
          fontSize: "75%",
          overflow: "hidden",
        },

        ".markdown75": {
          fontSize: "75%",
          overflow: "hidden",
        },

        ".markdown50": {
          fontSize: "50%",
          overflow: "hidden",
        },

        ".markdown25": {
          fontSize: "25%",
          overflow: "hidden",
        },

        "*::-webkit-scrollbar": {
          width: spacing(3),
        },
        "*::-webkit-scrollbar-track": {
          boxShadow: "none",
        },
        "*::-webkit-scrollbar-thumb": {
          border: "4px solid rgba(0, 0, 0, 0)",
          backgroundClip: "padding-box",
          borderRadius: 20,
          backgroundColor: grey[800],
        },
      }}
    />
  );
};
