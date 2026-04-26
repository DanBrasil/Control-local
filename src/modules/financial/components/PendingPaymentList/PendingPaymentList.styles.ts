import styled from "styled-components";
import { media } from "../../../../styles/media";

export const ListContainer = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  grid-template-columns: 1fr;

  ${media.up("tablet")`
    grid-template-columns: repeat(2, minmax(0, 1fr));
  `}

  ${media.up("wide")`
    grid-template-columns: repeat(3, minmax(0, 1fr));
  `}
`;
