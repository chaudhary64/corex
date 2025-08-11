"use client";
import React, { useEffect, useRef } from "react";
import Nav from "./components/ui/Nav";
import Footer from "./components/ui/Footer";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";

const template = ({ children }) => {
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);
  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
        <Nav />
        {children}
        <Footer />
      </ReactLenis>
    </>
  );
};

export default template;
