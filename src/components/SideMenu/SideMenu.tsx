import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { Folder, Groups2, Login, Logout, Tune } from "@mui/icons-material";
import Logo from "../Logo";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import { useAuthContext } from "../../containers/AuthProvider";
import NavButton from "../MenuButton/NavButton";
import { MenuButton } from "../MenuButton/MenuButton";

// const SIDE_MENU_PORTAL_ID = "side_menu_portal";
const SideMenu = () => {
  const { logout, user, isAuthCheckedOnLoad } = useAuthContext();

  return (
    <Paper style={{ display: "flex", borderRadius: 0 }}>
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
            <NavButton name="Kontakt" path="/contacts" Icon={Folder} />
            {!!user && (
              <>
                <NavButton name="Témakörök" path="/topics" Icon={Groups2} />
                <NavButton name="Csoportok" path="/groups" Icon={Groups2} />
              </>
            )}
          </List>
          <Divider />
          <List id="side_menu_portal" style={{ flex: 1 }} />
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
