import React from "react";
import SideMenu from "../components/SideMenu/SideMenu";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { Container, GlobalStyles, Stack, useTheme } from "@mui/material";
import { GlobalProgressbar } from "../containers/GlobalProgressbarProvider";
import { grey } from "@mui/material/colors";
import { GlobalStylesProps as StyledGlobalStylesProps } from "@mui/system/GlobalStyles/GlobalStyles";
import { Theme } from "@mui/material/styles";

export const getScrollbarStyle = ({
  width,
  thumbColor,
}: {
  width: string;
  thumbColor: string;
}): StyledGlobalStylesProps<Theme>["styles"] => ({
  "*::-webkit-scrollbar": {
    width: width,
  },
  "*::-webkit-scrollbar-track": {
    boxShadow: "none",
  },
  "*::-webkit-scrollbar-thumb": {
    border: "4px solid rgba(0, 0, 0, 0)",
    backgroundClip: "padding-box",
    borderRadius: 20,
    backgroundColor: thumbColor,
  },
});

const Layout = () => {
  const { palette, spacing } = useTheme();

  return (
    <Box display={"flex"} flexDirection={"column"} component="main">
      <GlobalStyles
        styles={getScrollbarStyle({
          thumbColor: grey[800],
          width: spacing(3),
        })}
      />
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
