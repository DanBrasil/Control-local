import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDisclosure } from "../../shared/hooks/useDisclosure";
import { useMediaQuery } from "../../shared/hooks/useMediaQuery";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import {
  ContentArea,
  LayoutShell,
  MainContent,
  SidebarBackdrop,
} from "./AppLayout.styles";

export const AppLayout = () => {
  const location = useLocation();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { isOpen, close, toggle } = useDisclosure(false);

  useEffect(() => {
    close();
  }, [close, location.pathname]);

  useEffect(() => {
    if (isDesktop) {
      close();
    }
  }, [close, isDesktop]);

  const isSidebarOpen = isDesktop ? true : isOpen;

  return (
    <LayoutShell>
      <Sidebar isOpen={isSidebarOpen} onNavigate={close} />
      {!isDesktop && isSidebarOpen && (
        <SidebarBackdrop aria-hidden="true" onClick={close} />
      )}
      <ContentArea>
        <Header
          isMenuOpen={isSidebarOpen}
          onMenuToggle={toggle}
          showMenuButton={!isDesktop}
        />
        <MainContent>
          <Outlet />
        </MainContent>
      </ContentArea>
    </LayoutShell>
  );
};
