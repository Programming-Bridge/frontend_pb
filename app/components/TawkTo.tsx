"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useTheme } from "next-themes";

export function TawkTo() {
  const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID?.trim();
  const widgetId = (process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || "default").trim();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const isDark =
      resolvedTheme === "dark" ||
      (typeof document !== "undefined" &&
        document.documentElement.classList.contains("dark"));

    const applyThemeFilter = () => {
      // Target all iframes created by Tawk.to
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

    // Apply immediately and listen to DOM changes / load events
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

  if (!propertyId) {
    return null;
  }

  const embedUrl = propertyId.startsWith("http")
    ? propertyId
    : `https://embed.tawk.to/${propertyId}/${widgetId}`;

  return (
    <Script
      id="tawk-to-widget"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
          (function(){
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = '${embedUrl}';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
          })();
        `,
      }}
    />
  );
}

export default TawkTo;
