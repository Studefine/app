import * as React from "react";
import { CircularProgress, useTheme } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { SvgIconComponent } from "@mui/icons-material";
import { ListItemButtonProps } from "@mui/material/ListItemButton/ListItemButton";

export interface MenuButtonProps extends ListItemButtonProps {
  name: string;
  Icon: SvgIconComponent;
  isLoading?: boolean;
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  name,
  Icon,
  onClick,
  isLoading,
  ...rest
}) => {
  const { spacing } = useTheme();

  return (
    <ListItemButton
      onClick={onClick}
      sx={{ gap: 3, borderRadius: spacing(2) }}
      {...rest}
    >
      <ListItemIcon sx={{ minWidth: 0 }}>
        {isLoading ? (
          <CircularProgress color="secondary" size={24} />
        ) : (
          <Icon sx={{ width: spacing(6), height: spacing(6) }} />
        )}
      </ListItemIcon>
      <ListItemText primary={name} sx={{ m: 0 }} />
    </ListItemButton>
  );
};
