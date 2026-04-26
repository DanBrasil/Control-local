import { useId } from "react";
import {
  FieldContainer,
  FieldLabel,
  HelperText,
  StyledInput,
} from "./Input.styles";
import type { InputProps } from "./Input.types";

export const Input = ({
  id,
  label,
  error,
  helperText,
  fullWidth = false,
  ...inputProps
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helper = error ?? helperText;

  return (
    <FieldContainer $fullWidth={fullWidth}>
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}
      <StyledInput id={inputId} $hasError={Boolean(error)} {...inputProps} />
      {helper && <HelperText $hasError={Boolean(error)}>{helper}</HelperText>}
    </FieldContainer>
  );
};
