import { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis moves the page on its own clock, so ScrollTrigger has to be told to
 * re-read the scroll position on the same frame. This has to be a stable
 * reference: `useLenis` re-registers whenever the callback identity changes.
 */
const syncScrollTrigger = (lenis) => {
  lenis.on("scroll", ScrollTrigger.update);
};

export default function SmoothScroller({ children }) {
  const lenisRef = useRef(null);

  /*
   * Lenis is created inside ReactLenis's own effect, so reading
   * `lenisRef.current.lenis` synchronously on mount yields nothing and the
   * ScrollTrigger binding silently never happened. Subscribing is what makes it
   * work regardless of when the instance arrives.
   */
  useLenis(syncScrollTrigger);

  useEffect(() => {
    const update = (time) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => gsap.ticker.remove(update);
  }, []);

  /*
   * Smoothed scrolling is motion the visitor did not ask for. When they have
   * asked for less, wheel input reverts to the browser's own scrolling; touch
   * is already native. Kept on the live options object so toggling the OS
   * setting does not rebuild the instance and lose the scroll position.
   */
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
