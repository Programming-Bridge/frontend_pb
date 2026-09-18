"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface StatusOption {
  value: string;
  label: string;
  badgeClass: string; // e.g. "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
  dotClass: string;   // e.g. "bg-emerald-400"
}

interface StatusDropdownProps {
  value: string;
  options: StatusOption[];
  onChange: (newValue: string) => void;
  disabled?: boolean;
  className?: string;
}

export function StatusDropdown({
  value,
  options,
  onChange,
  disabled = false,
  className = "",
}: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption =
    options.find((opt) => opt.value.toLowerCase() === (value || "").toLowerCase()) ||
    options[0] || {
      value,
      label: value,
      badgeClass: "bg-surface border-border text-foreground-muted",
      dotClass: "bg-foreground-muted",
    };

  // Close when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (newVal: string) => {
    if (newVal !== value) {
      onChange(newVal);
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group flex items-center justify-between gap-2 rounded-xl border px-2.5 py-1 text-[11px] font-bold transition-all cursor-pointer select-none ${
          currentOption.badgeClass
        } ${disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-110 active:scale-[0.98]"}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-1.5 truncate">
          <span className={`h-1.5 w-1.5 rounded-full ${currentOption.dotClass} shrink-0 animate-pulse`} />
          <span className="truncate">{currentOption.label}</span>
        </span>
        <ChevronDown
          className={`h-3 w-3 shrink-0 opacity-70 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Floating Popover Menu */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-1.5 min-w-[155px] origin-top-right rounded-2xl border border-border bg-[#0b0f19]/95 p-1.5 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider text-foreground-subtle border-b border-border/50 mb-1">
            Update Status
          </div>
          <div className="space-y-0.5" role="listbox">
            {options.map((option) => {
              const isSelected = option.value.toLowerCase() === (value || "").toLowerCase();
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full flex items-center justify-between gap-2 rounded-xl px-2.5 py-1.5 text-left text-xs font-semibold transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-surface-hover text-foreground font-bold"
                      : "text-foreground-muted hover:bg-surface-hover/70 hover:text-foreground"
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span className={`h-2 w-2 rounded-full ${option.dotClass} shrink-0`} />
                    <span className="truncate">{option.label}</span>
                  </span>
                  {isSelected && <Check className="h-3.5 w-3.5 text-brand shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
