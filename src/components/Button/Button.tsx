import { StyledButton } from "./Button.styles";
import type { ButtonProps } from "./Button.types";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  ...buttonProps
}: ButtonProps) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      {...buttonProps}
    >
      {children}
    </StyledButton>
  );
};
