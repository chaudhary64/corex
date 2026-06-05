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
    const activeImages = [];
    IMAGE_URLS.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setAssetsCounted((prev) => prev + 1);
      };
      img.onerror = () => {
        setAssetsCounted((prev) => prev + 1);
      };
      activeImages.push(img);
    });

    return () => {
      activeImages.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  useEffect(() => {
    const maxTimeout = setTimeout(() => {
      console.warn("Loading taking too long, forcing completion.");
      setLoading((prev) => ({ ...prev, state: false }));
    }, 5000);

    return () => clearTimeout(maxTimeout);
  }, []);

  useEffect(() => {
    if (!loading.state || completionStarted.current) return;

    // Total Images in this app: 6
    if (assetsCounted < IMAGE_URLS.length) return;

    completionStarted.current = true;

    const fontsPromise = document.fonts ? document.fonts.ready : Promise.resolve();

    Promise.all([
      fontsPromise,
      new Promise((resolve) => setTimeout(resolve, 1000)),
    ]).then(() => {
      setLoading((prev) => ({ ...prev, state: false }));
    });
  }, [assetsCounted, loading.state]);

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
