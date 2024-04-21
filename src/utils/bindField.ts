import { FieldValues } from "react-hook-form/dist/types/fields";
import { Control, FormState } from "react-hook-form/dist/types/form";
import { FieldPath } from "react-hook-form/dist/types/path";

export const bindField = <TFieldValues extends FieldValues = FieldValues>(
  field: FieldPath<TFieldValues>,
  formState: FormState<TFieldValues>,
  control: Control<TFieldValues>,
) => ({
  ...control.register(field),
  error: Boolean(formState.errors[field]),
  helperText: formState.errors[field]?.message,
});
