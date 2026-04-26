import {
  HeaderContainer,
  HeaderSubtitle,
  HeaderTitle,
  Left,
  MenuButton,
  TitleBlock,
} from "./Header.styles";

interface HeaderProps {
  isMenuOpen: boolean;
  showMenuButton: boolean;
  onMenuToggle: () => void;
}

export const Header = ({
  isMenuOpen,
  showMenuButton,
  onMenuToggle,
}: HeaderProps) => {
  return (
    <HeaderContainer>
      <Left>
        {showMenuButton && (
          <MenuButton
            type="button"
            onClick={onMenuToggle}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls="app-sidebar"
          >
            {isMenuOpen ? "Fechar" : "Menu"}
          </MenuButton>
        )}

        <TitleBlock>
          <HeaderTitle>PsiAgenda Local</HeaderTitle>
          <HeaderSubtitle>Gestao local para psicologos</HeaderSubtitle>
        </TitleBlock>
      </Left>
    </HeaderContainer>
  );
};
