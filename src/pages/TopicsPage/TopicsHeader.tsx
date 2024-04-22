import React, { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { LeitnerBox } from "../../components/LeitnerBox";
import { ILeitnerLevel, ITopic } from "../../types/types";

interface ITopicsHeader {
  topic: ITopic;
}

export const TopicsHeader: FC<ITopicsHeader> = ({ topic }) => {
  const isMainMenu = topic.id === "0";

  return (
    <Stack
      direction="row"
      gap={4}
      justifyContent="space-between"
      flexWrap="wrap"
      sx={{ height: ({ spacing }) => spacing(10) }}
    >
      <Typography
        variant="h4"
        marginRight={3}
        sx={{
          textWrap: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        {isMainMenu ? "Válassz ki egy témakört" : topic.name}
      </Typography>
      {!isMainMenu && (
        <Stack direction="row" gap={2}>
          {topic.leitnerBoxesCounts.map((count, index) => (
            <LeitnerBox
              key={index}
              level={index as ILeitnerLevel}
              count={count}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
};
