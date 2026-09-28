import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useCallback, useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { DUR, EASE, prefersReduced } from "@/app/utils/motion";
import { lockPageScroll, unlockPageScroll } from "@/app/utils/scrollLock";

const NAV_LINKS = ["Home", "Trainers", "Programs", "Experiences", "Pricing"];

const MOBILE_NAV_CLOSED = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
const MOBILE_NAV_OPEN = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

/*
 * Page layers, lowest first: the page (up to z-10), the sticky header, the
 * full-screen menu, the preloader.
 */
const Z_HEADER = "z-40";
const Z_MOBILE_NAV = "z-50";

/*
 * Everything the Tab key can land on. The menu "links" are spans, so they are
 * deliberately absent: a trap should only cycle what a keyboard can reach.
 */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Nav = () => {
  const btnMobileRef = useRef(null);
  const hamburgerRef = useRef(null);
  const crossRef = useRef(null);
  const mobileNavRef = useRef(null);
  const mobileLinksRef = useRef(null);
  const mobileDescRef = useRef(null);

  const lenis = useLenis();

  // The instance arrives after the first render, so the open/close handlers
  // read it through a ref rather than closing over the initial null.
  const lenisRef = useRef(null);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  /*
   * The panel is mounted from the first render and revealed by animating
   * `clipPath`, which hides it visually but leaves its buttons in the tab
   * order. `inert` takes the whole subtree out of the tab order and the
   * accessibility tree both. It is driven through the DOM rather than rendered
   * as a prop because the open state lives in the GSAP timeline, not in React,
   * and a re-render must not clobber it.
   */
  const setMenuOpenState = useCallback((isOpen) => {
    if (mobileNavRef.current) mobileNavRef.current.inert = !isOpen;
    hamburgerRef.current?.setAttribute("aria-expanded", String(isOpen));
  }, []);

  useEffect(() => {
    // Closed on load, at every breakpoint.
    setMenuOpenState(false);
  }, [setMenuOpenState]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(width < 64rem)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isMobile, reduce } = context.conditions;
        if (!isMobile) return;

        // `reduce` is a live condition, so `prefersReduced()` here tracks the
        // setting rather than being frozen at first render.
        const reduced = reduce || prefersReduced();

        const mobileSpans = [...mobileLinksRef.current.children];

        const splitedMobileSpans = SplitText.create(mobileSpans, {
          type: "lines, chars",
          mask: "lines",
        });
        const splitedMobileDesc = SplitText.create(mobileDescRef.current, {
          type: "lines, chars",
          linesClass: "overflow-hidden block",
          mask: "lines",
        });

        if (reduced) {
          // No wipe to travel with, so the panel cross-fades instead.
          gsap.set(mobileNavRef.current, { clipPath: "none", autoAlpha: 0 });
        } else {
          gsap.set(mobileNavRef.current, { clipPath: MOBILE_NAV_CLOSED });
        }

        gsap.set(crossRef.current, { autoAlpha: 0 });
        gsap.set(btnMobileRef.current, { autoAlpha: 0 });
        gsap.set(splitedMobileSpans.chars, { autoAlpha: 0, y: reduced ? 0 : 20 });
        gsap.set(splitedMobileDesc.chars, { autoAlpha: 0 });

        const showMobileNav = gsap.timeline({
          paused: true,
          defaults: { ease: EASE.out },
          // Released only once the panel has gone, so the page never scrolls
          // out from under a menu that is still on screen.
          onReverseComplete: () => {
            unlockPageScroll();
            lenisRef.current?.start();
            setMenuOpenState(false);
          },
        });

        if (reduced) {
          showMobileNav
            .to(mobileNavRef.current, { autoAlpha: 1, duration: DUR.quick })
            .to(crossRef.current, { autoAlpha: 1, duration: DUR.micro }, "<")
            .to(
              [
                btnMobileRef.current,
                ...splitedMobileSpans.chars,
                ...splitedMobileDesc.chars,
              ],
              { autoAlpha: 1, duration: DUR.quick },
              "<",
            );
        } else {
          showMobileNav
            .to(mobileNavRef.current, {
              clipPath: MOBILE_NAV_OPEN,
              duration: DUR.state,
              ease: EASE.inOut,
            })
            .to(crossRef.current, { autoAlpha: 1, duration: DUR.state }, "-=0.1")
            .to(splitedMobileSpans.chars, {
              autoAlpha: 1,
              y: 0,
              duration: DUR.state,
              stagger: 0.02,
            })
            .to(
              [btnMobileRef.current, ...splitedMobileDesc.chars],
              { autoAlpha: 1, duration: DUR.state },
              "<+=0.1",
            );
        }

        context.add("open", () => {
          // Stopping Lenis blocks wheel and touch; the lock covers the keyboard
          // and the scrollbar, which Lenis leaves alone.
          lockPageScroll();
          lenisRef.current?.stop();
          setMenuOpenState(true);
          showMobileNav.timeScale(1).play();
        });

        // The panel closes faster than it opens.
        context.add("close", () => {
          showMobileNav.timeScale(1.6).reverse();
        });

        // Fully closed (progress 0) leaves nothing to close or to trap.
        const isMenuOpen = () => showMobileNav.progress() > 0;

        /*
         * Listened for on the document rather than on the panel: a mouse click
         * on the hamburger leaves focus outside the menu, where a keydown on
         * the panel itself would never arrive.
         */
        const onKeyDown = (event) => {
          if (!isMenuOpen()) return;

          if (event.key === "Escape") {
            event.preventDefault();
            context.close();
            // Escape is a keyboard exit, so the visitor is handed back the
            // control they came in through.
            hamburgerRef.current?.focus();
            return;
          }

          if (event.key !== "Tab") return;

          const panel = mobileNavRef.current;
          if (!panel) return;

          // Zero-sized controls (the `lg:hidden` close button on a wide screen)
          // are not reachable, so they are not trap stops either.
          const items = [...panel.querySelectorAll(FOCUSABLE)].filter(
            (el) => el.getClientRects().length > 0,
          );
          if (!items.length) return;

          const first = items[0];
          const last = items[items.length - 1];
          const active = document.activeElement;

          if (event.shiftKey && (!panel.contains(active) || active === first)) {
            event.preventDefault();
            last.focus();
          } else if (
            !event.shiftKey &&
            (!panel.contains(active) || active === last)
          ) {
            event.preventDefault();
            first.focus();
          }
        };

        // Held in locals so the cleanup can unbind the exact same wrappers.
        const openMenu = context.open;
        const closeMenu = context.close;

        hamburgerRef.current?.addEventListener("click", openMenu);
        crossRef.current?.addEventListener("click", closeMenu);
        document.addEventListener("keydown", onKeyDown);

        return () => {
          document.removeEventListener("keydown", onKeyDown);
          // The panel is a shared DOM node and this branch is re-created on
          // every breakpoint crossing, so listeners left behind here would
          // stack up and fire the menu once per crossing.
          hamburgerRef.current?.removeEventListener("click", openMenu);
          crossRef.current?.removeEventListener("click", closeMenu);

          // Cross the breakpoint with the menu open and the page must neither
          // stay frozen behind it nor leave the panel holding focus.
          setMenuOpenState(false);
          unlockPageScroll();
          lenisRef.current?.start();
        };
      },
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 ${Z_HEADER} bg-paper/85 backdrop-blur-md border-b border-hairline`}
      >
        <nav className="w-[90%] max-w-360 mx-auto h-16 lg:h-20 flex items-center justify-between">
          <span className="font-bebas-neue text-3xl tracking-widest cursor-pointer select-none">
            COREX<span className="text-lime">.</span>
          </span>

          <ul className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <li
                key={link}
                className="group relative cursor-pointer text-xs font-semibold uppercase tracking-[0.18em] text-ink/70 hover:text-ink transition-colors duration-300"
              >
                {link}
                <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-lime origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-8">
            <span className="eyebrow text-smoke">+1 (555) 010-2847</span>
            <button className="bg-ink text-paper text-xs font-bold uppercase tracking-[0.18em] px-8 py-3.5 hover:bg-lime hover:text-ink transition-colors duration-300 cursor-pointer">
              Join Now
            </button>
          </div>

          {/* Toggle Mobile Navigation */}
          <button
            ref={hamburgerRef}
            className="cursor-pointer lg:hidden text-ink p-1"
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </nav>
      </header>

      {/*
        Deliberately a sibling of <header>, not a child. The header's
        backdrop-blur makes it the containing block for `position: fixed`
        descendants, so nesting this panel there sized it to the header bar
        instead of the viewport, and trapped its z-index in the header's
        stacking context.
      */}
      <div
        ref={mobileNavRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        style={{ clipPath: MOBILE_NAV_CLOSED }}
        className={`px-[5%] fixed inset-0 ${Z_MOBILE_NAV} w-full bg-ink flex flex-col justify-between py-8`}
      >
        <div className="flex items-center justify-between">
          <span className="font-bebas-neue text-2xl tracking-widest text-paper select-none">
            COREX<span className="text-lime">.</span>
          </span>
          <button
            ref={crossRef}
            className="cursor-pointer lg:hidden flex items-center gap-2"
            aria-label="Close menu"
          >
            <span className="eyebrow text-paper/50">Close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="h-8 w-8"
            >
              <path
                d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                fill="#CCFF00"
              />
            </svg>
          </button>
        </div>

        <div ref={mobileLinksRef} className="flex flex-col items-center gap-3">
          {NAV_LINKS.map((link) => (
            <span
              key={link}
              className="font-bebas-neue text-5xl uppercase text-paper/90 cursor-pointer hover:text-lime transition-colors duration-300"
            >
              {link}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <button
            ref={btnMobileRef}
            className="w-full bg-lime text-ink py-4 text-xs font-bold uppercase tracking-[0.2em] cursor-pointer"
          >
            Begin Your Journey
          </button>
          <p ref={mobileDescRef} className="eyebrow text-paper/40 text-center">
            Elite coaching, world-class equipment, and a community built on
            discipline.
          </p>
        </div>
      </div>
    </>
  );
};

export default Nav;
