"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-lg border border-border bg-surface/50 p-2 opacity-50" />
    );
  }

  const currentTheme = theme || "system";
  const isDark = resolvedTheme === "dark";

  // Cycle through states smoothly:
  // If system: toggle to opposite of current device mode
  // If dark: switch to light
  // If light: switch back to system (auto)
  const handleToggle = () => {
    if (currentTheme === "system") {
      setTheme(isDark ? "light" : "dark");
    } else if (currentTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("system");
    }
  };

  const getTooltip = () => {
    if (currentTheme === "system") {
      return `Auto Mode (Following Device: ${isDark ? "Dark" : "Light"}) • Click to change`;
    }
    return currentTheme === "dark"
      ? "Dark Mode (Manual) • Click for Light"
      : "Light Mode (Manual) • Click for Auto (Device)";
  };

  return (
    <button
      onClick={handleToggle}
      className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-foreground transition-all hover:border-brand/40 hover:bg-surface-hover hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer group"
      aria-label={getTooltip()}
      title={getTooltip()}
    >
      {currentTheme === "system" ? (
        <div className="relative flex items-center justify-center">
          <Monitor className="h-4 w-4 transition-transform duration-200 group-hover:scale-110 text-brand" />
          <span
            className={`absolute -bottom-1 -right-1 h-1.5 w-1.5 rounded-full ring-1 ring-background ${isDark ? "bg-amber-400" : "bg-sky-400"
              }`}
          />
        </div>
      ) : currentTheme === "dark" ? (
        <Moon className="h-4 w-4 transition-transform duration-200 group-hover:-rotate-12 text-amber-400" />
      ) : (
        <Sun className="h-4 w-4 transition-transform duration-200 group-hover:rotate-45 text-amber-500" />
      )}
    </button>
  );
}

export default ThemeToggle;
