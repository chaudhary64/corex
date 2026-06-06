"use client";

import React, { useRef } from "react";

const Image = ({ ref, src, ...props }) => {
  const imgRef = useRef(null);

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
      src={src}
      loading="eager"
      // fetchpriority="high"
      {...props}
    />
  );
};

export default Image;
