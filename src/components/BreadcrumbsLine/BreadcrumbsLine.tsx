import { IElement } from "../../types/types";
import React, { FC } from "react";
import { useGetPath } from "./hooks/useGetPath";
import { Stack } from "@mui/material";
import { BreadCrumbSelect } from "../BreadCrumbSelect";
import { NavBreadCrumb } from "../NavBreadCrumb";
import Box from "@mui/material/Box";

interface BreadcrumbsLineProps {
  id: IElement["id"];
}

const BreadcrumbsList: FC<BreadcrumbsLineProps> = ({ id }) => {
  const { data } = useGetPath(id);

  return (
    <>
      {data?.map((breadcrumbs, index) => (
        <BreadCrumbSelect key={index} breadcrumbs={breadcrumbs} />
      ))}
    </>
  );
};

export const BreadcrumbsLine: FC<Partial<BreadcrumbsLineProps>> = ({ id }) => {
  return (
    <Box
      display={"inline-block"}
      sx={{ overflowX: "scroll", width: "100%", scrollbarWidth: "none" }}
    >
      <Stack gap={4} direction="row" sx={{ textWrap: "nowrap" }}>
        <NavBreadCrumb type="TOPIC" name="/" />
        {id && <BreadcrumbsList id={id} />}
      </Stack>
    </Box>
  );
};
