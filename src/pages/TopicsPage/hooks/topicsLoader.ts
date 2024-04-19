import { getTopic, getTopics } from "../../../api/topics";
import { LoaderFunction } from "react-router-dom";

export const topicsLoader: LoaderFunction<any> = ({ params }) =>
  params?.id
    ? getTopic(params.id).catch(console.error)
    : getTopics().catch(console.error);
