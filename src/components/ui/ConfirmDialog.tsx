import React from "react";
import { Button } from "./Button";

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "danger" | "warning" | "espresso";
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmText = "Ya, Lanjutkan",
  cancelText = "Batal",
  onConfirm,
  onCancel,
  variant = "danger",
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const isDanger = variant === "danger";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#4E3C44]/60 backdrop-blur-sm animate-fade-in select-none">
      <div 
        className="bg-[#FCF8F7] border border-[#4E3C44]/15 rounded-2xl shadow-2xl max-w-sm w-full relative overflow-hidden animate-slide-up"
      >
        {/* Top Accent Bar */}
        <div className={`h-1.5 w-full ${isDanger ? "bg-[#D9455B]" : "bg-[#4E3C44]"}`} />

        <div className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5 text-center">
            <h3 className="font-black text-[#4E3C44] text-lg tracking-wide flex items-center justify-center gap-2">
              {isDanger ? "⚠️" : "❓"} {title}
            </h3>
            <p className="text-xs font-semibold text-[#4E3C44]/70 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-white border border-[#4E3C44]/10 text-[#4E3C44]/70 hover:bg-[#F3E2DC] hover:text-[#4E3C44] transition-all"
            >
              {cancelText}
            </button>
            <Button
              onClick={() => {
                onConfirm();
              }}
              variant={isDanger ? "cherry" : "espresso"}
              className="flex-1 py-2.5 text-xs"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
