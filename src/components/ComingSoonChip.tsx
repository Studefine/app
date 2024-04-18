import { Chip, Typography, useTheme } from "@mui/material";
import React from "react";

export const ComingSoonChip = () => {
  const { palette } = useTheme();
  return (
    <Chip
      sx={{
        border: 0,
        ".MuiChip-label": {
          padding: "0 5px",
        },
        height: 20,
        boxShadow: `0 0 1px ${palette.info.main}, 0 0 2px ${palette.info.main}, 0 0 3px ${palette.info.main}, 0 0 10px ${palette.info.main}`,
      }}
      label={
        <Typography
          fontSize="x-small"
          sx={{
            textShadow: `0 0 3px black`,
          }}
        >
          Hamarosan
        </Typography>
      }
      size="small"
      variant="outlined"
      onClick={() => {}}
      color="info"
    />
  );
};
