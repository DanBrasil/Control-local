import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.md};
`;

export const Meta = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;
