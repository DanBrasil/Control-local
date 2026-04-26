import styled, { css } from "styled-components";
import { media } from "../../styles/media";
import type { ButtonProps, ButtonSize, ButtonVariant } from "./Button.types";
const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
    border-color: ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryHover};
      border-color: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.textPrimary};
    border-color: ${({ theme }) => theme.colors.border};
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border-color: transparent;
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger};
    color: #ffffff;
    border-color: ${({ theme }) => theme.colors.danger};
  `,
};

const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  sm: css`
    font-size: ${({ theme }) => theme.typography.sizes.sm};
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  `,
  md: css`
    font-size: ${({ theme }) => theme.typography.sizes.md};
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  `,
  lg: css`
    font-size: ${({ theme }) => theme.typography.sizes.lg};
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  `,
};

export const StyledButton = styled.button<
  Required<Pick<ButtonProps, "variant" | "size" | "fullWidth">>
>`
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  transition: 0.2s ease;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};

  ${media.down("mobile")`
    width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  `}

  ${({ variant }) => variantStyles[variant]}
  ${({ size }) => sizeStyles[size]}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
