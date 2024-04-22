import { IElement } from "../../types/types";
import React from "react";
import { useGetChildTopics } from "./hooks/useGetChildTopics";
import { Skeleton } from "@mui/material";
import { ApiErrorMessage } from "../../components/ApiErrorMessage";
import { ElementCard } from "../../components/ElementCard";

export interface ElementListProps {
  id: IElement["id"];
}

export const TopicList: React.FC<ElementListProps> = ({ id }) => {
  const { data, isLoading } = useGetChildTopics(id);

  if (isLoading) return <Skeleton />;
  if (!data) return <ApiErrorMessage />;
  return (
    <>
      {data.map((topic) => (
        <ElementCard key={topic.id} element={topic} />
      ))}
    </>
  );
};
