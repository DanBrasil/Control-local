import styled from "styled-components";
import { media } from "../../../../styles/media";

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  ${media.up("tablet")`
    grid-template-columns: repeat(2, minmax(0, 1fr));
  `}

  ${media.up("desktop")`
    grid-template-columns: repeat(3, minmax(0, 1fr));
  `}

  ${media.up("wide")`
    grid-template-columns: repeat(6, minmax(0, 1fr));
  `}
`;

export const Label = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

export const Value = styled.strong`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
`;
