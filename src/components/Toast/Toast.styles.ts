import styled, { css } from "styled-components";
import { media } from "../../styles/media";

type ToastVariant = "success" | "error" | "info";

const variantStyles: Record<ToastVariant, ReturnType<typeof css>> = {
  success: css`
    border-left-color: ${({ theme }) => theme.colors.success};
  `,
  error: css`
    border-left-color: ${({ theme }) => theme.colors.danger};
  `,
  info: css`
    border-left-color: ${({ theme }) => theme.colors.primary};
  `,
};

export const Viewport = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  z-index: 1200;
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  width: min(360px, calc(100vw - 2rem));

  ${media.down("tablet")`
    top: auto;
    bottom: ${({ theme }) => theme.spacing.md};
    right: ${({ theme }) => theme.spacing.md};
    left: ${({ theme }) => theme.spacing.md};
    width: auto;
  `}
`;

export const ToastCard = styled.div<{ $variant: ToastVariant }>`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 4px solid;
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing.md};
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};

  ${({ $variant }) => variantStyles[$variant]}
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Title = styled.strong`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

export const CloseButton = styled.button`
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  cursor: pointer;
  line-height: 1;
  min-width: 2rem;
  min-height: 2rem;
`;
