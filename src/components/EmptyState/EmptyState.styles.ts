import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Title = styled.p`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

export const ActionWrap = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
`;
