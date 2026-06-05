"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { useLoading } from "../context/LoadingProvider";
import { useEffect } from "react";

const Loader = () => {
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);
  const containerRef = useRef(null);
  const { loading, setLoading } = useLoading();
  const [isAnimating, setIsAnimating] = useState(false);
  const tl = useRef(null);

  const GSAP_EASE = "power1.inOut";
  const DURATION = 3;

  useGSAP(() => {
    tl.current = gsap.timeline({
      defaults: { ease: GSAP_EASE },
      paused: true,
      onComplete: () => {
        setLoading((prev) => ({ ...prev, animated: true }));
      },
    });

    tl.current
      .to(counterRef.current, {
        innerText: 100,
        duration: DURATION,
        snap: { innerText: 1 },
      })
      .to(
        progressBarRef.current,
        {
          scaleX: 1,
          duration: DURATION,
          transformOrigin: "0% 50%",
        },
        "<",
      );

    !isAnimating &&
      gsap.to(tl.current, {
        progress: 0.35,
        delay: 0.5,
        ease: GSAP_EASE,
        duration: DURATION * 0.35,
        onComplete: () => setIsAnimating(true),
      });
  }, []);

  useGSAP(() => {
    if (loading.state || !isAnimating) return;

    gsap.to(tl.current, {
      ease: GSAP_EASE,
      progress: 1,
      duration: DURATION * 0.65,
    });
  }, [loading.state]);

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
