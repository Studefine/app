import { MutationFunction } from "react-query/types/core/types";
import { IElement, ITopic, ITopicCreate } from "../types/types";
import { fetcher } from "./fetcher";

export const pathTopics = "topics";

export const getTopics = () => {
  return fetcher<ITopic[]>(pathTopics, {
    method: "GET",
  }).json();
};

export const getTopic = (id: ITopic["id"]) => {
  return fetcher<ITopic>(`${pathTopics}/${id}`, {
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
