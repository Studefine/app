import React from "react";
import { useParams } from "react-router-dom";
import { Grid, Skeleton, Stack } from "@mui/material";
import { useGetTopic } from "./hooks/useGetTopic";
import { ApiErrorMessage } from "../../components/ApiErrorMessage";
import { ElementList } from "./ElementList";
import { TopicsHeader } from "./TopicsHeader";
import { TopicDescription } from "./TopicDescription";

export const TopicsPage = () => {
  const params = useParams();
  const { data, isLoading, error } = useGetTopic(params?.id ?? "0");

  if (!data || isLoading) return <Skeleton></Skeleton>;
  if (error) return <ApiErrorMessage />;
  return (
    <Stack direction="column" height="100%" gap={5}>
      <TopicsHeader topic={data} />
      <Grid container columnSpacing={2} height="calc(100% - 60px)">
        <TopicDescription topic={data} />
        <ElementList topic={data} />
      </Grid>
    </Stack>
  );
};
