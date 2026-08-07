import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { useLoading } from "../context/LoadingProvider";

const Loader = () => {
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);
  const { loading, setLoading } = useLoading();
  const [isAnimating, setIsAnimating] = useState(false);

  const tl = useRef(null);
  const GSAP_EASE = "power1.inOut";
  const DURATION = 3;
  const animationPortion = useRef(0.4);

  useGSAP(() => {
    animationPortion.current = Math.random() * (0.5 - 0.3) + 0.3;
    tl.current = gsap.timeline({
      defaults: { ease: GSAP_EASE },
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
      )
      .addPause(DURATION * animationPortion.current, () => setIsAnimating(true));
  }, []);

  useGSAP(() => {
    if (loading.state || !isAnimating) return;

    tl.current.play();
  }, [isAnimating, loading.state]);

  return (
    <div className="fixed inset-0 bg-ink flex flex-col justify-end px-[5%] pb-10">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="font-bebas-neue text-3xl tracking-widest text-paper">
            COREX<span className="text-lime">.</span>
          </p>
          <p className="eyebrow text-paper/40 mt-3">Preparing the floor</p>
        </div>
        <p className="font-bebas-neue text-7xl md:text-9xl text-paper leading-none">
          <span ref={counterRef}>0</span>
          <span className="text-lime">%</span>
        </p>
      </div>
      {/* Progress Bar */}
      <div
        ref={progressBarRef}
        className="h-[3px] scale-x-0 w-full bg-lime mt-10"
      ></div>
    </div>
  );
};

export default Loader;
