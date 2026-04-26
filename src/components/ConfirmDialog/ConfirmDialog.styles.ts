import styled from "styled-components";
import { media } from "../../styles/media";

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  z-index: 1300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
`;

export const Dialog = styled.div`
  width: min(520px, 100%);
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing.lg};
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};

  ${media.down("mobile")`
    padding: ${({ theme }) => theme.spacing.md};
  `}
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography.headingFamily};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};

  ${media.down("mobile")`
    flex-direction: column-reverse;

    button {
      width: 100%;
    }
  `}
`;
