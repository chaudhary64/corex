"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const Loader = ({ setIsloading }) => {
  const counterRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    let tl = gsap.timeline({
      onComplete: () => setIsloading(false),
    });

    tl.to(counterRef.current, {
      innerText: 100,
      duration: 2,
      ease: "power1.inOut",
      snap: { innerText: 1 },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-gray-950 flex items-end"
    >
      <p className="ml-auto text-9xl text-white/90 leading-none">
        <span ref={counterRef}>0</span>
        <span className="text-violet-500">%</span>
      </p>
    </div>
  );
};

export default Loader;
