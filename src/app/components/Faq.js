import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";

const Faq = ({ id, question, answer }) => {
  const number = id.toString().padStart(2, "0");

  const [isToggle, setIsToggle] = useState(false);

  const toggleBtnRef = useRef(null);
  const paraRef = useRef(null);

  const toggle = () => setIsToggle((prev) => !prev);

  useGSAP(() => {
    if (isToggle) {
      gsap.set(paraRef.current, { display: "block" });
      gsap.to(paraRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(paraRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(paraRef.current, { display: "none" });
        },
      });
    }
  }, [isToggle]);

  return (
    <div className="border-b border-gray-500 py-4">
      <div className="flex justify-between items-center">
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
      <p ref={paraRef} className="mt-2 h-0 overflow-hidden hidden opacity-0">
        {answer}
      </p>
    </div>
  );
};

export default Faq;
