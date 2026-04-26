import {
  CloseButton,
  Description,
  Row,
  Title,
  ToastCard,
  Viewport,
} from "./Toast.styles";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: "success" | "error" | "info";
}

interface ToastProps {
  toasts: ToastItem[];
  onClose: (id: string) => void;
}

export const Toast = ({ toasts, onClose }: ToastProps) => {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <Viewport aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <ToastCard key={toast.id} $variant={toast.variant}>
          <Row>
            <Title>{toast.title}</Title>
            <CloseButton
              type="button"
              onClick={() => onClose(toast.id)}
              aria-label="Fechar notificação"
            >
              x
            </CloseButton>
          </Row>
          {toast.description && <Description>{toast.description}</Description>}
        </ToastCard>
      ))}
    </Viewport>
  );
};
