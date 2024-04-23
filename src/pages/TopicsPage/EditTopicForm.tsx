import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { PlaceToPortal } from "../../components/PlaceToPortal";
import { IconButton, Stack, TextField } from "@mui/material";
import { Cancel, Save } from "@mui/icons-material";
import { ITopic } from "../../types/types";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { bindField } from "../../utils/bindField";
import Markdown from "react-markdown";
import Box from "@mui/material/Box";

interface IEditTopicFormProps {
  topic: ITopic;
  onLeaveEditMode: () => void;
}

export const EditTopicForm: FC<IEditTopicFormProps> = ({
  topic,
  onLeaveEditMode,
}) => {
  const { formState, control, handleSubmit, watch } = useForm<ITopic>({
    defaultValues: topic,
  });
  const handleSave: SubmitHandler<ITopic> = (data, event) => {
    console.log("submit");
    onLeaveEditMode();
  };

  const handleCancel = () => {
    onLeaveEditMode();
  };

  return (
    <>
      <Stack>
        <PlaceToPortal portalId={"breadcrumbsRight"}>
          <IconButton size="small" color="warning" onClick={handleCancel}>
            <Cancel />
          </IconButton>
          <IconButton
            size="small"
            color="success"
            onClick={handleSubmit(handleSave)}
            disabled={!formState.isDirty}
          >
            <Save />
          </IconButton>
        </PlaceToPortal>
        <TextField
          {...bindField("name", formState, control)}
          fullWidth
          size="medium"
          label="Témakör"
        />
        <Stack direction="row" gap={2} width="100%">
          <Box flex={1}>
            <Markdown className={"markdown"}>{watch("definition")}</Markdown>
          </Box>
          <Box flex={1}>
            <TextField
              {...bindField("definition", formState, control)}
              maxRows={20}
              fullWidth
              multiline
              size="medium"
              label="Leírás"
            />
          </Box>
        </Stack>
      </Stack>
    </>
  );
};
