import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { FiArrowUpRight } from "react-icons/fi";

import Image from "./Image";
import {
  DUR,
  EASE,
  RISE,
  SHOWN,
  START,
  prefersReduced,
} from "@/app/utils/motion";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * A Why CoreX row: the image is wiped in from the edge nearest the copy, then
 * the text arrives over it. The wipe is the section's reveal, so the text is
 * timed to land while the image is still settling rather than after it.
 */
const WhyUs = ({ src, heading, description, btnTxt, layout, label }) => {
  const sectionRef = useRef(null);
  const asideRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const headingSplit = new SplitText(headingRef.current, {
      type: "lines",
      mask: "lines",
    });

    const descriptionSplit = new SplitText(descRef.current, {
      type: "lines",
      mask: "lines",
    });

    if (prefersReduced()) {
      gsap.set(asideRef.current, { autoAlpha: 0 });
      gsap.set(
        [headingSplit.lines, descriptionSplit.lines, btnRef.current],
        SHOWN,
      );

      return () => {
        headingSplit.revert();
        descriptionSplit.revert();
      };
    }

    // The panel over the image retracts towards the copy.
    gsap.set(asideRef.current, {
      transformOrigin: layout === "l-r" ? "right center" : "left center",
    });

    gsap.set(headingSplit.lines, { y: RISE, autoAlpha: 0 });
    gsap.set(descriptionSplit.lines, { y: RISE, autoAlpha: 0 });
    gsap.set(btnRef.current, { autoAlpha: 0, y: 24 });

    const tl = gsap.timeline({
      defaults: { ease: EASE.out },
      scrollTrigger: { trigger: section, start: START.block },
    });

    tl.to(asideRef.current, { scaleX: 0, duration: DUR.wipe }, 0)
      .to(
        headingSplit.lines,
        { y: 0, autoAlpha: 1, duration: DUR.reveal },
        0.05,
      )
      .to(
        descriptionSplit.lines,
        { y: 0, autoAlpha: 1, stagger: 0.08, duration: DUR.state },
        0.35,
      )
      .to(btnRef.current, { y: 0, autoAlpha: 1, duration: DUR.state }, 0.8);

    return () => {
      headingSplit.revert();
      descriptionSplit.revert();
      tl.kill();
    };
  }, [layout]);

  return (
    <div ref={sectionRef} className="flex max-lg:flex-wrap max-lg:gap-10">
      <div
        className={`max-lg:w-full lg:w-1/2 relative overflow-hidden rounded-2xl ${layout === "r-l" ? "lg:order-2" : ""}`}
      >
        {/*
          The panel deliberately outranks the badge below it. Left the other way
          round the badge is painted above the wipe and spends the whole 1.2s
          floating on the blank panel with no reveal of its own, because the
          panel retracts on its own layer.
        */}
        <aside ref={asideRef} className="absolute inset-0 z-10 bg-paper" />

        <Image
          src={src}
          alt={heading}
          className="h-full w-full object-cover object-center"
        />

        <span className="absolute bottom-4 left-4 bg-lime px-3 py-1.5 eyebrow text-ink">
          CoreX Facility
        </span>
      </div>

      <div
        className={`max-lg:w-full lg:w-1/2 flex flex-col justify-center text-left lg:px-14 ${layout === "r-l" ? "lg:order-1" : ""}`}
      >
        <span className="eyebrow text-smoke">{label}</span>

        <h2
          ref={headingRef}
          className="font-bebas-neue text-4xl lg:text-6xl mt-4 leading-[0.95]"
        >
          {heading}
        </h2>

        <div ref={descRef} className="my-6 text-ink/70 max-w-lg">
          <p className="leading-relaxed">{description}</p>
        </div>

        <button
          ref={btnRef}
          className="w-fit flex items-center gap-3 cursor-pointer group text-xs font-bold uppercase tracking-[0.2em] border border-ink px-8 py-4 hover:bg-ink hover:text-lime transition-colors duration-500"
        >
          {btnTxt}
          <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};

export default WhyUs;
