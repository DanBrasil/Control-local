import styled from "styled-components";
import { media } from "../../styles/media";

export const LayoutShell = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  min-width: 0;

  ${media.down("tablet")`
    padding: ${({ theme }) => theme.spacing.md};
  `}
`;

export const SidebarBackdrop = styled.button`
  border: 0;
  position: fixed;
  inset: 0;
  z-index: 1090;
  background: rgba(15, 23, 42, 0.45);
  cursor: pointer;

  ${media.up("desktop")`
    display: none;
  `}
`;
