import React from "react";
import { IBreadCrumb } from "../types/types";
import { Button, useTheme } from "@mui/material";

export const Breadcrumb: React.FC<
  IBreadCrumb & { onClick: () => void; disabled?: boolean }
> = ({ name, type = "TOPIC", onClick, disabled = false }) => {
  const { palette, spacing } = useTheme();

  return (
    <Button
      disabled={disabled}
      sx={{
        ":hover": { backgroundColor: palette.primary.light },
        textAlign: "left",
        flexShrink: 0,
        height: spacing(7),
        backgroundColor: type === "PHRASE" ? "black" : "white",
        color: type === "PHRASE" ? "white" : "black",
        fontWeight: "bold",
        minWidth: spacing(7),
        padding: (theme) => `0 ${theme.spacing(2)}`,
        borderRadius: 3,
        border: `${type !== "TOPIC" ? spacing(0.5) : 0} solid ${type === "GROUP" ? palette.info.main : "white"}`,
      }}
      onClick={onClick}
    >
      {name}
    </Button>
  );
};
