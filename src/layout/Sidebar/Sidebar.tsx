import { Logo, NavItem, NavList, SidebarContainer } from "./Sidebar.styles";

interface SidebarProps {
  isOpen: boolean;
  onNavigate: () => void;
}

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/patients", label: "Pacientes" },
  { to: "/appointments", label: "Agenda" },
  { to: "/financial", label: "Financeiro" },
  { to: "/settings", label: "Configuracoes" },
];

export const Sidebar = ({ isOpen, onNavigate }: SidebarProps) => {
  return (
    <SidebarContainer id="app-sidebar" $isOpen={isOpen}>
      <Logo>PsiAgenda</Logo>
      <NavList>
        {links.map((link) => (
          <NavItem key={link.to} to={link.to} onClick={onNavigate}>
            {link.label}
          </NavItem>
        ))}
      </NavList>
    </SidebarContainer>
  );
};
