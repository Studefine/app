import { Property, StandardLonghandProperties } from "csstype";
import { customFontSizes, customColors } from "./customValues";

export type CustomFontSize = (typeof customFontSizes)[number];
export type FontSize = CustomFontSize | StandardLonghandProperties["fontSize"];
export type CustomColorPalette = (typeof customColors)[number];
export type ColorPalette = CustomColorPalette | Property.Color;
