import React from "react";
import SideMenu from "../components/SideMenu/SideMenu";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { Container, Stack } from "@mui/material";
import { GlobalProgressbar } from "../containers/GlobalProgressbarProvider";

const Layout = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} component="main">
      <GlobalProgressbar />
      <Stack direction="row" height={"100vh"}>
        <SideMenu />
        <Container fixed sx={{ overflow: "hidden", height: "100%" }}>
          <Outlet />
        </Container>
      </Stack>
    </Box>
  );
};

export default Layout;
