import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import React, { use, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";

const Faq = ({ id, question, answer }) => {
  const number = id.toString().padStart(2, "0");

  const [isToggle, setIsToggle] = useState(false);

  const containerRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const paraRef = useRef(null);
  const borderRef = useRef(null);

  const toggle = () => setIsToggle((prev) => !prev);

  useGSAP(() => {
    if (isToggle) {
      gsap.set(paraRef.current, { display: "block" });
      gsap.to(paraRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
      });
    } else {
      gsap.to(paraRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
        onComplete: () => {
          gsap.set(paraRef.current, { display: "none" });
        },
      });
    }
  }, [isToggle]);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(width < 64rem)", () => {
      const split = new SplitText(containerRef.current, {
        type: "words,chars",
        mask: "chars",
      });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          end: "bottom 60%",
        },
      });

      tl.from(split.chars, {
        yPercent: 100,
        stagger: 0.02,
        ease: "power2.out",
      }).from(
        borderRef.current,
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.75,
          ease: "power2.out",
        },
        `<=${id * 0.1}`
      );
    });
    mm.add("(width >= 64rem)", () => {
      const split = new SplitText(containerRef.current, {
        type: "words,chars",
        mask: "chars",
      });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          end: "bottom 60%",
        },
      });

      tl.from(split.chars, {
        yPercent: 100,
        stagger: 0.02,
        ease: "power2.out",
      }).from(
        borderRef.current,
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.75,
          ease: "power2.out",
        },
        `<=${id * 0.1}`
      );
    });
  }, []);

  return (
    <>
      <div className="py-4">
        <div
          ref={containerRef}
          className="flex justify-between items-center gap-2"
        >
          <div>
            <span>{number + ")"}</span>
            &ensp;
            <span>{question}</span>
          </div>
          <FiPlus
            ref={toggleBtnRef}
            onClick={toggle}
            className="text-lg cursor-pointer"
          />
        </div>
        <div
          ref={paraRef}
          className="h-0 overflow-hidden hidden opacity-0 borders-2"
        >
          <div className="pt-2">{answer}</div>
        </div>
      </div>
      <aside
        ref={borderRef}
        className="border-b border-gray-500 w-full"
      ></aside>
    </>
  );
};

export default Faq;
