import React from "react";
import { ElementListProps } from "./TopicList";
import { useGetChildPhrases } from "./hooks/useGetChildPhrases";
import { Skeleton } from "@mui/material";
import { ApiErrorMessage } from "../../components/ApiErrorMessage";
import { ElementCard } from "../../components/TopicsPage/ElementCard";

export const PhraseList: React.FC<ElementListProps> = ({ id }) => {
  const { data, isLoading } = useGetChildPhrases(id);

  if (isLoading) return <Skeleton />;
  if (!data) return <ApiErrorMessage />;
  return (
    <>
      {data.map((phrase) => (
        <ElementCard key={phrase.id} element={phrase} />
      ))}
    </>
  );
};
