import styled from "styled-components";
import { media } from "../../styles/media";

export const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};

  ${media.down("tablet")`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  `}
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TitleBlock = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xxs};
`;

export const HeaderTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.headingFamily};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};

  ${media.down("mobile")`
    font-size: ${({ theme }) => theme.typography.sizes.md};
  `}
`;

export const HeaderSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};

  ${media.down("mobile")`
    font-size: ${({ theme }) => theme.typography.sizes.xs};
  `}
`;

export const MenuButton = styled.button`
  min-height: 2.75rem;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`;
