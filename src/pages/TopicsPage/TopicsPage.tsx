import React from "react";
import { useParams } from "react-router-dom";
import { Grid, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useGetTopic } from "./hooks/useGetTopic";
import { ApiErrorMessage } from "../../components/ApiErrorMessage";
import { TopicList } from "./TopicList";
import { PhraseList } from "./PhraseList";
import { LeitnerBox } from "../../components/LeitnerBox";
import Box from "@mui/material/Box";

export const TopicsPage = () => {
  const params = useParams();
  const { data, isLoading, error } = useGetTopic(params?.id ?? "0");

  const isMainMenu = params?.id === undefined;

  if (!data || isLoading) return <Skeleton></Skeleton>;
  if (error) return <ApiErrorMessage />;
  return (
    <Stack direction="column" height="100%">
      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        <Typography
          variant="h4"
          marginRight={3}
          height={42}
          sx={{
            textWrap: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {isMainMenu ? "Válassz ki egy témakört" : data.name}
        </Typography>
        {!isMainMenu && (
          <Stack direction="row" height={42}>
            <LeitnerBox level={0} count={2} />
            <LeitnerBox level={1} count={2} />
            <LeitnerBox level={2} count={2} />
            <LeitnerBox level={3} count={2} />
            <LeitnerBox level={4} count={23} />
          </Stack>
        )}
      </Box>
      <Grid item container overflow="hidden" columnSpacing={2}>
        {!isMainMenu && (
          <Grid item xs={3}>
            <Paper sx={{ padding: 2 }}>{data.definition}</Paper>
          </Grid>
        )}
        <Grid
          item
          container
          xs={9}
          spacing={2}
          overflow="scroll"
          sx={{ scrollbarWidth: "none" }}
        >
          <TopicList id={data.id} />
          <PhraseList id={data.id} />
        </Grid>
      </Grid>
    </Stack>
  );
};
