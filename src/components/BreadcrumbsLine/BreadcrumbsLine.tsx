import { IElement } from "../../types/types";
import React, { FC } from "react";
import { useGetPath } from "./hooks/useGetPath";
import { Stack } from "@mui/material";
import { BreadCrumbSelect } from "../BreadCrumbSelect";
import { NavBreadCrumb } from "../NavBreadCrumb";

interface BreadcrumbsLineProps {
  id: IElement["id"];
}

const BreadcrumbsList: FC<BreadcrumbsLineProps> = ({ id }) => {
  const { data } = useGetPath(id);

  return (
    <Stack direction="row" gap={4}>
      {data?.map((breadcrumbs, index) => (
        <BreadCrumbSelect key={index} breadcrumbs={breadcrumbs} />
      ))}
    </Stack>
  );
};

export const BreadcrumbsLine: FC<Partial<BreadcrumbsLineProps>> = ({ id }) => {
  return (
    <Stack
      direction="row"
      gap={4}
      flexWrap={"nowrap"}
      sx={{
        overflow: "auto",
        scrollbarWidth: "none",
        marginY: 2,
        height: 30,
      }}
    >
      <NavBreadCrumb type="TOPIC" name="/" />
      {id && <BreadcrumbsList id={id} />}
    </Stack>
  );
};
