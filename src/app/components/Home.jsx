import { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import Highlight from "@/app/components/Highlight";
import Faq from "./Faq";
import WhyUs from "./WhyUs";
import Testimonial from "./Testimonial";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "./ui/Nav";
import Footer from "./ui/Footer";
import Image from "./Image";
import { useLoading } from "@/app/context/LoadingProvider";
import {
  DUR,
  EASE,
  RISE,
  SHOWN,
  START,
  prefersReduced,
  staggerFor,
  useOffscreenPause,
} from "@/app/utils/motion";
import {
  highlightsData,
  faqData,
  whyChooseUsData,
  testimonialsData,
  heroStats,
  tickerItems,
} from "@/app/data/homeData";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1584863231364-2edc166de576?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

/** Lets the section beneath the curtain settle for a beat before the hero runs. */
const HERO_LEAD_IN = 0.25;

const Home = () => {
  const { loading } = useLoading();

  const heroEyebrowRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroOutlineRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroCtaRef = useRef(null);
  const heroImgRef = useRef(null);
  const heroStatsRef = useRef(null);

  const tickerRef = useRef(null);

  const valuesSectionRef = useRef(null);
  const valuesImgRef = useRef(null);
  const valuesHeadingRef = useRef(null);
  const valuesDescRef = useRef(null);
  const valuesBtnRef = useRef(null);

  const ourClassesLeftRef = useRef(null);
  const ourClassesHeadingRef = useRef(null);
  const ourClassesDescRef = useRef(null);
  const ourClassesRightRef = useRef(null);

  const whyChooseUsHeadingRef = useRef(null);

  const journalHeadingRef = useRef(null);
  const journalLinkRef = useRef(null);
  const journalGridRef = useRef(null);

  const testimonialHeadingRef = useRef(null);
  const testimonialMarqueeRef = useRef(null);

  const faqHeadingRef = useRef(null);

  const ctaSectionRef = useRef(null);
  const ctaHeadingRef = useRef(null);
  const ctaParaRef = useRef(null);
  const ctaBtnRef = useRef(null);

  // The two decorative loops only run while they are actually on screen.
  useOffscreenPause(tickerRef);
  useOffscreenPause(testimonialMarqueeRef);

  // The hero is the second half of the preloader's handoff: it stays put until
  // the curtain starts to lift, then plays into the space that opens up.
  useGSAP(
    () => {
      if (!loading.revealed || !heroTextRef.current) return;

      const heroSplit = new SplitText(heroTextRef.current, {
        type: "words, chars",
        mask: "words",
      });

      const heroElements = [
        heroEyebrowRef.current,
        heroSubRef.current,
        heroCtaRef.current,
        heroImgRef.current,
      ];

      if (prefersReduced()) {
        gsap.set([...heroElements, heroSplit.chars, heroOutlineRef.current], {
          ...SHOWN,
        });
        return;
      }

      gsap.set(heroSplit.chars, { opacity: 0, y: 50 });
      gsap.set(heroOutlineRef.current, { yPercent: 115 });
      gsap.set([heroEyebrowRef.current, heroSubRef.current, heroCtaRef.current], {
        autoAlpha: 0,
        y: 16,
      });
      gsap.set(heroImgRef.current, { autoAlpha: 0, scale: 0.95 });

      gsap
        .timeline({ defaults: { ease: EASE.out }, delay: HERO_LEAD_IN })
        .to(heroEyebrowRef.current, { autoAlpha: 1, y: 0, duration: DUR.reveal }, 0)
        .to(
          heroSplit.chars,
          {
            opacity: 1,
            y: 0,
            duration: DUR.reveal,
            stagger: staggerFor(heroSplit.chars.length, 0.025, 0.45),
          },
          0.1,
        )
        // The outlined word is the page's signature move: it rises out from
        // behind its mask a beat after the type above it.
        .to(
          heroOutlineRef.current,
          { yPercent: 0, duration: DUR.reveal, ease: EASE.outStrong },
          "-=0.5",
        )
        .to(
          [heroSubRef.current, heroCtaRef.current],
          { autoAlpha: 1, y: 0, duration: DUR.reveal, stagger: 0.08 },
          "-=0.55",
        )
        .to(
          heroImgRef.current,
          { autoAlpha: 1, scale: 1, duration: DUR.reveal + 0.3 },
          "-=0.6",
        );
    },
    { dependencies: [loading.revealed] },
  );

  // Stat tiles and journal cards arrive in batches, so items that enter together
  // stagger together and items that enter alone do not wait on their neighbours.
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const batchRise = (targets, duration = DUR.state) => {
      gsap.set(targets, { autoAlpha: 0, y: RISE });

      ScrollTrigger.batch(targets, {
        start: START.item,
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration,
            ease: EASE.out,
            stagger: 0.07,
            overwrite: true,
          }),
      });
    };

    const animateStats = () => {
      const tiles = [...heroStatsRef.current.children];

      if (prefersReduced()) {
        gsap.set(tiles, SHOWN);
        return;
      }

      batchRise(tiles, DUR.quick);
    };

    const animateTicker = () => {
      if (prefersReduced()) return;

      // The ribbon is placed rather than slid in, so the page's wipes stay the
      // family of reveals reserved for passing between states.
      gsap.set(tickerRef.current, { clipPath: "inset(50% 0% 50% 0%)" });
      gsap.to(tickerRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: DUR.state,
        ease: EASE.outStrong,
        scrollTrigger: { trigger: tickerRef.current, start: START.item },
      });
    };

    const animateValues = () => {
      const headingSplit = new SplitText(valuesHeadingRef.current, {
        type: "lines, chars",
        mask: "lines",
      });

      const descSplit = new SplitText(valuesDescRef.current, {
        type: "lines",
        mask: "lines",
      });

      if (prefersReduced()) {
        gsap.set(
          [valuesImgRef.current, valuesBtnRef.current, headingSplit.chars, descSplit.lines],
          SHOWN,
        );
        return;
      }

      gsap.set(valuesImgRef.current, { autoAlpha: 0, scale: 0.5 });
      gsap.set(valuesBtnRef.current, { autoAlpha: 0, y: 48 });
      gsap.set(headingSplit.chars, { opacity: 0, y: 50 });
      gsap.set(descSplit.lines, { autoAlpha: 0, y: 24 });

      gsap
        .timeline({
          defaults: { ease: EASE.out },
          scrollTrigger: {
            trigger: valuesSectionRef.current,
            start: START.block,
          },
        })
        .to(
          valuesImgRef.current,
          { autoAlpha: 1, scale: 1, duration: DUR.reveal },
          0,
        )
        .to(
          headingSplit.chars,
          {
            opacity: 1,
            y: 0,
            duration: DUR.reveal,
            stagger: staggerFor(headingSplit.chars.length, 0.02, 0.4),
          },
          0,
        )
        // Body copy moves by the line. Staggering a paragraph character by
        // character turns reading into a three second shimmer.
        .to(
          descSplit.lines,
          {
            autoAlpha: 1,
            y: 0,
            duration: DUR.state,
            stagger: 0.08,
          },
          "-=0.6",
        )
        .to(valuesBtnRef.current, { autoAlpha: 1, y: 0, duration: DUR.state }, "-=0.4");
    };

    const animateClasses = () => {
      const headingSplit = new SplitText(ourClassesHeadingRef.current, {
        type: "lines, chars",
        mask: "lines",
      });

      const descSplit = new SplitText(ourClassesDescRef.current, {
        type: "lines",
        mask: "lines",
      });

      const rows = [...ourClassesRightRef.current.childNodes];

      if (prefersReduced()) {
        gsap.set(
          [
            headingSplit.chars,
            descSplit.lines,
            ...rows.flatMap((row) => [
              ...row.childNodes[0].childNodes,
              row.childNodes[1],
            ]),
          ],
          SHOWN,
        );
        return;
      }

      gsap.set(headingSplit.chars, { opacity: 0, y: 50 });
      gsap.set(descSplit.lines, { autoAlpha: 0, y: 24 });

      const classesTl = gsap.timeline({
        defaults: { ease: EASE.out },
        scrollTrigger: {
          trigger: ourClassesLeftRef.current,
          start: START.block,
        },
      });

      classesTl
        .to(headingSplit.chars, {
          opacity: 1,
          y: 0,
          duration: DUR.reveal,
          stagger: staggerFor(headingSplit.chars.length, 0.05, 0.5),
        })
        .to(
          descSplit.lines,
          { autoAlpha: 1, y: 0, duration: DUR.state, stagger: 0.08 },
          "-=0.6",
        );

      rows.forEach((row) => {
        const label = row.childNodes[0];
        const rule = row.childNodes[1];

        gsap.set(label.childNodes, {
          autoAlpha: 0,
          x: (index) => (index === 0 ? -50 : 50),
        });
        gsap.set(rule, { scaleX: 0, transformOrigin: "0% 50%" });

        const rowTl = gsap
          .timeline({ defaults: { ease: EASE.out } })
          .to(label.childNodes, {
            autoAlpha: 1,
            x: 0,
            duration: DUR.reveal,
            stagger: 0.1,
          })
          // The rule draws in behind the labels once they have settled.
          .to(rule, { scaleX: 1, duration: DUR.state }, "<+=0.35");

        classesTl.add(rowTl, "<+=0.2");
      });
    };

    const animateSupportingHeading = (target) => {
      const split = new SplitText(target, { type: "lines", mask: "lines" });

      if (prefersReduced()) {
        gsap.set(split.lines, SHOWN);
        return;
      }

      gsap.set(split.lines, { autoAlpha: 0, y: RISE });

      gsap.to(split.lines, {
        autoAlpha: 1,
        y: 0,
        duration: DUR.reveal,
        stagger: 0.08,
        ease: EASE.out,
        scrollTrigger: { trigger: target, start: START.block },
      });
    };

    const animateJournal = () => {
      animateSupportingHeading(journalHeadingRef.current);

      if (!prefersReduced()) {
        gsap.set(journalLinkRef.current, { autoAlpha: 0, x: 12 });
        gsap.to(journalLinkRef.current, {
          autoAlpha: 1,
          x: 0,
          duration: DUR.state,
          ease: EASE.out,
          scrollTrigger: { trigger: journalHeadingRef.current, start: START.block },
        });
      }

      batchRise([...journalGridRef.current.children]);
    };

    const animateCta = () => {
      if (!ctaHeadingRef.current || !ctaParaRef.current) return;

      let headingSplit;
      let paraSplit;
      let reveal;

      /*
       * Line breaks are baked in when text is split, so a split taken at
       * another width - or before the web font lands, when the fallback face
       * wraps differently - leaves the CTA showing stale breaks ("on us."
       * stranded on its own line on desktop). Rebuilding is what keeps them
       * honest, so the reveal is re-created whenever the text would re-wrap.
       */
      const buildCta = () => {
        // The reveal plays once, so a rebuild after it has run settles the
        // fresh elements into their final state rather than replaying it.
        const settled = !!reveal && reveal.progress() > 0;

        reveal?.scrollTrigger?.kill();
        reveal?.kill();
        reveal = null;
        headingSplit?.revert();
        paraSplit?.revert();

        headingSplit = new SplitText(ctaHeadingRef.current, {
          // `words` is what keeps the heading from breaking inside a word: chars
          // are inline-block, so without a word wrapper around them the browser
          // will happily wrap between any two letters ("YO / UR JOURNEY?").
          type: "lines, words, chars",
          mask: "lines",
        });

        paraSplit = new SplitText(ctaParaRef.current, {
          type: "lines",
          mask: "lines",
        });

        if (settled || prefersReduced()) {
          gsap.set(
            [headingSplit.chars, paraSplit.lines, ctaBtnRef.current],
            SHOWN,
          );
          return;
        }

        gsap.set(headingSplit.chars, { opacity: 0, y: 50 });
        gsap.set(paraSplit.lines, { autoAlpha: 0, y: 24 });
        gsap.set(ctaBtnRef.current, { autoAlpha: 0, y: 25 });

        reveal = gsap
          .timeline({
            defaults: { ease: EASE.out },
            scrollTrigger: { trigger: ctaSectionRef.current, start: START.block },
          })
          .to(headingSplit.chars, {
            opacity: 1,
            y: 0,
            duration: DUR.reveal,
            stagger: staggerFor(headingSplit.chars.length, 0.025, 0.5),
          })
          .to(
            paraSplit.lines,
            { autoAlpha: 1, y: 0, duration: DUR.state, stagger: 0.08 },
            "-=0.6",
          )
          .to(ctaBtnRef.current, { autoAlpha: 1, y: 0, duration: DUR.state }, "-=0.3");
      };

      buildCta();

      /*
       * A rebuild replaces DOM, so it is debounced - a window drag would
       * otherwise thrash. The paragraph is the fluid box, so watching it catches
       * every width the card takes, and the font event catches the swap of the
       * fallback face, which changes the glyphs without changing the box.
       */
      let timer;
      const resettle = () => {
        clearTimeout(timer);
        timer = setTimeout(buildCta, 200);
      };

      const box = new ResizeObserver(resettle);
      box.observe(ctaParaRef.current);
      document.fonts?.addEventListener("loadingdone", resettle);

      return () => {
        clearTimeout(timer);
        box.disconnect();
        document.fonts?.removeEventListener("loadingdone", resettle);
      };
    };

    animateStats();
    animateTicker();
    animateValues();
    animateClasses();
    animateSupportingHeading(whyChooseUsHeadingRef.current);
    animateJournal();
    animateSupportingHeading(testimonialHeadingRef.current);
    animateSupportingHeading(faqHeadingRef.current);

    // The CTA is the one reveal that rebuilds itself, so its observers have to
    // be released along with the rest of the context.
    return animateCta();
  }, []);

  return (
    <>
      <Nav />
      <main className="w-[90%] max-w-360 mx-auto">
        {/* Hero Section */}
        <section className="mt-10 lg:mt-16">
          <div className="mx-auto max-w-6xl text-center">
            <p
              ref={heroEyebrowRef}
              className="eyebrow text-smoke flex items-center justify-center gap-3"
            >
              <span className="inline-block w-2 h-2 bg-lime"></span>
              Premium Training Club — Est. 2012
            </p>
            <h1 className="font-bebas-neue leading-[0.92] mt-6">
              <span ref={heroTextRef} className="block text-[19vw] lg:text-[10rem]">
                FIND YOUR
              </span>
              <span className="block overflow-hidden">
                <span
                  ref={heroOutlineRef}
                  className="block text-outline text-[19vw] lg:text-[10rem]"
                >
                  STRENGTH
                </span>
              </span>
            </h1>
            <p
              ref={heroSubRef}
              className="mt-6 max-w-xl mx-auto text-ink/70 leading-relaxed"
            >
              Elite coaching, world-class equipment, and a community built on
              discipline. Train at the standard — whatever standard you&apos;re
              chasing.
            </p>
            <div
              ref={heroCtaRef}
              className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button className="bg-ink text-paper px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-lime hover:text-ink transition-colors duration-300 cursor-pointer">
                Start Your Journey
              </button>
              <button className="border border-ink px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-ink hover:text-paper transition-colors duration-300 cursor-pointer">
                Explore Programs
              </button>
            </div>
          </div>

          <div ref={heroImgRef} className="relative mx-auto mt-12 lg:mt-16 max-w-6xl">
            <div
              className="absolute -inset-3 lg:-inset-4 bg-lime rounded-2xl translate-x-4 translate-y-4"
              aria-hidden="true"
            ></div>
            <div className="relative overflow-hidden rounded-2xl lg:h-[32rem]">
              <Image
                src={HERO_IMAGE}
                alt="CoreX training floor"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          <div
            ref={heroStatsRef}
            className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-hairline border border-hairline"
          >
            {heroStats.map((stat) => (
              <div key={stat.label} className="bg-paper p-6 lg:p-8 text-center">
                <p className="font-bebas-neue text-5xl lg:text-6xl">
                  {stat.value}
                </p>
                <p className="eyebrow text-smoke mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ticker Ribbon */}
        <div
          ref={tickerRef}
          className="mt-20 lg:mt-28 w-screen relative left-1/2 -translate-x-1/2 bg-lime py-4 border-y border-ink -rotate-1 overflow-hidden"
        >
          <div className="flex w-max animate-ticker">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={i}
                className="flex items-center whitespace-nowrap px-8"
                aria-hidden={i >= tickerItems.length}
              >
                <span className="font-bebas-neue text-3xl lg:text-4xl uppercase tracking-wide">
                  {item}
                </span>
                <span className="ml-8 text-xl text-ink/50">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <section
          ref={valuesSectionRef}
          className="mt-24 lg:mt-40 lg:w-3/5 mx-auto flex flex-col items-center text-center gap-7"
        >
          <div ref={valuesImgRef}>
            <div className="w-16 h-16 bg-lime rotate-45 flex items-center justify-center">
              <span className="-rotate-45 font-bebas-neue text-4xl">C</span>
            </div>
          </div>
          <p className="eyebrow text-smoke">01 / Our Philosophy</p>
          <h3
            ref={valuesHeadingRef}
            className="font-bebas-neue text-5xl lg:text-7xl leading-[0.95]"
          >
            Fitness should be
            <br />
            accessible to everyone
          </h3>
          <p ref={valuesDescRef} className="max-w-xl text-ink/70 leading-relaxed">
            CoreX is a premium training club built on a single belief:
            world-class coaching, equipment, and community should be within
            reach of anyone willing to put in the work. Beginner or athlete —
            you belong here.
          </p>
          <button
            ref={valuesBtnRef}
            className="bg-ink text-paper px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-lime hover:text-ink transition-colors duration-300 cursor-pointer"
          >
            Join Now
          </button>
        </section>

        {/* Our Classes */}
        <section className="mt-24 lg:mt-40 flex max-lg:flex-wrap justify-between items-start gap-10 lg:gap-16">
          {/* Left Part */}
          <div ref={ourClassesLeftRef} className="lg:w-1/2">
            <p className="eyebrow text-smoke">02 / Training Programs</p>
            <h5
              ref={ourClassesHeadingRef}
              className="font-bebas-neue text-5xl lg:text-7xl mt-4"
            >
              Choose Your Track
            </h5>
            <p
              ref={ourClassesDescRef}
              className="mt-5 max-w-md text-ink/70 leading-relaxed"
            >
              Structured programs engineered for every level — from your first
              rep to your final set. Your coach, your pace, your standard.
            </p>
          </div>
          {/* Right Part */}
          <div ref={ourClassesRightRef} className="w-full lg:w-1/2">
            {["Men", "Women", "Kids"].map((category) => (
              <div key={category} className="group pt-8 cursor-pointer">
                <div className="flex justify-between items-center">
                  <div className="flex items-baseline gap-4">
                    <span className="font-bebas-neue text-5xl lg:text-6xl tracking-wide group-hover:text-lime transition-colors duration-300">
                      {category}
                    </span>
                    <span className="eyebrow text-smoke group-hover:text-ink transition-colors duration-300">
                      Dedicated Track
                    </span>
                  </div>
                  <span className="w-11 h-11 rounded-full border border-hairline flex items-center justify-center group-hover:bg-ink group-hover:border-ink group-hover:text-lime transition-all duration-300">
                    <FiArrowUpRight />
                  </span>
                </div>
                <div className="w-full mt-5 h-px bg-ink/40"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mt-24 lg:mt-40">
          <p className="eyebrow text-smoke text-center">03 / Why CoreX</p>
          <h1
            ref={whyChooseUsHeadingRef}
            className="font-bebas-neue text-5xl lg:text-7xl text-center mt-4 mb-16 lg:mb-24 leading-[0.95]"
          >
            Why Choose CoreX?
          </h1>
          <div className="flex flex-col max-lg:gap-14 lg:gap-24">
            {whyChooseUsData.map((item) => (
              <WhyUs key={item.id} {...item} />
            ))}
          </div>
        </section>

        {/* Journal */}
        <section className="mt-24 lg:mt-40">
          <div className="flex max-lg:flex-col max-lg:gap-3 justify-between items-end mb-10">
            <div>
              <p className="eyebrow text-smoke">04 / The Journal</p>
              <h1
                ref={journalHeadingRef}
                className="font-bebas-neue text-5xl lg:text-7xl mt-4 leading-[0.95]"
              >
                Stories, tips & insights
                <br className="hidden lg:block" />
                straight from the floor.
              </h1>
            </div>
            <span
              ref={journalLinkRef}
              className="eyebrow text-smoke shrink-0 cursor-pointer hover:text-ink transition-colors duration-300"
            >
              View all →
            </span>
          </div>
          <div
            ref={journalGridRef}
            className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {highlightsData.map((highlight, i) => (
              <Highlight key={highlight.id} index={i + 1} {...highlight} />
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-24 lg:mt-40">
          <div className="text-center mb-10">
            <p className="eyebrow text-smoke">05 / Member Stories</p>
            <h2
              ref={testimonialHeadingRef}
              className="font-bebas-neue text-5xl lg:text-7xl mt-4 leading-[0.95]"
            >
              What Our Members Say
            </h2>
            <p className="mt-4 text-ink/70">
              We don&apos;t just transform bodies — we transform habits.
            </p>
          </div>
          <div
            ref={testimonialMarqueeRef}
            className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden py-4 -mt-4"
            style={{
              maskImage:
                "radial-gradient(ellipse 50% 150% at 50% 50%, black 75%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 50% 150% at 50% 50%, black 75%, transparent 100%)",
            }}
          >
            <div className="flex w-max gap-6 animate-marquee pl-8 pt-4 pb-10">
              {[...testimonialsData, ...testimonialsData].map(
                (testimonial, idx) => (
                  <Testimonial
                    key={idx}
                    quote={testimonial.quote}
                    name={testimonial.name}
                    imgSrc={testimonial.imgSrc}
                  />
                ),
              )}
            </div>
          </div>
        </section>

        {/* Faq */}
        <section className="mt-24 lg:mt-40 md:flex justify-between gap-12">
          <div className="md:w-1/3 h-fit">
            <p className="eyebrow text-smoke">06 / FAQ</p>
            <h2
              ref={faqHeadingRef}
              className="font-bebas-neue text-5xl lg:text-7xl mt-4 leading-[0.95]"
            >
              Questions Answered
            </h2>
            <p className="mt-4 text-ink/70">
              Everything you need to know before your first session.
            </p>
          </div>
          <div className="md:w-1/2 lg:ml-auto mt-10 md:mt-0">
            {faqData.map((item) => (
              <Faq key={item.id} {...item} />
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="mt-24 lg:mt-40">
          <div className="bg-ink text-paper rounded-3xl px-6 py-20 lg:py-28 text-center relative overflow-hidden">
            <div
              className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-lime opacity-15 blur-3xl"
              aria-hidden="true"
            ></div>
            <div
              className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-lime opacity-10 blur-3xl"
              aria-hidden="true"
            ></div>
            <div ref={ctaSectionRef} className="relative">
              <h2
                ref={ctaHeadingRef}
                className="font-bebas-neue text-5xl lg:text-8xl leading-[0.95]"
              >
                Ready to Start Your Journey?
              </h2>
              <p
                ref={ctaParaRef}
                className="mt-5 text-paper/60 max-w-xl mx-auto leading-relaxed"
              >
                Sign up today and unlock your full potential with CoreX — your
                first session is on us.
              </p>
              <button
                ref={ctaBtnRef}
                className="mt-10 bg-lime text-ink px-12 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-paper transition-colors duration-300 cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
