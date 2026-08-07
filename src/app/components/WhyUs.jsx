import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { FiArrowUpRight } from "react-icons/fi";

import Image from "./Image";

gsap.registerPlugin(ScrollTrigger, SplitText);

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

    gsap.set([headingRef.current, descRef.current], { opacity: 1 });

    gsap.set(headingSplit.lines, {
      y: 100,
      autoAlpha: 0,
    });

    gsap.set(descriptionSplit.lines, {
      y: 50,
      autoAlpha: 0,
    });

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        end: "bottom 20%",
      },
    });

    tl.to(asideRef.current, {
      autoAlpha: 1,
      scaleX: 0,
      transformOrigin: layout === "l-r" ? "right center" : "left center",
      duration: 1.75,
    });

    tl.to(
      headingSplit.lines,
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
      },
      "<=0.05",
    );

    tl.to(
      descriptionSplit.lines,
      {
        y: 0,
        autoAlpha: 1,
        stagger: 0.1,
        duration: 0.75,
      },
      "<=0.3",
    );

    tl.to(
      btnRef.current,
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.75,
      },
      "<=0.5",
    );

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
        <aside ref={asideRef} className="absolute inset-0 bg-paper" />

        <Image
          src={src}
          alt={heading}
          className="h-full w-full object-cover object-center"
        />

        <span className="absolute bottom-4 left-4 bg-lime px-3 py-1.5 eyebrow text-ink z-10">
          CoreX Facility
        </span>
      </div>

      <div
        className={`max-lg:w-full lg:w-1/2 flex flex-col justify-center text-left lg:px-14 ${layout === "r-l" ? "lg:order-1" : ""}`}
      >
        <span className="eyebrow text-smoke">{label}</span>

        <h2
          ref={headingRef}
          className="font-bebas-neue text-4xl lg:text-6xl mt-4 leading-[0.95] opacity-0"
        >
          {heading}
        </h2>

        <div ref={descRef} className="my-6 text-ink/70 opacity-0 max-w-lg">
          <p className="leading-relaxed">{description}</p>
        </div>

        <button
          ref={btnRef}
          className="w-fit flex items-center gap-3 opacity-0 translate-y-6 cursor-pointer group text-xs font-bold uppercase tracking-[0.2em] border border-ink px-8 py-4 hover:bg-ink hover:text-lime transition-colors duration-500"
        >
          {btnTxt}
          <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};

export default WhyUs;
