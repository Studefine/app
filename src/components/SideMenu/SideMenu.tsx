import * as React from "react";
import { useMemo } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { Folder, Groups2, Logout, Tune } from "@mui/icons-material";
import Logo from "../Logo";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import NavigationButton, { NavigationButtonProps } from "../MenuButton/NavigationButton";
import { MenuButton, MenuButtonProps } from "../MenuButton/MenuButton";
import { useAuthContext } from "../../containers/AuthProvider";

export interface NavigationButtons {
  top: NavigationButtonProps[];
  bottom: (NavigationButtonProps | MenuButtonProps)[];
}

const SideMenu = () => {
  const { logout, login, user } = useAuthContext();

  const navigationButtons: NavigationButtons = useMemo(
    () => ({
      top: [
        { name: "Témakörök", path: "/topics", Icon: Folder },
        { name: "Csoportok", path: "/groups", Icon: Groups2 },
      ],
      bottom: [
        { name: "Beállítások", path: "/settings", Icon: Tune },
        { name: "Kijelentkezés", onClick: logout, Icon: Logout },
      ],
    }),
    [],
  );

  return (
    <Paper style={{ display: "flex" }}>
      <Box
        padding={5}
        display="flex"
        flexDirection="column"
        gap={8}
        height={"auto"}
      >
        <Logo />
        <Box display="flex" flexDirection="column" gap={3} flex={1}>
          <List>
            {navigationButtons.top.map(({ name, Icon, path }, index) => (
              <NavigationButton
                key={name}
                name={name}
                Icon={Icon}
                path={path}
              />
            ))}
          </List>
          <Divider />
          <List id="side_menu_portal" style={{ flex: 1 }} />
          <Divider />
          <List>
            {navigationButtons.bottom.map((buttonProps, index) =>
              "path" in buttonProps ? (
                <NavigationButton key={buttonProps.name} {...buttonProps} />
              ) : (
                <MenuButton key={buttonProps.name} {...buttonProps} />
              ),
            )}
          </List>
        </Box>
      </Box>
    </Paper>
  );
};

export default SideMenu;
