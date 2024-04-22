import { ITopic } from "../../types/types";
import React, { FC } from "react";
import { Grid, ImageList } from "@mui/material";
import { TopicList } from "./TopicList";
import { PhraseList } from "./PhraseList";

interface IElementListProps {
  topic: ITopic;
}

export const ElementList: FC<IElementListProps> = ({ topic }) => {
  return (
    <Grid item xs={9} height="100%">
      <ImageList
        sx={{ width: "100%", height: "100%", marginTop: 0 }}
        cols={3}
        rowHeight={250}
      >
        <TopicList id={topic.id} />
        <PhraseList id={topic.id} />
      </ImageList>
    </Grid>
  );
};
