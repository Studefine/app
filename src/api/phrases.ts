import { MutationFunction } from "react-query/types/core/types";
import { IElement, IPhrase, IPhraseCreate } from "../types/types";
import { fetcher } from "./fetcher";

export const pathPhrases = "phrases";

export const getPhrase = (id: IPhrase["id"]) => {
  return fetcher<IPhrase>(`${pathPhrases}/${id}`, {
    method: "GET",
  }).json();
};

export const createPhrase: MutationFunction<IPhrase, IPhraseCreate> = (
  topic,
) => {
  return fetcher<IPhrase>(pathPhrases, {
    method: "POST",
    body: JSON.stringify(topic),
  }).json();
};
export const updatePhrase: MutationFunction<IPhrase, IPhrase> = ({
  id,
  ...topic
}) => {
  return fetcher<IPhrase>(`${pathPhrases}/${id}`, {
    method: "PUT",
    body: JSON.stringify(topic),
  }).json();
};

export const deletePhrase: MutationFunction<void, IElement["id"]> = (id) => {
  return fetcher<void>(`${pathPhrases}/${id}`, {
    method: "DELETE",
  }).json();
};
