import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { useLoading } from "../context/LoadingProvider";
import { DUR, EASE, prefersReduced } from "@/app/utils/motion";

/**
 * Minimum run of the counter before it reaches its hold point. Kept short — the
 * preloader is staging, not the performance.
 */
const COUNT_DURATION = 1.6;

/**
 * The preloader is the first half of one authored sequence: it counts, holds
 * until every asset has landed, then lifts away as a curtain with a lime
 * leading edge while the hero plays into the space it opens.
 */
const Loader = ({ onCurtainStart, onExitComplete }) => {
  const panelRef = useRef(null);
  const contentRef = useRef(null);
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);

  const { loading } = useLoading();
  const [holding, setHolding] = useState(false);
  const [countDone, setCountDone] = useState(false);

  const countTl = useRef(null);
  const exitTl = useRef(null);

  useGSAP(() => {
    if (prefersReduced()) {
      // A static readout is the honest reduced-motion equivalent of a counter:
      // the information survives, the ticking does not.
      gsap.set(counterRef.current, { innerText: 100 });
      gsap.set(progressBarRef.current, {
        scaleX: 1,
        transformOrigin: "0% 50%",
      });
    } else {
      gsap.set(progressBarRef.current, {
        scaleX: 0,
        transformOrigin: "0% 50%",
      });

      countTl.current = gsap
        .timeline({
          defaults: { ease: EASE.soft },
          onComplete: () => setCountDone(true),
        })
        .to(counterRef.current, {
          innerText: 100,
          duration: COUNT_DURATION,
          snap: { innerText: 1 },
        }, 0)
        .to(progressBarRef.current, { scaleX: 1, duration: COUNT_DURATION }, 0)
        // Hold partway so the count can never finish into an empty page.
        .addPause(COUNT_DURATION * (0.35 + Math.random() * 0.25), () =>
          setHolding(true),
        )
        // A beat at 100% before the floor lifts.
        .to({}, { duration: DUR.micro });
    }

    exitTl.current = gsap.timeline({
      paused: true,
      onComplete: () => onExitComplete?.(),
    });

    if (prefersReduced()) {
      // No travel: the preloader simply fades off the page.
      exitTl.current.to(panelRef.current, {
        autoAlpha: 0,
        duration: DUR.state,
        ease: EASE.soft,
      });
    } else {
      exitTl.current
        .to(
          contentRef.current,
          {
            autoAlpha: 0,
            y: -24,
            duration: DUR.state,
            ease: EASE.in,
          },
          0,
        )
        // The panel and the lime edge on its trailing edge lift together.
        .to(
          panelRef.current,
          {
            yPercent: -100,
            duration: DUR.curtain,
            ease: EASE.outStrong,
          },
          0,
        );
    }
  }, []);

  // Release the count once the assets are in.
  useGSAP(() => {
    if (loading.state) return;

    if (!countTl.current) {
      // Reduced motion has nothing to count, so the handoff is ready at once.
      setCountDone(true);
      return;
    }

    if (holding) countTl.current.play();
  }, [holding, loading.state]);

  // Hand the page over, then lift the curtain off it.
  useGSAP(() => {
    if (!countDone) return;

    onCurtainStart?.();

    // One frame so React can mount and lay the page out underneath, keeping the
    // lift free of an unsettled frame.
    const frame = requestAnimationFrame(() => exitTl.current?.play());

    return () => cancelAnimationFrame(frame);
  }, [countDone]);

  return (
    <div className="fixed inset-0 z-[60]" aria-hidden="true">
      <div
        ref={panelRef}
        className="absolute inset-0 bg-ink flex flex-col justify-end px-[5%] pb-10"
      >
        <div ref={contentRef} className="flex flex-col">
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
          <div ref={progressBarRef} className="h-[3px] w-full bg-lime mt-10" />
        </div>

        {/* The curtain's leading edge, travelling with the panel. */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-lime" />
      </div>
    </div>
  );
};

export default Loader;
