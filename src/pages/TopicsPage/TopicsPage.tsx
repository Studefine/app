import React from "react";
import { Stack } from "@mui/material";
import { useLoaderData, useParams } from "react-router-dom";

export const TopicsPage = () => {
  const params = useParams();
  const loaderData = useLoaderData();

  return (
    <Stack paddingTop={2}>
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
