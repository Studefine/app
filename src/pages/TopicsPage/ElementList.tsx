import { IPhrase, ITopic } from "../../types/types";
import React, { FC, useMemo } from "react";
import { ImageList, Skeleton, Typography, useMediaQuery } from "@mui/material";
import { ElementCard } from "../../components/ElementCard";
import { useGetChildPhrases } from "./hooks/useGetChildPhrases";
import { ApiErrorMessage } from "../../components/ApiErrorMessage";
import { useGetChildTopics } from "./hooks/useGetChildTopics";

const List: FC<{ topics: ITopic[]; phrases: IPhrase[] }> = ({
  topics,
  phrases,
}) => {
  const isMd = useMediaQuery("md");
  console.log(isMd);
  const childCount = useMemo(
    () => phrases.length + topics.length,
    [phrases.length, topics.length],
  );
  return childCount === 0 ? (
    <Typography textAlign="center" variant={"h5"}>
      Nincsenek megjeleníthető elemek
    </Typography>
  ) : (
    <ImageList
      sx={{ width: "100%", height: "100%", marginTop: 5 }}
      cols={isMd ? 3 : 2}
      rowHeight={250}
    >
      {topics.map((element) => (
        <ElementCard key={element.id} element={element} />
      ))}

      {phrases.map((phrase) => (
        <ElementCard key={phrase.id} element={phrase} />
      ))}
    </ImageList>
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
