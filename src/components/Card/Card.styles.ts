import styled from "styled-components";
import { media } from "../../styles/media";

export const CardContainer = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  min-width: 0;

  ${media.down("tablet")`
    padding: ${({ theme }) => theme.spacing.md};
  `}
`;
