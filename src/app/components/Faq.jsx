import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
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
    const tl = gsap.timeline({
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
    <div className="py-5">
      <button
        ref={containerRef}
        onClick={toggle}
        aria-expanded={isToggle}
        className="w-full flex justify-between items-center gap-4 text-left cursor-pointer group"
      >
        <span className="font-bebas-neue text-2xl lg:text-3xl leading-tight">
          <span className="text-lime mr-3">{number}</span>
          {question}
        </span>
        <span
          className={`shrink-0 w-9 h-9 rounded-full border border-ink flex items-center justify-center transition-all duration-500 ${
            isToggle
              ? "bg-lime rotate-45 border-lime"
              : "group-hover:bg-ink group-hover:text-lime"
          }`}
        >
          <FiPlus className="text-base" />
        </span>
      </button>
      <div ref={paraRef} className="h-0 overflow-hidden hidden opacity-0">
        <div className="pt-3 pb-2 max-w-2xl leading-relaxed text-ink/70">
          {answer}
        </div>
      </div>
      <aside
        ref={borderRef}
        className="border-b border-hairline w-full scale-x-0 origin-left"
      ></aside>
    </div>
  );
};

export default Faq;
