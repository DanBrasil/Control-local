import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { Toast, type ToastItem } from "../../components/Toast";

type ToastVariant = "success" | "error" | "info";

interface ShowToastInput {
  title: string;
  description?: string;
  variant?: ToastVariant;
  durationMs?: number;
}

interface ToastContextValue {
  showToast: (input: ShowToastInput) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION_MS = 3200;

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timeoutsRef = useRef<Record<string, number>>({});

  const dismiss = useCallback((id: string) => {
    const timeoutId = timeoutsRef.current[id];
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      delete timeoutsRef.current[id];
    }

    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({ title, description, variant = "info", durationMs }: ShowToastInput) => {
      const id = crypto.randomUUID();
      const nextToast: ToastItem = {
        id,
        title,
        description,
        variant,
      };

      setToasts((current) => [...current, nextToast]);

      const timeoutId = window.setTimeout(() => {
        dismiss(id);
      }, durationMs ?? DEFAULT_DURATION_MS);

      timeoutsRef.current[id] = timeoutId;
    },
    [dismiss],
  );

  const value = useMemo<ToastContextValue>(() => {
    return {
      showToast,
      success: (title, description) => {
        showToast({ title, description, variant: "success" });
      },
      error: (title, description) => {
        showToast({ title, description, variant: "error" });
      },
      info: (title, description) => {
        showToast({ title, description, variant: "info" });
      },
    };
  }, [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast toasts={toasts} onClose={dismiss} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
};
