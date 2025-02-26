import { useCallback, useMemo, useState } from "react";
import { ToastContext } from "./ToastContext";
import Toast from "../components/Toast";

type ToastType = {
  id: string;
  message: string;
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const open = (message: string) => {
    const newToast = {
      id: crypto.randomUUID(),
      message,
    };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  const close = useCallback(
    (idToast: string) => {
      const toastIndex = toasts.findIndex((toast) => toast.id === idToast);
      const newToasts = [...toasts];
      newToasts.splice(toastIndex, 1);
      setToasts(newToasts);
    },
    [toasts]
  );

  const valueContext = useMemo(() => {
    return {
      open,
      close,
    };
  }, [close]);

  return (
    <ToastContext.Provider value={valueContext}>
      {children}
      {toasts && (
        <div className="flex flex-col gap-3 fixed z-50 bottom-4 right-4">
          {toasts.map((toast) => {
            return (
              <Toast
                key={toast.id}
                close={() => close(toast.id)}
                message={toast.message}
              />
            );
          })}
        </div>
      )}
    </ToastContext.Provider>
  );
}
