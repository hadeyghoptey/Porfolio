"use client";

import { useEffect, useState } from "react";
import RouteLoading from "@/components/RouteLoading";
import styles from "./home-first-load-gate.module.css";

export const HOMEPAGE_LOADER_STORAGE_KEY = "portfolio-home-loader-shown";
export const HOMEPAGE_LOADER_DURATION_MS = 1200;

export default function HomeFirstLoadGate({ children }) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const hasShownLoader =
      window.sessionStorage.getItem(HOMEPAGE_LOADER_STORAGE_KEY) === "true";

    if (hasShownLoader) {
      setShowLoader(false);
      return undefined;
    }

    window.sessionStorage.setItem(HOMEPAGE_LOADER_STORAGE_KEY, "true");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShowLoader(false);
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setShowLoader(false);
    }, HOMEPAGE_LOADER_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className={styles.shell}>
      <div
        className={styles.content}
        data-loading={showLoader ? "true" : "false"}
        aria-hidden={showLoader}
      >
        {children}
      </div>

      {showLoader ? (
        <div className={styles.overlay}>
          <RouteLoading label="Loading homepage" />
        </div>
      ) : null}
    </div>
  );
}
