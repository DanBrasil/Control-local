import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Spinner = styled.span`
  width: 1rem;
  height: 1rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  animation: ${spin} 0.8s linear infinite;
`;

export const TextBlock = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xxs};
`;

export const Title = styled.p`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;
