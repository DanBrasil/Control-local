import { Card } from "../Card";
import {
  Description,
  Spinner,
  TextBlock,
  Title,
  Wrapper,
} from "./LoadingState.styles";

interface LoadingStateProps {
  title?: string;
  description?: string;
}

export const LoadingState = ({
  title = "Carregando...",
  description,
}: LoadingStateProps) => {
  return (
    <Card>
      <Wrapper role="status" aria-live="polite">
        <Spinner aria-hidden="true" />
        <TextBlock>
          <Title>{title}</Title>
          {description && <Description>{description}</Description>}
        </TextBlock>
      </Wrapper>
    </Card>
  );
};
