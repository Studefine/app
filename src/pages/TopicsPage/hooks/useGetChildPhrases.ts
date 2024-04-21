import { useQuery } from "react-query";
import { IPhrase } from "../../../types/types";
import { ApiPath } from "../../../api/fetcher";
import { getChildPhrases } from "../../../api/topics";

export const useGetChildPhrases = (id: IPhrase["id"]) =>
  useQuery(["phrases" as ApiPath, id, "phrases"], getChildPhrases, {
    refetchOnWindowFocus: false,
  });
