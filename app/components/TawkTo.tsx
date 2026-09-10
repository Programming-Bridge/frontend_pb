"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

declare global {
  interface Window {
    Tawk_API?: Record<string, any>;
    Tawk_LoadStart?: Date;
  }
}

export function TawkTo() {
  const propertyId =
    process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID?.trim() || "6a9eabc827a69434428b8879";
  const widgetId =
    process.env.NEXT_PUBLIC_TAWK_WIDGET_ID?.trim() || "1k1tsu280";
  const { resolvedTheme } = useTheme();

  // 1. Deferred Script Injection (Finding 3: recovered main thread for fast first paint)
  useEffect(() => {
    if (!propertyId || typeof window === "undefined") return;

    const loadTawkScript = () => {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_API.onLoad = function () {
        try {
          if (typeof window.Tawk_API?.hideWidget === "function") {
            window.Tawk_API.hideWidget();
          }
        } catch (e) {}
      };
      window.Tawk_LoadStart = new Date();

      const scriptId = "tawk-to-script";
      let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;

      if (!scriptElement) {
        const embedUrl = propertyId.startsWith("http")
          ? propertyId
          : `https://embed.tawk.to/${propertyId}/${widgetId}`;

        scriptElement = document.createElement("script");
        scriptElement.id = scriptId;
        scriptElement.async = true;
        scriptElement.src = embedUrl;
        scriptElement.charset = "UTF-8";
        scriptElement.setAttribute("crossorigin", "*");

        scriptElement.onload = () => {
          if (typeof window !== "undefined" && (window as any).$_Tawk && !(window as any).$_Tawk.init) {
            try {
              window.dispatchEvent(new Event("load"));
            } catch (e) {}
          }
        };

        const firstScript = document.getElementsByTagName("script")[0];
        if (firstScript && firstScript.parentNode) {
          firstScript.parentNode.insertBefore(scriptElement, firstScript);
        } else {
          document.head.appendChild(scriptElement);
        }
      }
    };

    let idleId: number | null = null;
    let timerId: NodeJS.Timeout | null = null;

    if ("requestIdleCallback" in window) {
      idleId = (window as any).requestIdleCallback(loadTawkScript, { timeout: 3500 });
    } else {
      timerId = setTimeout(loadTawkScript, 2000);
    }

    const onUserInteraction = () => {
      loadTawkScript();
      window.removeEventListener("scroll", onUserInteraction);
      window.removeEventListener("pointerdown", onUserInteraction);
    };

    window.addEventListener("scroll", onUserInteraction, { once: true, passive: true });
    window.addEventListener("pointerdown", onUserInteraction, { once: true, passive: true });

    return () => {
      if (idleId !== null && "cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback(idleId);
      }
      if (timerId) clearTimeout(timerId);
      window.removeEventListener("scroll", onUserInteraction);
      window.removeEventListener("pointerdown", onUserInteraction);
    };
  }, [propertyId, widgetId]);

  // 2. Dark / Light Mode Theme Filter Synchronizer
  useEffect(() => {
    const isDark =
      resolvedTheme === "dark" ||
      (typeof document !== "undefined" &&
        document.documentElement.classList.contains("dark"));

    const applyThemeFilter = () => {
      const allIframes = document.querySelectorAll<HTMLIFrameElement>("iframe");
      allIframes.forEach((iframe) => {
        const src = iframe.getAttribute("src") || "";
        const title = (iframe.getAttribute("title") || "").toLowerCase();
        const id = (iframe.getAttribute("id") || "").toLowerCase();
        const name = (iframe.getAttribute("name") || "").toLowerCase();
        const parent = iframe.parentElement;
        const parentStyle = parent ? parent.getAttribute("style") || "" : "";
        const iframeStyle = iframe.getAttribute("style") || "";

        const isTawk =
          src.includes("tawk.to") ||
          title.includes("chat") ||
          title.includes("tawk") ||
          id.includes("tawk") ||
          name.includes("tawk") ||
          parentStyle.includes("2147483647") ||
          iframeStyle.includes("2147483647");

        if (isTawk) {
          if (isDark) {
            iframe.style.setProperty(
              "filter",
              "invert(0.92) hue-rotate(180deg) brightness(0.95) contrast(1.05)",
              "important"
            );
            iframe.style.setProperty("border-radius", "16px", "important");
          } else {
            iframe.style.removeProperty("filter");
          }
        }
      });
    };

    applyThemeFilter();
    const timer = setInterval(applyThemeFilter, 500);

    const observer = new MutationObserver(applyThemeFilter);
    if (typeof document !== "undefined" && document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, [resolvedTheme]);

  return null;
}

export default TawkTo;

