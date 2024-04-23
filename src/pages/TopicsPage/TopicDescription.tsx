import React, { FC } from "react";
import { Paper } from "@mui/material";
import Markdown from "react-markdown";
import { MDLink } from "../../components/MarkdownComponents/MDLink";
import { ITopic } from "../../types/types";

interface ITopicDescriptionProps {
  topic: ITopic;
}

export const TopicDescription: FC<ITopicDescriptionProps> = ({ topic }) => {
  if (topic.id === "0") return null;

  return (
    <Paper
      sx={{
        marginTop: 5,
        padding: 2,
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
  );
};
