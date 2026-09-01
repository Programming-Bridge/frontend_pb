"use client";

import { AlertTriangle, Trash2, X, Loader2 } from "lucide-react";

export interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title: string;
  itemName?: string;
  isDeleting?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDeleteModal({
  isOpen,
  title,
  itemName,
  isDeleting = false,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={isDeleting ? undefined : onCancel}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-2xl transition-all">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500 dark:bg-rose-500/15">
            <AlertTriangle className="h-6 w-6" />
          </div>

          <div className="flex-1">
            <h3 className="text-base font-bold text-foreground">{title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-foreground-muted">
              {itemName ? (
                <>
                  Are you sure you want to permanently delete{" "}
                  <span className="font-semibold text-foreground">"{itemName}"</span>? This action cannot be undone.
                </>
              ) : (
                "Are you sure you want to delete this record? This action cannot be undone."
              )}
            </p>
          </div>

          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="rounded-lg p-1.5 text-foreground-muted hover:bg-surface-hover hover:text-foreground transition-colors disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="w-full sm:w-auto rounded-xl border border-border bg-surface px-4 py-2.5 sm:py-2 text-xs font-semibold text-foreground hover:bg-surface-hover transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 sm:py-2 text-xs font-bold text-white shadow-lg shadow-rose-600/20 hover:bg-rose-500 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete Permanently</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
