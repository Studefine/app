import {
  IElement,
  IElementType,
  IGroup,
  ILeitnerLevel,
  IPhrase,
  ITopic,
} from "../types/types";
import React, { FC, PropsWithChildren } from "react";
import { Button, ImageListItem, Paper, Stack, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LeitnerBox } from "./LeitnerBox";
import Box from "@mui/material/Box";
import Markdown from "react-markdown";
import MDParagraph from "./MarkdownComponents/MDParagraph";
import { MDLink } from "./MarkdownComponents/MDLink";

type ElementCardTypes = IPhrase | ITopic | IGroup;

interface IElementCardProps<T extends ElementCardTypes> {
  element: T;
}

export const ElementCard = <T extends ElementCardTypes>({
  element,
}: IElementCardProps<T>) => {
  const leitner =
    "leitnerLevel" in element
      ? element.leitnerLevel
      : "leitnerBoxesCounts" in element
        ? element.leitnerBoxesCounts
        : undefined;

  return (
    <ElementCardWrapper
      id={element.id}
      name={element.name}
      type={element.type}
      leitner={leitner}
    >
      <Markdown
        className={"markdown-card"}
        components={{ p: MDParagraph, a: MDLink }}
      >
        {element.type === "PHRASE"
          ? (element as IPhrase).vcpd.plainDefinitions.find(
              (plainDefinition) =>
                plainDefinition.id === (element as IPhrase).vcpd.active,
            )?.definition
          : element.definition}
      </Markdown>
    </ElementCardWrapper>
  );
};

const ElementCardWrapper: FC<
  PropsWithChildren<{
    id: IElement["id"];
    name: IElement["name"];
    type: IElementType;
    leitner?: IPhrase["leitnerLevel"] | ITopic["leitnerBoxesCounts"];
  }>
> = ({ id, name, type, children, leitner }) => {
  const navigate = useNavigate();
  const { palette } = useTheme();

  return (
    <ImageListItem>
      <Paper
        sx={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
          border: type !== "TOPIC" ? 2 : 0,
          borderColor:
            type === "GROUP"
              ? palette.info.main
              : type === "PHRASE"
                ? "white"
                : "transparent",
        }}
      >
        <Box marginBottom={1} flexDirection="column">
          <Button
            sx={{
              width: "100%",
              justifyContent: "space-between",
              borderRadius: 0,
              marginBottom: type === "TOPIC" ? 2 : 0,
              paddingBottom: 0,
              textAlign: "left",
              color: "white",
            }}
            onClick={() => navigate(`/${type.toLowerCase()}s/${id}`)}
          >
            {name}
            {leitner && typeof leitner === "number" && (
              <LeitnerBox size={"small"} level={leitner} />
            )}
          </Button>
          <Stack direction="row" marginX={2} gap={1}>
            {leitner &&
              typeof leitner !== "number" &&
              leitner?.map((count, index) => (
                <LeitnerBox
                  key={index}
                  size={"small"}
                  level={index as ILeitnerLevel}
                  count={count}
                />
              ))}
          </Stack>
        </Box>
        <Paper
          elevation={0}
          sx={{
            padding: 2,
            margin: 2,
            flex: 1,
            display: "flex",
            height: 0, // ... :/ this is how the content is fit correctly somehow
          }}
        >
          {children}
        </Paper>
      </Paper>
    </ImageListItem>
  );
};
