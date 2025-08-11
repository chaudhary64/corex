"use client";
import React, { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";

const SmoothScroller = ({ children }) => {
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);
  return (
    <ReactLenis
      root
      options={{ autoRaf: false, wheelMultiplier: 0.5, touchMultiplier: 0.5 }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScroller;
