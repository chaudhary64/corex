import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";

const Faq = ({ id, question, answer }) => {
  const number = id.toString().padStart(2, "0");

  const [isToggle, setIsToggle] = useState(false);

  const containerRef = useRef(null);
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
    let tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 95%",
        end: "bottom 60%",
      },
    });

    tl.to(
      borderRef.current,
      {
        scaleX: 1,
        duration: 1.75,
      },
      `<=${id * 0.1}`,
    );
  }, []);

  return (
    <>
      <div className="py-4">
        <div
          ref={containerRef}
          className="flex justify-between items-center gap-2"
        >
          <div className="text-lg font-medium">
            <span>{number + ")"}</span>
            &ensp;
            <span>{question}</span>
          </div>
          <FiPlus onClick={toggle} className="text-lg cursor-pointer" />
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
        className="border-b border-gray-500 w-full scale-x-0 origin-left"
      ></aside>
    </>
  );
};

export default Faq;
