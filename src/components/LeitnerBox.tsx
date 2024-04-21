import React from "react";
import { Paper, Typography, useTheme } from "@mui/material";
import { darken } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { LeitnerLevel } from "../types/types";

interface LeitnerBoxProps {
  level: LeitnerLevel;
  size?: "small" | "medium";
  count?: number;
}

export const LeitnerBox: React.FC<LeitnerBoxProps> = ({
  size = "medium",
  level,
  count,
}) => {
  const { palette } = useTheme();
  const colors = {
    color: palette.text.primary,
    backgroundColor:
      level === 0
        ? darken(purple.A700, 0.85)
        : level === 1
          ? darken(purple.A700, 0.75)
          : level === 2
            ? darken(purple.A700, 0.55)
            : level === 3
              ? darken(purple.A700, 0.3)
              : darken(purple.A700, 0),
  };

  return (
    <Paper
      sx={{
        height: size === "small" ? 20 : 40,
        width: size === "small" ? 20 : 40,
        alignContent: "center",
        textAlign: "center",
        backgroundColor: colors.backgroundColor,
        border: `1px solid ${purple["A700"]}`,
        color: colors.color,
        ...(size === "small" ? { borderRadius: .5 } : {}),
      }}
    >
      <Typography
        variant={size === "small" ? "overline" : "subtitle1"}
        fontWeight={size === "small" ? "lighter" : "bolder"}
      >
        {count ?? level}
      </Typography>
    </Paper>
  );
};
