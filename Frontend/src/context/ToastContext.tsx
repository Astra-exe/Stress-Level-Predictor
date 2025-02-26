import React from "react";

interface ToastContextVal {
  open: (meesage: string) => void;
  close: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextVal | null>(null);

function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export { ToastContext, useToast };
