import { createContext, useContext, useEffect, useRef, useState } from "react";
import { heroImage, whyChooseUsData } from "@/app/data/homeData";

const LoadingContext = createContext();

const IMAGE_URLS = [heroImage, ...whyChooseUsData.map((item) => item.src)];

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState({
    state: true,
    revealed: false,
    animated: false,
  });
  const [assetsCounted, setAssetsCounted] = useState(0);
  const completionStarted = useRef(false);

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
        isCancelled = true;
        setLoading((prev) => ({ ...prev, state: false, revealed: true }));
      }
    }, 8000);

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
