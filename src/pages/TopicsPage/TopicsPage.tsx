import React from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  ImageList,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useGetTopic } from "./hooks/useGetTopic";
import { ApiErrorMessage } from "../../components/ApiErrorMessage";
import { TopicList } from "./TopicList";
import { PhraseList } from "./PhraseList";
import { LeitnerBox } from "../../components/LeitnerBox";
import {getScrollbarStyle} from "../Layout";

export const TopicsPage = () => {
  const { palette, spacing } = useTheme();
  const params = useParams();
  const { data, isLoading, error } = useGetTopic(params?.id ?? "0");

  const isMainMenu = params?.id === undefined;

  if (!data || isLoading) return <Skeleton></Skeleton>;
  if (error) return <ApiErrorMessage />;
  return (
    <Stack direction="column" height="100%" gap={5}>
      <Stack
        direction="row"
        gap={4}
        justifyContent="space-between"
        flexWrap="wrap"
        sx={{ height: ({ spacing }) => spacing(10) }}
      >
        <Typography
          variant="h4"
          marginRight={3}
          sx={{
            textWrap: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {isMainMenu ? "Válassz ki egy témakört" : data.name}
        </Typography>
        {!isMainMenu && (
          <Stack direction="row" gap={2}>
            <LeitnerBox level={0} count={2} />
            <LeitnerBox level={1} count={2} />
            <LeitnerBox level={2} count={2} />
            <LeitnerBox level={3} count={2} />
            <LeitnerBox level={4} count={23} />
          </Stack>
        )}
      </Stack>
      <Grid container columnSpacing={2} height="calc(100% - 60px)">
        {!isMainMenu && (
          <Grid item xs={3} height={"100%"}>
            <Paper
              sx={{
                padding: 2,
                height: "100%",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <Typography sx={{scrollbarColor: "white"}} variant="body2" height="100%" overflow={"auto"}>
                {data.definition}
              </Typography>
            </Paper>
          </Grid>
        )}
        <Grid item xs={9} height="100%">
          <ImageList
            sx={{ width: "100%", height: "100%", marginTop: 0 }}
            cols={3}
            rowHeight={250}
          >
            <TopicList id={data.id} />
            <PhraseList id={data.id} />
          </ImageList>
        </Grid>
      </Grid>
    </Stack>
  );
};
