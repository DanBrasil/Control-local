import { Button } from "../Button";
import { Card } from "../Card";
import { ActionWrap, Description, Title, Wrapper } from "./ErrorState.styles";

interface ErrorStateProps {
  title?: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const ErrorState = ({
  title = "Algo deu errado",
  description,
  actionLabel,
  onAction,
}: ErrorStateProps) => {
  return (
    <Card>
      <Wrapper role="alert">
        <Title>{title}</Title>
        <Description>{description}</Description>
        {actionLabel && onAction && (
          <ActionWrap>
            <Button variant="danger" size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          </ActionWrap>
        )}
      </Wrapper>
    </Card>
  );
};
