import { Button } from "../Button";
import { Card } from "../Card";
import { ActionWrap, Description, Title, Wrapper } from "./EmptyState.styles";

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <Card>
      <Wrapper>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
        {actionLabel && onAction && (
          <ActionWrap>
            <Button variant="secondary" size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          </ActionWrap>
        )}
      </Wrapper>
    </Card>
  );
};
