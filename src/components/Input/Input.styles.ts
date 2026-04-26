import styled from "styled-components";
import { media } from "../../styles/media";

export const FieldContainer = styled.div<{ $fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
`;

export const FieldLabel = styled.label`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

export const StyledInput = styled.input<{ $hasError: boolean }>`
  width: 100%;
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 2.75rem;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};

  ${media.down("tablet")`
    font-size: 1rem;
  `}

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 1px;
    border-color: transparent;
  }
`;

export const HelperText = styled.small<{ $hasError: boolean }>`
  color: ${({ theme, $hasError }) =>
    $hasError ? theme.colors.danger : theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
`;
