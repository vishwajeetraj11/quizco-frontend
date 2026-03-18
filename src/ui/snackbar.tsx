import React, { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";

type SnackbarVariant = "default" | "error" | "info" | "success" | "warning";

type SnackbarOptions = {
  variant?: SnackbarVariant;
};

type SnackbarItem = {
  id: number;
  message: ReactNode;
  variant: SnackbarVariant;
};

type SnackbarContextValue = {
  enqueueSnackbar: (message: ReactNode, options?: SnackbarOptions) => void;
};

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

const variantClasses: Record<SnackbarVariant, string> = {
  default: "border-gray-200 bg-white text-gray-800",
  error: "border-rose-200 bg-rose-50 text-rose-700",
  info: "border-sky-200 bg-sky-50 text-sky-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
};

export const SnackbarProvider = ({
  children,
  maxSnack = 3,
}: {
  children: ReactNode;
  maxSnack?: number;
}) => {
  const [snacks, setSnacks] = useState<SnackbarItem[]>([]);

  const removeSnack = useCallback((id: number) => {
    setSnacks((current) => current.filter((snack) => snack.id !== id));
  }, []);

  const enqueueSnackbar = useCallback(
    (message: ReactNode, options?: SnackbarOptions) => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      const item: SnackbarItem = {
        id,
        message,
        variant: options?.variant || "default",
      };

      setSnacks((current) => current.concat(item).slice(-maxSnack));
      window.setTimeout(() => removeSnack(id), 3500);
    },
    [maxSnack, removeSnack]
  );

  const value = useMemo(
    () => ({
      enqueueSnackbar,
    }),
    [enqueueSnackbar]
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[1200] flex w-[min(92vw,24rem)] flex-col gap-3">
        {snacks.map((snack) => (
          <div
            className={`pointer-events-auto rounded-lg border px-4 py-3 text-sm font-medium shadow-lg ${variantClasses[snack.variant]}`}
            key={snack.id}
            role="status"
          >
            {snack.message}
          </div>
        ))}
      </div>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("useSnackbar must be used within SnackbarProvider");
  }

  return context;
};
