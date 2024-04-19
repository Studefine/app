import React from "react";
import { IBreadCrumb } from "../types/types";
import { Button, useTheme } from "@mui/material";

export const Breadcrumb: React.FC<
  IBreadCrumb & { onClick: () => void; disabled?: boolean }
> = ({ name, type = "TOPIC", onClick, disabled=false }) => {
  const { palette, spacing } = useTheme();
  return (
    <Button
      disabled={disabled}
      sx={{
        ":hover": { backgroundColor: palette.primary.light },
        display: "flex",
        textAlign: "left",
        backgroundColor: "white",
        fontWeight: "bold",
        minWidth: spacing(6),
        color: "black",
        padding: (theme) => `0 ${theme.spacing(2)}`,
        borderRadius: 3,
      }}
      onClick={onClick}
    >
      {name}
    </Button>
  );
};
