"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const Loader = ({ setIsloading }) => {
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    let tl = gsap.timeline({
      ease: "expoScale(0.5,7,power1.out)",
      onComplete: () => setIsloading(false),
    });

    let duration = gsap.utils.random(3, 5);

    tl.to(counterRef.current, {
      innerText: 100,
      duration: duration,
      snap: { innerText: 1 },
    }).to(
      progressBarRef.current,
      {
        scaleX: 1,
        duration: duration,
        transformOrigin: "0% 50%",
      },
      "<",
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-gray-950 flex flex-col justify-end"
    >
      <p className="ml-auto text-7xl md:text-9xl text-white/90 leading-none">
        <span ref={counterRef}>0</span>
        <span className="text-violet-500">%</span>
      </p>
      {/* Progress Bar */}
      <div
        ref={progressBarRef}
        className="h-1 scale-x-0 w-full bg-violet-500"
      ></div>
    </div>
  );
};

export default Loader;
