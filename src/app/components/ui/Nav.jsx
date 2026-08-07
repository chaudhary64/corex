import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

const NAV_LINKS = ["Home", "Trainers", "Programs", "Experiences", "Pricing"];

const Nav = () => {
  const btnMobileRef = useRef(null);
  const hamburgerRef = useRef(null);
  const crossRef = useRef(null);
  const mobileNavRef = useRef(null);
  const mobileLinksRef = useRef(null);
  const mobileDescRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();
    let ctx;

    mm.add("(width < 64rem)", (context) => {
      ctx = context;

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

      gsap.set(crossRef.current, { opacity: 0 });
      gsap.set(splitedMobileSpans.chars, { opacity: 0, y: 20 });
      gsap.set(splitedMobileDesc.chars, { opacity: 0 });

      const showMobileNav = gsap.timeline({ paused: true });

      showMobileNav
        .to(mobileNavRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power2.InOut",
        })
        .to(crossRef.current, { opacity: 1 })
        .to(splitedMobileSpans.chars, {
          opacity: 1,
          y: 0,
          stagger: 0.02,
        })
        .to(
          btnMobileRef.current,
          {
            opacity: 1,
            duration: 1.25,
            ease: "power2.out",
          },
          "<-0.0025",
        )
        .to(
          splitedMobileDesc.chars,
          {
            opacity: 1,
            stagger: 0.01,
          },
          "<",
        );

      context.add("open", () => {
        showMobileNav.timeScale(1).play();
      });

      context.add("close", () => {
        showMobileNav.timeScale(1.75).reverse();
      });

      hamburgerRef.current?.addEventListener("click", context.open);
      crossRef.current?.addEventListener("click", context.close);
    });

    return () => {
      mm.revert();
      hamburgerRef.current?.removeEventListener("click", ctx?.open);
      crossRef.current?.removeEventListener("click", ctx?.close);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur-md border-b border-hairline">
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
              <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-lime group-hover:w-full transition-all duration-300"></span>
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

        {/* Mobile Navigation */}
        <div
          ref={mobileNavRef}
          style={{
            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
          }}
          className="px-[5%] fixed z-50 inset-0 w-full bg-ink flex flex-col justify-between py-8"
        >
          <div className="flex items-center justify-between">
            <span className="font-bebas-neue text-2xl tracking-widest text-paper select-none">
              COREX<span className="text-lime">.</span>
            </span>
            <button
              ref={crossRef}
              className="cursor-pointer lg:hidden flex items-center gap-2 opacity-0"
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

          <div
            ref={mobileLinksRef}
            className="flex flex-col items-center gap-3"
          >
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
              className="w-full bg-lime text-ink py-4 text-xs font-bold uppercase tracking-[0.2em] cursor-pointer opacity-0"
            >
              Begin Your Journey
            </button>
            <p
              ref={mobileDescRef}
              className="eyebrow text-paper/40 text-center"
            >
              Elite coaching, world-class equipment, and a community built on
              discipline.
            </p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
