import { IPhrase, ITopic } from "../../types/types";
import React, { FC, useMemo } from "react";
import {Grid, ImageList, Skeleton, Typography} from "@mui/material";
import { ElementCard } from "../../components/ElementCard";
import { useGetChildPhrases } from "./hooks/useGetChildPhrases";
import { ApiErrorMessage } from "../../components/ApiErrorMessage";
import { useGetChildTopics } from "./hooks/useGetChildTopics";

const List: FC<{ topics: ITopic[]; phrases: IPhrase[] }> = ({
  topics,
  phrases,
}) => {
  const childCount = useMemo(
    () => phrases.length + topics.length,
    [phrases.length, topics.length],
  );
  return (
    <Grid item xs={9} height="100%">
      { childCount === 0?<Typography textAlign="center" variant={"h5"}>Nincsenek megjeleníthető elemek</Typography>:
        <ImageList
          sx={{ width: "100%", height: "100%", marginTop: 0 }}
          cols={3}
          rowHeight={250}
        >
          {topics.map((element) => (
            <ElementCard key={element.id} element={element} />
          ))}

          {phrases.map((phrase) => (
            <ElementCard key={phrase.id} element={phrase} />
          ))}
        </ImageList>
      }
    </Grid>
  );
};

interface IElementListProps {
  id: ITopic["id"];
}

export const ElementList: FC<IElementListProps> = ({ id }) => {
  const { data: phrases, isLoading: isPhrasesLoading } = useGetChildPhrases(id);
  const { data: topics, isLoading: isTopicsLoading } = useGetChildTopics(id);

  if (isPhrasesLoading || isTopicsLoading) return <Skeleton />;
  if (!phrases || !topics) return <ApiErrorMessage />;
  return <List phrases={phrases} topics={topics} />;
};
