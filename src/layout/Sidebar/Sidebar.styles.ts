import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { media } from "../../styles/media";

export const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  width: 240px;
  min-height: 100dvh;
  padding: ${({ theme }) => theme.spacing.lg};
  position: sticky;
  top: 0;
  align-self: flex-start;
  overflow-y: auto;
  z-index: 1100;

  ${media.down("desktop")`
    position: fixed;
    inset: 0 auto 0 0;
    width: min(280px, 86vw);
    transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-100%")});
    pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
    transition: transform 0.2s ease;
    min-height: 100dvh;
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.shadows.md};
  `}
`;

export const Logo = styled.h2`
  font-family: ${({ theme }) => theme.typography.headingFamily};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const NavItem = styled(NavLink)`
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  min-height: 2.75rem;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }

  &.active {
    background: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
  }
`;
