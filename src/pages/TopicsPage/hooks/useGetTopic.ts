import { useQuery } from "react-query";
import { getTopic } from "../../../api/topics";
import { IElementType } from "../../../types/types";

export const useGetTopic = (id: string) =>
  useQuery(["TOPIC" as IElementType, id], getTopic, {
    refetchOnWindowFocus: false,
  });
