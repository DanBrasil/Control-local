import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { ConfirmDialog } from "../../components/ConfirmDialog";

interface ConfirmDialogOptions {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

interface ConfirmDialogState extends ConfirmDialogOptions {
  isOpen: boolean;
}

interface ConfirmDialogContextValue {
  confirm: (options: ConfirmDialogOptions) => Promise<boolean>;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextValue | null>(
  null,
);

const initialState: ConfirmDialogState = {
  isOpen: false,
  title: "",
  description: "",
  confirmLabel: "Confirmar",
  cancelLabel: "Cancelar",
};

export const ConfirmDialogProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<ConfirmDialogState>(initialState);
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(
    null,
  );

  const close = useCallback(
    (value: boolean) => {
      if (resolver) {
        resolver(value);
      }

      setResolver(null);
      setState(initialState);
    },
    [resolver],
  );

  const confirm = useCallback((options: ConfirmDialogOptions) => {
    setState({
      isOpen: true,
      title: options.title,
      description: options.description,
      confirmLabel: options.confirmLabel ?? "Excluir",
      cancelLabel: options.cancelLabel ?? "Cancelar",
    });

    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
  }, []);

  const value = useMemo<ConfirmDialogContextValue>(() => {
    return { confirm };
  }, [confirm]);

  return (
    <ConfirmDialogContext.Provider value={value}>
      {children}
      <ConfirmDialog
        isOpen={state.isOpen}
        title={state.title}
        description={state.description}
        confirmLabel={state.confirmLabel ?? "Excluir"}
        cancelLabel={state.cancelLabel ?? "Cancelar"}
        onConfirm={() => close(true)}
        onCancel={() => close(false)}
      />
    </ConfirmDialogContext.Provider>
  );
};

export const useConfirmDialog = () => {
  const context = useContext(ConfirmDialogContext);

  if (!context) {
    throw new Error(
      "useConfirmDialog must be used inside ConfirmDialogProvider",
    );
  }

  return context;
};
