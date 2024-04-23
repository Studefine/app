import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IconButton, Skeleton } from "@mui/material";
import { useGetTopic } from "./hooks/useGetTopic";
import { ApiErrorMessage } from "../../components/ApiErrorMessage";
import { ElementList } from "./ElementList";
import { TopicsHeader } from "./TopicsHeader";
import { TopicDescription } from "./TopicDescription";
import { Edit } from "@mui/icons-material";
import { PlaceToPortal } from "../../components/PlaceToPortal";
import { EditTopicForm } from "./EditTopicForm";

export const TopicsPage = () => {
  const params = useParams();
  const { data, isLoading, error } = useGetTopic(params?.id ?? "0");
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    setEditMode(false);
  }, [params.id]);

  if (!data || isLoading) return <Skeleton></Skeleton>;
  if (error) return <ApiErrorMessage />;
  return (
    <>
      <PlaceToPortal portalId={"breadcrumbsRight"}>
        {!editMode && (
          <IconButton size="small" onClick={() => setEditMode(true)}>
            <Edit />
          </IconButton>
        )}
      </PlaceToPortal>
      {editMode ? (
        <EditTopicForm
          topic={data}
          onLeaveEditMode={() => setEditMode(false)}
        />
      ) : (
        <>
          <TopicsHeader topic={data} />
          <TopicDescription topic={data} />
          <ElementList id={data.id} />
        </>
      )}
    </>
  );
};
