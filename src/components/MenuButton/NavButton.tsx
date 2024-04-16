import * as React from "react";
import { MenuButton, MenuButtonProps } from "./MenuButton";
import { useNavigate } from "react-router-dom";
import { To } from "@remix-run/router/history";

export interface NavigationButtonProps
  extends Omit<MenuButtonProps, "onClick"> {
  path: To;
}

const NavButton: React.FC<NavigationButtonProps> = ({
  name,
  Icon,
  path,
  ...rest
}) => {
  const navigate = useNavigate();

  return (
    <MenuButton
      name={name}
      Icon={Icon}
      {...rest}
      onClick={() => navigate(path)}
    />
  );
};

export default NavButton;
