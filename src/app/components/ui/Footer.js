"use client";

import React, { useRef } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import { LuLinkedin } from "react-icons/lu";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

const Footer = () => {
  const upperLeftRef = useRef(null);
  const upperCenterRef = useRef(null);
  const upperRightRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(width < 64rem)", () => {});
    mm.add("(width >= 64rem)", () => {
      const upperLeftText = upperLeftRef.current.children[0];
      const upperLeftArrow = upperLeftRef.current.children[1].children[0];

      const upperCenterText = upperCenterRef.current;

      const upperLeftTextSplit = new SplitText(upperLeftText, {
        type: "lines,words,chars",
        mask: "lines",
      });

      // const upperCenterTextSplit = new SplitText(upperCenterText, {
      //   type: "chars",
      //   mask: "chars",
      // })

      const upperTl = gsap.timeline({
        scrollTrigger: {
          trigger: upperLeftRef.current,
          start: "top 80%",
          end: "bottom 60%",
          markers: true,
        },
      });

      upperTl
        .from(upperLeftTextSplit.lines, {
          xPercent: -100,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
        })
        .from(
          upperLeftArrow,
          {
            xPercent: 100,
            ease: "power2.out",
          },
          0
        )
        .from(
          upperRightRef.current,
          {
            scale: 0,
            ease: "back.out(1.7)",
          },
          0
        );
    });
  });

  return (
    <footer className="mt-16 lg:mt-28">
      <div>
        {/* Upper Part */}
        <div className="max-lg:hidden max-lg:invisible w-[90%] max-w-[1440px] mx-auto pb-16 flex justify-between items-center">
          <div
            ref={upperLeftRef}
            style={{
              lineHeight: 1,
            }}
            className="flex items-center gap-2 text-xs"
          >
            <span>
              HEARD <br /> Enough
            </span>
            <div className="overflow-clip">
              <FaArrowRightLong />
            </div>
          </div>
          <div>
            <h2
              ref={upperCenterRef}
              style={{
                textDecoration: "#FFB900 wavy underline 3px",
                textUnderlineOffset: "0.2rem",
              }}
              className="text-6xl font-bebas-neue"
            >
              Contact Us
            </h2>
          </div>
          <span ref={upperRightRef} className="bg-amber-400 rounded-full p-8">
            <FaArrowRightLong />
          </span>
        </div>
        {/* Lower Part */}
        <div className="py-16 bg-black text-white">
          <div className="w-[90%] max-w-[1440px] mx-auto flex max-lg:flex-wrap justify-between max-lg:gap-8">
            <div className="max-lg:w-full">
              <h2 className="text-4xl font-bebas-neue">
                MAKE YOUR BODY STRONGER THAN YESTERDAY
              </h2>
              <h1
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px white",
                  lineHeight: 1,
                }}
                className="text-[7rem] font-bebas-neue"
              >
                COREX
              </h1>
            </div>
            <div className="flex flex-col text-sm gap-1">
              <span className="underline underline-offset-2">Home</span>
              <span className="underline underline-offset-2">Trainers</span>
              <span className="underline underline-offset-2">Programs</span>
              <span className="underline underline-offset-2">Experience</span>
              <span className="underline underline-offset-2">Pricing</span>
            </div>
            <div className="flex flex-col text-sm gap-1">
              <span className="underline underline-offset-2">
                PRIVACY POLICY
              </span>
              <span className="underline underline-offset-2">
                TERMS OF SERVICE
              </span>
              <span className="underline underline-offset-2">
                COOKIE POLICY
              </span>
              <span className="underline underline-offset-2">Faq</span>
            </div>
            <div className="text-sm flex flex-col gap-1">
              <h5>
                <span className="text-amber-400">GET STARTED</span> WITH OUR
                PROGRAMS
              </h5>
              <div className="flex items-center gap-2">
                <span className="underline underline-offset-2">
                  SIGN UP FOR OUR NEWSLETTER
                </span>
                <FaArrowRightLong />
              </div>
              <div>
                <span>Follow Us:</span>
                <div className="mt-2 flex gap-2 text-base">
                  <FaInstagram />
                  <FiFacebook />
                  <FiTwitter />
                  <LuLinkedin />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
