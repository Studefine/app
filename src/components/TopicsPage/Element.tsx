import {
  ElementType,
  IElement,
  IGroup,
  IPhrase,
  ITopic,
  LeitnerLevel,
} from "../../types/types";
import React, { FC, PropsWithChildren } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LeitnerBox } from "../LeitnerBox";
import Box from "@mui/material/Box";

type ElementTypes = IPhrase | ITopic | IGroup;

interface IElementProps<T extends ElementTypes> {
  element: T;
  type: ElementType;
}

export const Element = <T extends ElementTypes>({
  element,
  type,
}: IElementProps<T>) => {
  const leitner =
    "leitnerLevel" in element
      ? element.leitnerLevel
      : "leitnerBoxesCounts" in element
        ? element.leitnerBoxesCounts
        : undefined;

  return (
    <ElementCard
      id={element.id}
      name={element.name}
      type={type}
      leitner={leitner}
    >
      <CardContent sx={{ padding: 2, flex: 1, display: "flex" }}>
        <Paper elevation={0} sx={{ padding: 1 }}>
          {element.definition}
        </Paper>
      </CardContent>
    </ElementCard>
  );
};

const ElementCard: FC<
  PropsWithChildren<{
    id: IElement["id"];
    name: IElement["name"];
    type: ElementType;
    leitner?: IPhrase["leitnerLevel"] | ITopic["leitnerBoxesCounts"];
  }>
> = ({ id, name, type, children, leitner }) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  console.log("leitner", leitner);
  return (
    <Grid item xs={4}>
      <Card
        sx={{
          ".MuiCardContent-root:last-child": { paddingBottom: 2 },
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
              marginBottom: 2,
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
          <Stack direction="row" marginX={2}>
            {leitner &&
              typeof leitner !== "number" &&
              leitner?.map((count, index) => (
                <LeitnerBox
                  size={"small"}
                  level={index as LeitnerLevel}
                  count={count}
                />
              ))}
          </Stack>
        </Box>
        {children}
      </Card>
    </Grid>
  );
};
