/**
 * Freezes the page behind a full-screen overlay.
 *
 * `overflow: hidden` on the root stops wheel, touch, keyboard and scrollbar
 * scrolling. Unlike `overflow: clip` it leaves the root a scroll container, so
 * the visitor's scroll position survives and Lenis keeps its target in step.
 * Removing the scrollbar would reflow the page by its width, so the same amount
 * is added back as padding.
 *
 * Both calls are idempotent, so a stray unlock can never move the page.
 */

let locked = false;
let lockedScroll = 0;

export const lockPageScroll = () => {
  if (locked) return;
  locked = true;

  const root = document.documentElement;
  lockedScroll = window.scrollY;

  // Measured while the scrollbar is still there.
  const gutter = window.innerWidth - root.clientWidth;
  if (gutter > 0) root.style.paddingRight = `${gutter}px`;

  root.style.overflow = "hidden";
};

export const unlockPageScroll = () => {
  if (!locked) return;
  locked = false;

  const root = document.documentElement;
  root.style.removeProperty("overflow");
  root.style.removeProperty("padding-right");

  // A couple of engines clamp the offset while the root cannot scroll.
  window.scrollTo(0, lockedScroll);
};
