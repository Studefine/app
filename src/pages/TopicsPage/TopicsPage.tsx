import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, IconButton, Skeleton, Stack } from "@mui/material";
import { useGetTopic } from "./hooks/useGetTopic";
import { ApiErrorMessage } from "../../components/ApiErrorMessage";
import { ElementList } from "./ElementList";
import { TopicsHeader } from "./TopicsHeader";
import { TopicDescription } from "./TopicDescription";
import { portalIds } from "../../types/portalIds";
import { createPortal } from "react-dom";
import { Cancel, Edit, Save } from "@mui/icons-material";
import { useForm } from "react-hook-form";

const PlaceToPortal: FC<
  PropsWithChildren<{ portalId: keyof typeof portalIds }>
> = ({ portalId, children }) => {
  const portal = document.getElementById(portalIds[portalId]);

  return portal && createPortal(children, portal);
};

export const EditTopicForm: FC<{ onLeaveEditMode: () => void }> = ({
  onLeaveEditMode,
}) => {
  const { formState, control, handleSubmit } = useForm();

  const handleSave = () => {
    onLeaveEditMode();
  };
  const handleCancel = () => {
    onLeaveEditMode();
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <PlaceToPortal portalId={"breadcrumbsRight"}>
        <>
          <IconButton
            aria-label="delete"
            size="small"
            color="warning"
            onClick={handleCancel}
          >
            <Cancel />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            color="success"
            onClick={handleSave}
          >
            <Save />
          </IconButton>
        </>
      </PlaceToPortal>
    </form>
  );
};

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
    <Stack direction="column" height="100%" gap={5}>
      <PlaceToPortal portalId={"breadcrumbsRight"}>
        {!editMode && (
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => setEditMode(true)}
          >
            <Edit />
          </IconButton>
        )}
      </PlaceToPortal>
      {editMode ? (
        <EditTopicForm onLeaveEditMode={() => setEditMode(false)} />
      ) : (
        <>
          <TopicsHeader topic={data} />
          <Grid container columnSpacing={2} height="calc(100% - 60px)">
            <TopicDescription topic={data} />
            <ElementList id={data.id} />
          </Grid>
        </>
      )}
    </Stack>
  );
};
