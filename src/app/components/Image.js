"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLoading } from "../context/LoadingProvider";

const Image = ({ ref, ...props }) => {
  const { setAssetsCounted } = useLoading();
  const imgRef = useRef(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleLoad = () => {
    if (!hasLoaded) {
      setHasLoaded(true);
      setAssetsCounted((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      handleLoad();
    }
  }, []);

  return (
    <img
      ref={(el) => {
        imgRef.current = el;
        if (ref) {
          if (typeof ref === "function") {
            ref(el);
          } else {
            ref.current = el;
          }
        }
      }}
      loading="eager"
      {...props}
      onLoad={(e) => {
        handleLoad();
        if (props.onLoad) {
          props.onLoad(e);
        }
      }}
    />
  );
};

export default Image;
