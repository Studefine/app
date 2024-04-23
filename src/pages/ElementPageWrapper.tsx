import React from "react";
import { BreadcrumbsLine } from "../components/BreadcrumbsLine/BreadcrumbsLine";
import { Outlet, useParams } from "react-router-dom";
import { Stack, useTheme } from "@mui/material";
import List from "@mui/material/List";
import { portalIds } from "../types/portalIds";
import Box from "@mui/material/Box";

const ElementPageWrapper = () => {
  const params = useParams();
  const { spacing, palette } = useTheme();

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        position="fixed"
        width={{xs:"100%",sm:"calc(100% - 200px)"}}
        height={spacing(11)}
        zIndex={1}
        bgcolor={palette.background.default}
        paddingX={3}
      >
        <BreadcrumbsLine id={params.id} />
        <List
          id={portalIds.breadcrumbsRight}
          sx={{
            alignContent: "center",
            paddingTop: 0,
            paddingBottom: 0,
          }}
        />
      </Stack>
      <Box paddingTop={11} paddingX={3}>
        <Outlet />
      </Box>
    </>
  );
};

export default ElementPageWrapper;
