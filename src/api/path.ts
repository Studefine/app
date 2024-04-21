import { IBreadCrumb, IElement } from "../types/types";
import { fetcher } from "./fetcher";
import { QueryFunction } from "react-query/types/core/types";

export const getPath: QueryFunction<
  IBreadCrumb[][],
  [string, IElement["id"]]
> = ({ queryKey }) => {
  return fetcher<IBreadCrumb[][]>(`paths/${queryKey[1]}`, {
    method: "GET",
  }).json();
};
