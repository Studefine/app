import React, { FC } from "react";
import { Stack, Typography, useTheme } from "@mui/material";
import { LeitnerBox } from "../../components/LeitnerBox";
import { ILeitnerLevel, ITopic } from "../../types/types";

interface ITopicsHeader {
  topic: ITopic;
}

export const TopicsHeader: FC<ITopicsHeader> = ({ topic }) => {
  const { palette, spacing } = useTheme();
  const isMainMenu = topic.id === "0";

  return (
    <Stack
      direction="row"
      bgcolor={palette.background.default}
      top={spacing(11)}
      gap={4}
      zIndex={1}
      paddingBottom={1}
      justifyContent="space-between"
      position={"sticky"}
      flexWrap="wrap"
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
