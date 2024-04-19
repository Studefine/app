import React from "react";
import { BreadcrumbsLine } from "../../components/BreadcrumbsLine";
import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";

export const TopicsPage = () => {
  const params = useParams();
  return (
    <Stack paddingTop={2}>
      <BreadcrumbsLine id={params.id} />
      <>
        <>header</>
        <>leitner boxes</>
      </>
      <>
        <>description</>
        <>List</>
      </>
    </Stack>
  );
};
