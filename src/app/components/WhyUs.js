"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";

const WhyUs = ({ src, heading, description, btnTxt, layout }) => {
  const leftToRightRef = useRef(null);
  const rightToLeftRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();

    mm.add("(width < 64rem)", () => {});

    mm.add("(width >= 64rem)", () => {
      if (leftToRightRef.current) {
        const image = leftToRightRef.current.children[0]?.children[0];
        const heading = leftToRightRef.current.children[1]?.children[0];
        const description = leftToRightRef.current.children[1]?.children[1];
        const button = leftToRightRef.current.children[1]?.children[2];

        const headingSplit = new SplitText(heading, {
          type: "words,chars",
          mask: "chars",
        });

        const descriptionSplit = new SplitText(description, {
          type: "lines",
          mask: "lines",
        });

        if (image) {
          let leftToRightSectionTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: leftToRightRef.current,
              start: "top 75%",
              end: "bottom 20%",
            },
          });

          leftToRightSectionTimeline
            .to(image, {
              autoAlpha: 1,
              scaleX: 0,
              transformOrigin: "right center",
              duration: 1.75,
              ease: "power2.out",
            })
            .from(
              headingSplit.chars,
              {
                y: 50,
                autoAlpha: 0,
                stagger: 0.025,
                duration: 0.4,
                ease: "power2.out",
              },
              "<=0.05"
            )
            .from(
              descriptionSplit.lines,
              {
                y: 50,
                autoAlpha: 0,
                stagger: 0.1,
                duration: 0.75,
                ease: "power2.out",
              },
              "<=0.3"
            )
            .from(
              button,
              {
                x: 100,
                autoAlpha: 0,
                duration: 0.75,
                ease: "power2.out",
              },
              "<=0.5"
            );
        }
      }

      if (rightToLeftRef.current) {
        const image = rightToLeftRef.current.children[0].children[0];
        const heading = rightToLeftRef.current.children[1]?.children[0];
        const description = rightToLeftRef.current.children[1]?.children[1];
        const button = rightToLeftRef.current.children[1]?.children[2];

        const headingSplit = new SplitText(heading, {
          type: "words,chars",
          mask: "chars",
        });

        const descriptionSplit = new SplitText(description, {
          type: "lines",
          mask: "lines",
        });

        if (image) {
          let rightToLeftSectionTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: rightToLeftRef.current,
              start: "top 75%",
              end: "bottom 20%",
            },
          });

          rightToLeftSectionTimeline
            .to(image, {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 1.75,
              ease: "power2.out",
            })
            .from(
              headingSplit.chars,
              {
                y: 50,
                autoAlpha: 0,
                stagger: 0.025,
                duration: 0.4,
                ease: "power2.out",
              },
              "<=0.05"
            )
            .from(
              descriptionSplit.lines,
              {
                y: 50,
                autoAlpha: 0,
                stagger: 0.1,
                duration: 0.75,
                ease: "power2.out",
              },
              "<=0.3"
            )
            .from(
              button,
              {
                x: 100,
                autoAlpha: 0,
                duration: 0.75,
                ease: "power2.out",
              },
              "<=0.5"
            );
        }
      }
    });
  }, []);

  return (
    <div
      ref={layout === "l-r" ? leftToRightRef : rightToLeftRef}
      className="flex max-lg:flex-wrap max-lg:gap-4"
    >
      <div
        className={`max-lg:w-full lg:w-1/2 relative ${
          layout === "r-l" ? "lg:order-2" : ""
        }`}
      >
        <aside className="absolute inset-0 bg-[#EEEEEE]"></aside>
        <img
          src={src}
          alt={heading}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div
        className={`max-lg:w-full lg:w-1/2 px-8 flex flex-col justify-center text-center ${
          layout === "r-l" ? "lg:order-1" : ""
        }`}
      >
        <h2 className="text-3xl font-bold font-bebas-neue">{heading}</h2>
        <div className="my-6 text-gray-900">
          <p>{description}</p>
        </div>
        <button className="font-mozilla-headline">{btnTxt}</button>
      </div>
    </div>
  );
};

export default WhyUs;
