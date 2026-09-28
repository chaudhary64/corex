import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { DUR, EASE, START, prefersReduced } from "@/app/utils/motion";

gsap.registerPlugin(ScrollTrigger);

const Faq = ({ id, question, answer }) => {
  const number = id.toString().padStart(2, "0");

  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef(null);
  const panelRef = useRef(null);
  const borderRef = useRef(null);
  const openTl = useRef(null);

  const toggle = () => setIsOpen((prev) => !prev);

  useGSAP(() => {
    // A single paused timeline, played forward to open and reversed to close.
    // Two loose tweens on the same properties would both run on a rapid
    // double-click and fight over the same frame.
    openTl.current = gsap
      .timeline({
        paused: true,
        defaults: { ease: EASE.soft },
        // Opening a panel makes the page taller, which leaves every trigger
        // below this row pointing at a position that no longer exists — they
        // would fire their reveals while still off screen.
        onComplete: () => ScrollTrigger.refresh(),
        onReverseComplete: () => ScrollTrigger.refresh(),
      })
      .fromTo(
        panelRef.current,
        { height: 0, autoAlpha: 0 },
        {
          height: "auto",
          autoAlpha: 1,
          duration: prefersReduced() ? DUR.micro : DUR.state,
        },
      );

    gsap.set(borderRef.current, { scaleX: 0, transformOrigin: "0% 50%" });
    gsap.to(borderRef.current, {
      scaleX: 1,
      duration: prefersReduced() ? DUR.quick : DUR.wipe,
      ease: EASE.out,
      // Each row carries its own cascade, capped so a long list does not end up
      // drawing its last rule half a second late.
      delay: Math.min((id - 1) * 0.1, 0.5),
      scrollTrigger: {
        trigger: containerRef.current,
        start: START.item,
        once: true,
      },
    });
  }, []);

  useGSAP(() => {
    const tl = openTl.current;
    if (!tl) return;

    // Closing runs faster than opening.
    if (isOpen) tl.timeScale(1).play();
    else tl.timeScale(1.6).reverse();
  }, [isOpen]);

  return (
    <div className="py-5">
      <button
        ref={containerRef}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${id}`}
        className="w-full flex justify-between items-center gap-4 py-2 text-left cursor-pointer group"
      >
        <span className="font-bebas-neue text-2xl lg:text-3xl leading-tight">
          <span className="text-lime mr-3">{number}</span>
          {question}
        </span>
        <span
          className={`shrink-0 w-9 h-9 rounded-full border border-ink flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-lime rotate-45 border-lime"
              : "group-hover:bg-ink group-hover:text-lime"
          }`}
        >
          <FiPlus className="text-base" />
        </span>
      </button>
      {/* Collapsed by CSS until JS is alive; GSAP owns the height from then on. */}
      <div
        ref={panelRef}
        id={`faq-panel-${id}`}
        className="accordion-panel"
      >
        <div className="pt-3 pb-2 max-w-2xl leading-relaxed text-ink/70">
          {answer}
        </div>
      </div>
      <aside
        ref={borderRef}
        className="border-b border-hairline w-full"
      ></aside>
    </div>
  );
};

export default Faq;
