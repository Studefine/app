import * as React from "react";
import ListItem from "@mui/material/ListItem";
import { MenuButton, MenuButtonProps } from "./MenuButton";
import { useNavigate } from "react-router-dom";

export interface NavigationButtonProps
  extends Omit<MenuButtonProps, "onClick"> {
  path: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  name,
  Icon,
  path,
}) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(path);
  };

  return (
    <ListItem disablePadding>
      <MenuButton name={name} Icon={Icon} onClick={handleNavigate} />
    </ListItem>
  );
};

export default NavigationButton;
