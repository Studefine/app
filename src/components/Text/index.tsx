import React, { PropsWithChildren } from "react";
import { Text as TextProp } from "./types";
import {
  CustomColorPalette,
  CustomFontSize,
  FontSize,
} from "../../utils/types";
import { customColors, customFontSizes } from "../../utils/customValues";

interface Index {
  size: FontSize;
}

const Text: React.FC<PropsWithChildren<TextProp>> = ({
  fontSize = "md",
  fontWeight = "normal",
  children,
  color,
}) => {
  const isItCustomColor = customColors.includes(color as CustomColorPalette); // for some reason it is mandatory to be the exact type
  const isItCustomTextSize = customFontSizes.includes(fontSize as CustomFontSize); // for some reason it is mandatory to be the exact type

  return (
    <div
      style={{
        color: isItCustomColor ? `var(--color-${color})` : color,
        fontWeight,
        fontSize: isItCustomTextSize ? `var(--font-size-${fontSize})` : fontSize,
      }}
    >
      {children}
    </div>
  );
};

export default Text;
export type { Text } from "./types";
