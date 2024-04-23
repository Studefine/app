import { useQuery } from "react-query";
import { ITopic } from "../../../types/types";
import { ApiPath } from "../../../api/fetcher";
import { getChildPhrases } from "../../../api/topics";

export const useGetChildPhrases = (id: ITopic["id"]) =>
  useQuery(["phrases" as ApiPath, id, "phrases"], getChildPhrases, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
