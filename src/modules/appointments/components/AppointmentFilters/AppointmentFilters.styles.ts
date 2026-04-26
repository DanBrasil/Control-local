import styled from "styled-components";
import { media } from "../../../../styles/media";

export const FiltersGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  grid-template-columns: 1fr;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  ${media.up("tablet")`
    grid-template-columns: repeat(2, minmax(0, 1fr));
  `}

  ${media.up("desktop")`
    grid-template-columns: repeat(4, minmax(0, 1fr));
  `}
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Select = styled.select`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.colors.surface};
`;
