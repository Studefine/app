import * as React from "react";
import { FC } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import {
  ContactSupport,
  Groups2,
  Login,
  Logout,
  Tune,
} from "@mui/icons-material";
import Logo from "../Logo";
import Box from "@mui/material/Box";
import { useAuthContext } from "../../containers/AuthProvider";
import NavButton from "../MenuButton/NavButton";
import { MenuButton } from "../MenuButton/MenuButton";
import { portalIds } from "../../types/portalIds";
import Paper from "@mui/material/Paper";

interface ISideMenuProps {
  displayLogo?: boolean;
}

const SideMenu: FC<ISideMenuProps> = ({ displayLogo = false }) => {
  const { logout, user, isAuthCheckedOnLoad } = useAuthContext();

  return (
    <Paper style={{ display: "flex", borderRadius: 0, height: "inherit" }}>
      <Box
        paddingY={4}
        display="flex"
        height="inherit"
        width="100%"
        alignItems="center"
        flexDirection="column"
        gap={8}
      >
        {displayLogo && <Logo />}
        <Box display="flex" flexDirection="column" gap={3} flex={1}>
          <List>
            <NavButton name="Kontakt" path="/contacts" Icon={ContactSupport} />
            {!!user && (
              <>
                <NavButton name="Témakörök" path="/topics" Icon={Groups2} />
                <NavButton name="Csoportok" path="/groups" Icon={Groups2} />
              </>
            )}
          </List>
          <Divider />
          <List id={portalIds.sideMenu} style={{ flex: 1 }} />
          <Divider />
          <List>
            <NavButton name="Beállítások" path="/settings" Icon={Tune} />
            {!!user ? (
              <MenuButton name="Kijelentkezés" onClick={logout} Icon={Logout} />
            ) : (
              <NavButton
                name="Bejelentkezés"
                path="/login"
                Icon={Login}
                isLoading={!isAuthCheckedOnLoad}
                disabled={!isAuthCheckedOnLoad}
              />
            )}
          </List>
        </Box>
      </Box>
    </Paper>
  );
};

export default SideMenu;
