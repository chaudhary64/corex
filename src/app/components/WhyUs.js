"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import Image from "./Image";

gsap.registerPlugin(ScrollTrigger, SplitText);

const createSectionAnimation = (sectionRef, transformOrigin) => {
  const section = sectionRef.current;
  if (!section) return;

  const image = section.children[0]?.children[0];
  const heading = section.children[1]?.children[0];
  const description = section.children[1]?.children[1];
  const button = section.children[1]?.children[2];

  if (!image || !heading || !description) return;

  const headingSplit = new SplitText(heading, {
    type: "lines",
    mask: "lines",
  });

  const descriptionSplit = new SplitText(description, {
    type: "lines",
    mask: "lines",
  });

  gsap.set([heading, description], { opacity: 1 });

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

  tl.to(image, {
    autoAlpha: 1,
    scaleX: 0,
    transformOrigin,
    duration: 1.75,
  })
    .to(
      headingSplit.lines,
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
      },
      "<=0.05",
    )
    .to(
      descriptionSplit.lines,
      {
        y: 0,
        autoAlpha: 1,
        stagger: 0.1,
        duration: 0.75,
      },
      "<=0.3",
    )
    .to(
      button,
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
};

const WhyUs = ({ src, heading, description, btnTxt, layout }) => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const cleanup = createSectionAnimation(
      sectionRef,
      layout === "l-r" ? "right center" : "left center",
    );

    return cleanup;
  }, [layout]);

  return (
    <div ref={sectionRef} className="flex max-lg:flex-wrap max-lg:gap-4">
      <div
        className={`max-lg:w-full lg:w-1/2 relative ${layout === "r-l" ? "lg:order-2" : ""
          }`}
      >
        <aside className="absolute inset-0 bg-[#EEEEEE]" />

        <Image
          src={src}
          alt={heading}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div
        className={`max-lg:w-full lg:w-1/2 px-8 flex flex-col justify-center text-center ${layout === "r-l" ? "lg:order-1" : ""
          }`}
      >
        <h2 className="text-3xl font-bold font-bebas-neue opacity-0">{heading}</h2>

        <div className="my-6 text-gray-900 opacity-0">
          <p>{description}</p>
        </div>

        <button className="font-mozilla-headline opacity-0 translate-y-6">{btnTxt}</button>
      </div>
    </div>
  );
};

export default WhyUs;
