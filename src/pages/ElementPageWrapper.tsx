import React from "react";
import { BreadcrumbsLine } from "../components/BreadcrumbsLine/BreadcrumbsLine";
import { Outlet, useParams } from "react-router-dom";
import { Stack } from "@mui/material";
import List from "@mui/material/List";
import { portalIds } from "../types/portalIds";

const ElementPageWrapper = () => {
  const params = useParams();

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
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
      <div style={{ padding: 0, margin: 0, height: "calc(100% - 48px)" }}>
        <Outlet />
      </div>
    </>
  );
};

export default ElementPageWrapper;
