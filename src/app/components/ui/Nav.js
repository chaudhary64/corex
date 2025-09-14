"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logoRef = useRef(null);
  const btnDesktopRef = useRef(null);
  const desktopLinkRefs = useRef();
  const hamburgerRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(width < 64rem)", () => {
      // Mobile-specific animations
      let tl = gsap.timeline();
      tl.from(logoRef.current, {
        opacity: 0,
        x: -20,
        duration: 1.25,
        ease: "power2.out",
      }).from(
        hamburgerRef.current,
        {
          opacity: 0,
          x: 20,
          duration: 1.25,
          ease: "power2.out",
        },
        0
      );
    });

    mm.add("(width >= 64rem)", () => {
      // Desktop-specific animations
      let tl = gsap.timeline();
      tl.from(logoRef.current, {
        opacity: 0,
        x: -20,
        duration: 1.25,
        ease: "power2.out",
      })
        .from(
          btnDesktopRef.current,
          {
            opacity: 0,
            x: 20,
            duration: 1.25,
            ease: "power2.out",
          },
          0
        )
        .from(
          desktopLinkRefs.current.children,
          {
            opacity: 0,
            x: (index, target, targets) => {
              if (index == 0) return -20;
              else if (index == targets.length - 1) return 20;
              else return 0;
            },
            y: (index, target, targets) => {
              if (index == 0 || index == targets.length - 1) return 0;
              return index % 2 === 0 ? -20 : 20;
            },
            duration: 0.75,
            ease: "power2.out",
            stagger: {
              each: 0.1,
              from: "edges",
            },
          },
          "<=0.25"
        );
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <header className="w-[90%] max-w-[1440px] mx-auto relative">
      <nav className="py-4 flex items-center justify-between border-b border-gray-500">
        <span ref={logoRef} className="font-black cursor-pointer">
          COREX
        </span>
        <ul
          ref={desktopLinkRefs}
          className="max-lg:hidden max-lg:invisible flex items-center gap-6"
        >
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Trainers</li>
          <li className="cursor-pointer">Programs</li>
          <li className="cursor-pointer">Experiences</li>
          <li className="cursor-pointer">Pricing</li>
        </ul>
        <button
          ref={btnDesktopRef}
          className="max-lg:hidden max-lg:invisible bg-black text-white py-2 px-10 rounded-full cursor-pointer"
        >
          Get Started
        </button>

        {/* Toggle Mobile Navigation */}
        <button
          ref={hamburgerRef}
          className="cursor-pointer lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
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
        {isOpen && (
          <div className="px-[5%] fixed z-10 inset-0 w-full bg-black flex flex-col justify-around items-center">
            <button
              className="self-end cursor-pointer lg:hidden flex items-center gap-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="font-semibold text-slate-200">close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="h-10 w-10"
              >
                <path
                  d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                  fill="#E2E8F0"
                />
              </svg>
            </button>
            <span className="text-xl uppercase font-semibold text-slate-200 tracking-wider cursor-not-allowed">
              Home
            </span>
            <span className="text-xl uppercase font-semibold text-slate-200 tracking-wider cursor-not-allowed">
              Trainers
            </span>
            <span className="text-xl uppercase font-semibold text-slate-200 tracking-wider cursor-not-allowed">
              Programs
            </span>
            <span className="text-xl uppercase font-semibold text-slate-200 tracking-wider cursor-not-allowed">
              Experiences
            </span>
            <span className="text-xl uppercase font-semibold text-slate-200 tracking-wider cursor-not-allowed">
              Pricing
            </span>
            <button className="w-full bg-white py-2 rounded-full uppercase cursor-not-allowed">
              Begin Your Journey
            </button>
            <aside className="w-full border-b border-slate-200"></aside>
            <p className="text-slate-200 text-xs text-center">
              We create transformative fitness journeys that celebrate the human
              spirit, making every workout a step toward your true self.
            </p>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Nav;
