import styled from "styled-components";
import { media } from "../../../../styles/media";

export const Content = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;

  ${media.down("tablet")`
    button {
      width: 100%;
    }
  `}
`;
