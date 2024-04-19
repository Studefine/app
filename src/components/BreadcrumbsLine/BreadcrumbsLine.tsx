import { IElement } from "../../types/types";
import React from "react";
import { useGetPath } from "./hooks/useGetPath";
import { Stack } from "@mui/material";
import { BreadCrumbSelect } from "../BreadCrumbSelect";
import { NavBreadCrumb } from "../NavBreadCrumb";
import Box from "@mui/material/Box";

interface BreadcrumbsLineProps {
  id?: IElement["id"];
}

export const BreadcrumbsLine: React.FC<BreadcrumbsLineProps> = ({ id }) => {
  const { data } = useGetPath(id);

  return (
    <Box
      display={"inline-block"}
      sx={{ overflowX: "scroll", width: "100%", scrollbarWidth: "none" }}
    >
      <Stack gap={4} direction="row" sx={{ textWrap: "nowrap" }}>
        <NavBreadCrumb type="TOPIC" name="/" />
        {data?.map((breadcrumbs, index) => (
          <BreadCrumbSelect key={index} breadcrumbs={breadcrumbs} />
        ))}
      </Stack>
    </Box>
  );
};
