import { FieldValues } from "react-hook-form/dist/types/fields";
import { Control } from "react-hook-form/dist/types/form";
import { FieldPath } from "react-hook-form/dist/types/path";

export const bindField = <TFieldValues extends FieldValues = FieldValues>(
  control: Control<TFieldValues>,
  field: FieldPath<TFieldValues>,
) => ({
  ...control.register(field),
  error: Boolean(control._formState.errors[field]),
  helperText: control._formState.errors[field]?.message,
});