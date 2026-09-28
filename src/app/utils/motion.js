import { useEffect } from "react";

/**
 * The site's single motion vocabulary. Every animation pulls its timing from
 * here so the sections read as one hand rather than twelve, and so the
 * reduced-motion path can be reasoned about in one place.
 */

/** Deceleration curves. Arrivals are exponential; nothing bounces by reflex. */
export const EASE = {
  /** Standard reveal deceleration. */
  out: "power2.out",
  /** Confident arrival — reserved for the page's loudest moments. */
  outStrong: "power4.out",
  /** Wipes, curtains and clip-path travel. */
  inOut: "power2.inOut",
  /** Small state changes: accordions, opacity-only feedback. */
  soft: "power1.out",
  /** Anything leaving; exits run faster than entrances. */
  in: "power2.in",
};

/** Durations in seconds, chosen by what the transition communicates. */
export const DUR = {
  /** Immediate acknowledgement. */
  micro: 0.18,
  /** Routine state change. */
  quick: 0.32,
  /** Layout, overlay or view transition. */
  state: 0.5,
  /** Authored entrance. */
  reveal: 0.85,
  /** A full-bleed panel wiping away from what it was covering. */
  wipe: 1.2,
  /** The preloader curtain. */
  curtain: 0.9,
  /** Reduced-motion replacement for a travelling entrance. */
  fade: 0.25,
};

/**
 * ScrollTrigger start positions. Kept consistent across sections so the page
 * reveals in a steady rhythm instead of firing at a different offset each time.
 */
export const START = {
  /** Headings and large blocks. */
  block: "top 85%",
  /** Rows, cards and small items. */
  item: "top 88%",
};

/** How far a revealing element travels, in px. */
export const RISE = 32;

/**
 * The settled, visible state every reveal ends on. The reduced-motion path
 * applies this verbatim so nothing is left stranded mid-transform.
 */
export const SHOWN = {
  autoAlpha: 1,
  x: 0,
  y: 0,
  xPercent: 0,
  yPercent: 0,
  scale: 1,
};

/** True when the visitor has asked their system for less motion. */
export const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Caps a per-item stagger so a long heading can never turn its reveal into a
 * slow crawl: the total delay across every item stays within `cap` seconds.
 */
export const staggerFor = (count, perItem, cap = 0.5) =>
  count > 1 ? Math.min(perItem, cap / (count - 1)) : 0;

/**
 * Stops an infinite CSS animation while its element is offscreen or the tab is
 * in the background. The marquees are decorative loops, so they should never
 * cost frames where nobody can see them.
 */
export const useOffscreenPause = (ref) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let onScreen = true;
    let tabVisible = !document.hidden;

    const apply = () => {
      el.dataset.loopPaused = onScreen && tabVisible ? "false" : "true";
    };

    apply();

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        apply();
      },
      { rootMargin: "120px" },
    );

    observer.observe(el);

    const onVisibilityChange = () => {
      tabVisible = !document.hidden;
      apply();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [ref]);
};
