import { MutationFunction, QueryFunction } from "react-query/types/core/types";
import { IElement, ITopic, ITopicCreate } from "../types/types";
import { ApiPath, fetcher } from "./fetcher";

export const pathTopics = "topics";

export const getChildTopics: QueryFunction<
  ITopic[],
  [ApiPath, ITopic["id"], ApiPath]
> = ({ queryKey }) => {
  return fetcher<ITopic[]>(`${pathTopics}/${queryKey[1]}/topics`, {
    method: "GET",
  }).json();
};

export const getChildPhrases: QueryFunction<
  ITopic[],
  [ApiPath, ITopic["id"], ApiPath]
> = ({ queryKey }) => {
  return fetcher<ITopic[]>(`${pathTopics}/${queryKey[1]}/phrases`, {
    method: "GET",
  }).json();
};

export const getTopic: QueryFunction<ITopic, [string, ITopic["id"]]> = ({
  queryKey,
}) => {
  return fetcher<ITopic>(`${pathTopics}/${queryKey[1]}`, {
    method: "GET",
  }).json();
};

export const createTopic: MutationFunction<ITopic, ITopicCreate> = (topic) => {
  return fetcher<ITopic>(`${pathTopics}`, {
    method: "POST",
    body: JSON.stringify(topic),
  }).json();
};
export const updateTopic: MutationFunction<ITopic, ITopic> = ({
  id,
  ...topic
}) => {
  return fetcher<ITopic>(`${pathTopics}/${id}`, {
    method: "PUT",
    body: JSON.stringify(topic),
  }).json();
};

export const deleteTopic: MutationFunction<void, IElement["id"]> = (id) => {
  return fetcher<void>(`${pathTopics}/${id}`, {
    method: "DELETE",
  }).json();
};
