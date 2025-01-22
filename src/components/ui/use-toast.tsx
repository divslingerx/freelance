import { createContext, useContext, useState } from "react";

type Toast = {
  variant: "default" | "destructive";
  title: string;
  description: string;
};

type ToastContextType = {
  toast: (toast: Toast) => void;
};

const ToastContext = createContext<ToastContextType>({
  toast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (newToast: Toast) => {
    setToast(newToast);
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <ToastContext.Provider value={{ toast: showToast }}>
      {children}
      {toast && (
        <div className={`toast toast-${toast.variant}`}>
          <h3>{toast.title}</h3>
          <p>{toast.description}</p>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
