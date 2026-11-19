import { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroller({ children }) {
  const lenisRef = useRef(null);

  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  useEffect(() => {
    const update = (time) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => gsap.ticker.remove(update);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      const lenis = lenisRef.current?.lenis;
      if (lenis) lenis.options.smoothWheel = !reduceMotion.matches;
    };

    apply();
    reduceMotion.addEventListener("change", apply);

    return () => reduceMotion.removeEventListener("change", apply);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        wheelMultiplier: 0.5,
        touchMultiplier: 0.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
