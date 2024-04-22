import React, { FC } from "react";
import { Grid, Paper } from "@mui/material";
import Markdown from "react-markdown";
import { MDLink } from "../../components/MarkdownComponents/MDLink";
import { ITopic } from "../../types/types";

interface ITopicDescriptionProps {
  topic: ITopic;
}

export const TopicDescription: FC<ITopicDescriptionProps> = ({ topic }) => {
  if (topic.id === "0") return null;

  return (
    <Grid item xs={3} height={"100%"}>
      <Paper
        sx={{
          padding: 2,
          height: "100%",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        <Markdown
          className={"markdown"}
          components={{
            a: MDLink,
          }}
        >
          {topic.definition}
        </Markdown>
      </Paper>
    </Grid>
  );
};
