import styled from "styled-components";

export const List = styled.ul`
  list-style: none;
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Item = styled.li`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.sm};
`;

export const Title = styled.p`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

export const Meta = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;
