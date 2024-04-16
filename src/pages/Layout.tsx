import React from "react";
import SideMenu from "../components/SideMenu/SideMenu";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

const Layout = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      component="main"
      height={"100vh"}
    >
      <SideMenu />
      <Container fixed>
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
