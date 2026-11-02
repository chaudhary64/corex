import { useCallback } from "react";
import { useLenis } from "lenis/react";
import { prefersReduced } from "./motion";

/**
 * Breathing room between the sticky header and the section a link lands on.
 * Without it the section's own top edge ends up flush under the header.
 */
const HEADER_GAP = 16;

/** The sticky header is the one element whose height the page never fixes. */
const headerOffset = () => {
  const header = document.querySelector("header");
  return -((header?.offsetHeight ?? 0) + HEADER_GAP);
};

/**
 * Returns a function that scrolls to a section by id.
 *
 * Movement goes through Lenis rather than `scrollIntoView` because the page's
 * scroll position belongs to Lenis: the browser's own smooth scrolling would
 * run on a different clock to the one ScrollTrigger is being updated on, and
 * the sections would arrive with their reveals half-fired. `immediate` is what
 * honours reduced motion - the visitor still lands on the section, it just does
 * not travel there.
 */
export const useSectionScroll = () => {
  const lenis = useLenis();

  return useCallback(
    (id) => {
      const target = document.getElementById(id);
      if (!target) return;

      const reduced = prefersReduced();

      if (lenis) {
        lenis.scrollTo(target, {
          offset: headerOffset(),
          duration: reduced ? 0 : 1.15,
          immediate: reduced,
        });
        return;
      }

      // Lenis is absent only before its instance mounts; a plain jump still
      // has to clear the header.
      window.scrollTo({
        top:
          target.getBoundingClientRect().top +
          window.scrollY +
          headerOffset(),
        behavior: reduced ? "auto" : "smooth",
      });
    },
    [lenis],
  );
};
