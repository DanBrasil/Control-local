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

export const BadgeRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Badge = styled.span<{ $kind: "status" | "payment" }>`
  display: inline-flex;
  width: fit-content;
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  background: ${({ theme, $kind }) =>
    $kind === "status" ? theme.colors.primaryLight : theme.colors.surfaceMuted};
  color: ${({ theme, $kind }) =>
    $kind === "status" ? theme.colors.primary : theme.colors.textSecondary};
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
