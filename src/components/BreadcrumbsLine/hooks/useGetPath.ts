import { IElement } from "../../../types/types";
import { getPath } from "../../../api/path";
import { useQuery } from "react-query";

export const useGetPath = (id?: IElement["id"]) => {
  return useQuery(["path", id], getPath, { refetchOnWindowFocus: false });
};
