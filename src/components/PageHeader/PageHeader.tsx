import {
  Description,
  HeaderWrapper,
  Title,
  TitleBlock,
} from "./PageHeader.styles";
import type { PageHeaderProps } from "./PageHeader.types";

export const PageHeader = ({ title, description, action }: PageHeaderProps) => {
  return (
    <HeaderWrapper>
      <TitleBlock>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
      </TitleBlock>
      {action}
    </HeaderWrapper>
  );
};
