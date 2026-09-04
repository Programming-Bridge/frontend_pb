"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export function ThemeSync() {
  const { setTheme } = useTheme();

  useEffect(() => {
    try {
      const syncKey = "pb_theme_auto_v1";
      // Clear any old stuck theme in localStorage so browser/device auto mode works immediately
      if (localStorage.getItem(syncKey) !== "active") {
        localStorage.setItem("theme", "system");
        localStorage.setItem(syncKey, "active");
        setTheme("system");
      }
    } catch (e) {
      // Ignore storage errors
    }

    // Actively listen to device/browser prefers-color-scheme changes in real-time
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const applySystemTheme = (matches: boolean) => {
      const currentTheme = localStorage.getItem("theme");
      if (!currentTheme || currentTheme === "system") {
        if (matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };

    // Apply on mount
    applySystemTheme(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      applySystemTheme(e.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, [setTheme]);

  return null;
}

export default ThemeSync;
