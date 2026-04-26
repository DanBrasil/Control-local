import styled from "styled-components";
import { media } from "../../../../styles/media";

export const Content = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const FileInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.sm};
`;

export const Modes = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const ModeLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textPrimary};
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
