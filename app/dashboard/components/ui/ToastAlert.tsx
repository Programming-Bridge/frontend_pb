"use client";

import { CheckCircle2, AlertCircle, X, Info } from "lucide-react";

export interface ToastProps {
  type: "success" | "error" | "info";
  message: string;
  onClose: () => void;
}

export function ToastAlert({ type, message, onClose }: ToastProps) {
  const isSuccess = type === "success";
  const isError = type === "error";

  return (
    <div
      role="alert"
      className={`fixed top-5 right-5 z-[9999] flex max-w-md items-center gap-3 rounded-2xl px-4 py-3.5 text-xs font-semibold shadow-2xl border backdrop-blur-xl transition-all duration-300 animate-in slide-in-from-top-4 ${
        isSuccess
          ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
          : isError
          ? "bg-rose-500/15 border-rose-500/30 text-rose-700 dark:text-rose-300"
          : "bg-cyan-500/15 border-cyan-500/30 text-cyan-700 dark:text-cyan-300"
      }`}
    >
      {isSuccess && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />}
      {isError && <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />}
      {!isSuccess && !isError && <Info className="h-4 w-4 shrink-0 text-cyan-500" />}

      <span className="flex-1 leading-snug">{message}</span>

      <button
        onClick={onClose}
        aria-label="Dismiss notification"
        className="ml-2 rounded-lg p-1 text-foreground-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
