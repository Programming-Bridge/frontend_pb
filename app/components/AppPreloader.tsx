"use client";

import { useEffect, useState } from "react";
import { ProgrammingBridgeLoader } from "./ProgrammingBridgeLoader";

export function AppPreloader() {
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    // Smooth initial branding splash / data preloader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 850);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !loading) return null;

  return <ProgrammingBridgeLoader fullScreen={true} />;
}

export default AppPreloader;
