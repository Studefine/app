import { Property } from "csstype";
import { ColorPalette, FontSize } from "../../utils/types";

export interface Text {
  fontSize?: FontSize;
  fontWeight?: Property.FontWeight;
  color?: ColorPalette;
}
