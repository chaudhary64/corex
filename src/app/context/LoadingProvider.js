"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const LoadingContext = createContext();

const IMAGE_URLS = [
  "https://images.unsplash.com/photo-1584863231364-2edc166de576?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "/logo/Star_Logo.svg",
  "https://images.unsplash.com/photo-1642267165393-951c20e0a8b8?q=80&w=1154&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1534368270820-9de3d8053204?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1585892478726-d26363dbf9e8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1685633224306-2a2b37050713?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState({
    state: true,
    animated: false,
  });
  const [assetsCounted, setAssetsCounted] = useState(0);
  const completionStarted = useRef(false);

  // Preload images programmatically on mount
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    const loadAssets = async () => {
      const imagePromises = IMAGE_URLS.map((src) => {
        return new Promise((resolve) => {
          const img = new window.Image();

          const handleComplete = () => {
            if (!isCancelled) {
              loadedCount++;
              setAssetsCounted(loadedCount);
            }
            resolve();
          };

          img.onload = handleComplete;
          img.onerror = handleComplete;
          img.src = src;

          // If the image is already complete (e.g. cached), resolve immediately
          if (img.complete) {
            img.onload = null;
            img.onerror = null;
            handleComplete();
          }
        });
      });

      await Promise.all(imagePromises);
      if (isCancelled) return;

      completionStarted.current = true;

      const fontsPromise = document.fonts ? document.fonts.ready : Promise.resolve();

      await Promise.all([
        fontsPromise,
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);

      if (isCancelled) return;

      setLoading((prev) => ({ ...prev, state: false }));
    };

    loadAssets();

    const maxTimeout = setTimeout(() => {
      if (!isCancelled) {
        console.warn("Loading taking too long, forcing completion.");
        isCancelled = true;
        setLoading((prev) => ({ ...prev, state: false }));
      }
    }, 5000);

    return () => {
      isCancelled = true;
      clearTimeout(maxTimeout);
    };
  }, []);

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
