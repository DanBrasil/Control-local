import { Button } from "../Button";
import {
  Actions,
  Backdrop,
  Description,
  Dialog,
  Title,
} from "./ConfirmDialog.styles";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog = ({
  isOpen,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Backdrop role="presentation" onClick={onCancel}>
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <Title id="confirm-dialog-title">{title}</Title>
        <Description>{description}</Description>
        <Actions>
          <Button type="button" variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button type="button" variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </Actions>
      </Dialog>
    </Backdrop>
  );
};
