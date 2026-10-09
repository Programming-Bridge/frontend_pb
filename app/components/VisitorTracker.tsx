"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackVisit } from "@/app/services/visitorService";

function TrackerContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedRef = useRef<string>("");

  useEffect(() => {
    // Avoid double tracking if path didn't change
    const fullPath =
      pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    if (lastTrackedRef.current === fullPath) {
      return;
    }
    lastTrackedRef.current = fullPath;

    // Retrieve or create persistent anonymous Visitor ID
    let visitorId = "";
    try {
      visitorId = localStorage.getItem("pb_visitor_uid") || "";
      if (!visitorId) {
        visitorId =
          "pb_" +
          Math.random().toString(36).substring(2, 11) +
          "_" +
          Date.now().toString(36);
        localStorage.setItem("pb_visitor_uid", visitorId);
      }
    } catch (e) {
      // Storage access disabled / private mode
      visitorId = "anon_" + Date.now();
    }

    const screenResolution =
      typeof window !== "undefined"
        ? `${window.screen.width}x${window.screen.height}`
        : "";
    const referrer =
      typeof document !== "undefined" && document.referrer
        ? document.referrer
        : "Direct";
    const language =
      typeof navigator !== "undefined" ? navigator.language : "en";

    // Non-blocking fire and forget tracking
    trackVisit({
      path: fullPath,
      referrer,
      visitorId,
      screenResolution,
      language,
    }).catch(() => {
      // Silently ignore network or API errors
    });
  }, [pathname, searchParams]);

  return null;
}

export function VisitorTracker() {
  return (
    <Suspense fallback={null}>
      <TrackerContent />
    </Suspense>
  );
}

