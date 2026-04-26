import styled from "styled-components";
import { media } from "../../../../styles/media";

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Name = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
`;

export const Meta = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

export const StatusBadge = styled.span<{ $status: "active" | "inactive" }>`
  display: inline-flex;
  width: fit-content;
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  background: ${({ theme, $status }) =>
    $status === "active"
      ? theme.colors.primaryLight
      : theme.colors.surfaceMuted};
  color: ${({ theme, $status }) =>
    $status === "active" ? theme.colors.primary : theme.colors.textSecondary};
`;

export const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};

  ${media.down("mobile")`
    flex-direction: column;

    button {
      width: 100%;
    }
  `}
`;
