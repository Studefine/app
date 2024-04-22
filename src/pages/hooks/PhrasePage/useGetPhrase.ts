import { useQuery } from "react-query";
import { IElementType } from "../../../types/types";
import { getPhrase } from "../../../api/phrases";

export const useGetPhrase = (id: string) =>
  useQuery(["PHRASE" as IElementType, id], getPhrase, {
    refetchOnWindowFocus: false,
  });
