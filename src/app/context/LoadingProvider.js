"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState({
    state: true,
    animated: false,
  });
  const [assetsCounted, setAssetsCounted] = useState(0);

  useEffect(() => {
    const maxTimeout = setTimeout(() => {
      setLoading((prev) => ({ ...prev, state: false }));
    }, 5000);

    return () => clearTimeout(maxTimeout);
  }, []);

  useEffect(() => {
    if (!loading.state) return;

    // Total Images in this app: 6
    if (assetsCounted < 6) return;

    Promise.all([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, 1000)),
    ]).then(() => {
      setLoading((prev) => ({ ...prev, animated: true }));
    });
  }, [assetsCounted, loading]);

  return (
    <LoadingContext.Provider
      value={{ loading, setLoading, assetsCounted, setAssetsCounted }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }

  return context;
}
