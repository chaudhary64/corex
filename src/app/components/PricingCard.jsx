import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiCheck } from "react-icons/fi";
import { DUR, EASE, RISE, START, prefersReduced } from "@/app/utils/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * One membership tier. The featured tier inverts to the ink surface - the same
 * treatment the page reserves for its loudest panels - so the eye lands on the
 * middle card of three rather than reading left to right and stopping at the
 * cheapest. Its badge sits on the border so it cannot be mistaken for content.
 *
 * Each card carries its own entrance rather than riding a shared grid batch:
 * the price is the section's one piece of changing information, so it counts
 * up as the card lands, and the tiers then do not all arrive in lockstep.
 */
const PricingCard = ({
  name,
  price,
  cadence,
  blurb,
  features,
  cta,
  featured,
}) => {
  const cardRef = useRef(null);
  const priceRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);

  useGSAP(
    (context, contextSafe) => {
      const card = cardRef.current;
      const priceEl = priceRef.current;
      const rows = [...featuresRef.current.children];

      if (prefersReduced()) {
        // The author's markup is already the settled state, so there is nothing
        // to put back - only the counter has to be left at its real value.
        gsap.set(priceEl, { innerText: price });
        return;
      }

      gsap.set(card, { autoAlpha: 0, y: RISE });
      gsap.set(rows, { autoAlpha: 0, x: -12 });
      gsap.set(ctaRef.current, { autoAlpha: 0, y: 16 });

      gsap
        .timeline({
          defaults: { ease: EASE.out },
          scrollTrigger: {
            trigger: card,
            start: START.item,
            once: true,
          },
        })
        .to(card, { autoAlpha: 1, y: 0, duration: DUR.state })
        // `from`-style counting from the rendered value keeps the real price in
        // the DOM, so a blocked script shows a price rather than a zero.
        .fromTo(
          priceEl,
          { innerText: 0 },
          {
            innerText: price,
            snap: { innerText: 1 },
            duration: DUR.reveal,
            ease: EASE.soft,
          },
          0.15,
        )
        // The list is the card's substance, so it arrives by the row rather
        // than as one block.
        .to(
          rows,
          { autoAlpha: 1, x: 0, duration: DUR.state, stagger: 0.055 },
          0.3,
        )
        .to(ctaRef.current, { autoAlpha: 1, y: 0, duration: DUR.quick }, "-=0.2");

      /*
       * Pointer feedback belongs to GSAP rather than a CSS transition: the card
       * is already carrying a y transform from the entrance, and two systems
       * writing that property is how a card ends up stuck off its resting line.
       * The handler runs after useGSAP, so its tween has to be contextSafe to be
       * reverted with the rest of the component.
       */
      const lift = contextSafe((to) => {
        gsap.to(card, {
          y: to,
          duration: DUR.quick,
          ease: EASE.out,
          overwrite: "auto",
        });
      });

      const onEnter = () => lift(-6);
      const onLeave = () => lift(0);

      card.addEventListener("pointerenter", onEnter);
      card.addEventListener("pointerleave", onLeave);

      return () => {
        card.removeEventListener("pointerenter", onEnter);
        card.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: cardRef },
  );

  return (
    <div
      ref={cardRef}
      className={`relative flex flex-col rounded-2xl border p-7 lg:p-8 transition-colors duration-500 ${
        featured
          ? "bg-ink text-paper border-ink"
          : "bg-white border-hairline hover:border-lime/80"
      }`}
    >
      {featured && (
        <span className="absolute top-0 right-6 -translate-y-1/2 bg-lime text-ink eyebrow px-3 py-1.5">
          Most Popular
        </span>
      )}

      <span className={`eyebrow ${featured ? "text-paper/50" : "text-smoke"}`}>
        {name}
      </span>

      <p className="font-bebas-neue text-6xl lg:text-7xl mt-3 leading-[0.9]">
        $<span ref={priceRef}>{price}</span>
        <span
          className={`font-mono text-xs tracking-[0.22em] ml-2 ${
            featured ? "text-paper/50" : "text-smoke"
          }`}
        >
          {cadence}
        </span>
      </p>

      <p
        className={`mt-4 text-sm leading-relaxed ${
          featured ? "text-paper/60" : "text-ink/70"
        }`}
      >
        {blurb}
      </p>

      <ul
        ref={featuresRef}
        className={`mt-7 mb-8 flex flex-col gap-3.5 border-t pt-7 ${
          featured ? "border-paper/20" : "border-hairline"
        }`}
      >
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <FiCheck
              size={15}
              className={`mt-0.5 shrink-0 ${featured ? "text-lime" : "text-ink"}`}
            />
            <span
              className={`text-sm leading-relaxed ${
                featured ? "text-paper/80" : "text-ink/70"
              }`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* mt-auto keeps every button on the same line when the feature lists differ. */}
      <button
        ref={ctaRef}
        className={`mt-auto w-full px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 cursor-pointer ${
          featured
            ? "bg-lime text-ink hover:bg-paper"
            : "border border-ink hover:bg-ink hover:text-lime"
        }`}
      >
        {cta}
      </button>
    </div>
  );
};

export default PricingCard;
