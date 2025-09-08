import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast måste användas inne i <ToastProvider>");
  return ctx;
}

let idCounter = 0;

const TYPE_STYLES = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-blue-600",
  warning: "bg-yellow-600",
};

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback((message, { type = "success", duration = 2500 } = {}) => {
    const id = ++idCounter;
    const toast = { id, message, type };
    setToasts((prev) => [...prev, toast]);
    // auto remove
    window.setTimeout(() => remove(id), duration);
    return id;
  }, [remove]);

  const value = useMemo(() => ({ showToast: show, hideToast: remove }), [show, remove]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="fixed right-4 top-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`text-white ${TYPE_STYLES[t.type] ?? TYPE_STYLES.success} shadow-lg rounded-lg px-4 py-3 min-w-[240px]`}
          >
            <div className="flex items-start gap-3">
              <span className="text-sm font-medium">{t.message}</span>
              <button
                onClick={() => remove(t.id)}
                className="ml-auto opacity-80 hover:opacity-100"
                aria-label="Stäng"
                title="Stäng"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
