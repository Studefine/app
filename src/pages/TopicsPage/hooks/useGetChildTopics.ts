import { useQuery } from "react-query";
import { getChildTopics } from "../../../api/topics";
import { ApiPath } from "../../../api/fetcher";
import { ITopic } from "../../../types/types";

export const useGetChildTopics = (id: ITopic["id"]) => {
  return useQuery(["topics" as ApiPath, id, "phrases"], getChildTopics, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
