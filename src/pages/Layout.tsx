import React, { FC, PropsWithChildren, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import SideMenu from "../components/SideMenu/SideMenu";
import { Outlet } from "react-router-dom";
import { GlobalProgressbar } from "../containers/GlobalProgressbarProvider";
import { GlobalCustomStyle } from "./GlobalCustomStyle";
import { AppBar, IconButton, styled, Toolbar } from "@mui/material";
import { Menu } from "@mui/icons-material";
import Logo from "../components/Logo";

const drawerWidth = 200;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  [theme.breakpoints.down("sm")]: { marginTop: theme.spacing(14) },
}));

const TMPDrawer: FC<
  PropsWithChildren & { open: boolean; onClose: () => void }
> = ({ children, onClose, open }) => (
  <>
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
    >
      {children}
    </Drawer>
  </>
);

const SimpleDrawer: FC<PropsWithChildren> = ({ children }) => (
  <Drawer
    variant="permanent"
    sx={{
      display: { xs: "none", sm: "block" },
      "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        width: drawerWidth,
      },
    }}
    open
  >
    {children}
  </Drawer>
);

const ResponsiveDrawer = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };
  const handleDrawerOpen = () => {
    setMobileOpen(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <GlobalCustomStyle />
      <GlobalProgressbar />
      <AppBar position="fixed" sx={{ display: { sm: "none" } }}>
        <Toolbar sx={{ display: "flex" }}>
          <IconButton color="inherit" onClick={handleDrawerOpen}>
            <Menu />
          </IconButton>
          <Box justifyContent="center" display="flex" flex={1}>
            <Logo />
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <TMPDrawer open={mobileOpen} onClose={handleDrawerClose}>
          <SideMenu />
        </TMPDrawer>
        <SimpleDrawer>
          <SideMenu displayLogo />
        </SimpleDrawer>
      </Box>
      <Main>
        <Outlet />
      </Main>
    </Box>
  );
};

export default ResponsiveDrawer;
