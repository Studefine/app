import * as React from "react";
import { MouseEventHandler } from "react";
import { useTheme } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { SvgIconComponent } from "@mui/icons-material";

export interface MenuButtonProps {
  name: string;
  Icon: SvgIconComponent;
  onClick?: MouseEventHandler<any> | undefined;
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  name,
  Icon,
  onClick,
}) => {
  const { spacing } = useTheme();

  return (
    <ListItemButton onClick={onClick} sx={{ gap: 3, borderRadius: spacing(2) }}>
      <ListItemIcon sx={{ minWidth: 0 }}>
        <Icon sx={{ width: spacing(6), height: spacing(6) }} />
      </ListItemIcon>
      <ListItemText primary={name} sx={{ m: 0 }} />
    </ListItemButton>
  );
};
