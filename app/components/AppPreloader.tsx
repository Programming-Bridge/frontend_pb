"use client";

import { useEffect, useState } from "react";
import { ProgrammingBridgeLoader } from "./ProgrammingBridgeLoader";

export function AppPreloader() {
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    // Suppress third-party Chrome/EVM browser wallet extension injection errors
    const handleError = (event: ErrorEvent) => {
      const msg = event.message || "";
      const filename = event.filename || "";
      if (
        msg.includes("Cannot redefine property: ethereum") ||
        msg.includes("ethereum") ||
        filename.includes("chrome-extension://") ||
        filename.includes("moz-extension://") ||
        filename.includes("evmMask.js")
      ) {
        event.stopImmediatePropagation();
        event.preventDefault();
        return true;
      }
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason?.message || String(event.reason || "");
      if (
        reason.includes("Cannot redefine property: ethereum") ||
        reason.includes("ethereum") ||
        reason.includes("chrome-extension://")
      ) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    };

    window.addEventListener("error", handleError, true);
    window.addEventListener("unhandledrejection", handleRejection, true);

    // Smooth initial branding splash / data preloader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 850);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("error", handleError, true);
      window.removeEventListener("unhandledrejection", handleRejection, true);
    };
  }, []);

  if (!mounted || !loading) return null;

  return <ProgrammingBridgeLoader fullScreen={true} />;
}

export default AppPreloader;

