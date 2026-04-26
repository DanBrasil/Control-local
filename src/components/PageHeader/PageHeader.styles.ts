import styled from "styled-components";
import { media } from "../../styles/media";

export const HeaderWrapper = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  ${media.down("tablet")`
    flex-direction: column;
    align-items: stretch;

    > button {
      width: 100%;
    }
  `}
`;

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.headingFamily};
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};

  ${media.down("mobile")`
    font-size: ${({ theme }) => theme.typography.sizes.lg};
  `}
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.md};
`;
