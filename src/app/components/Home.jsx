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

const Home = () => {
  const heroEyebrowRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroOutlineRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroCtaRef = useRef(null);
  const heroImgRef = useRef(null);

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

  const faqHeadingRef = useRef(null);

  const ctaSectionRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const animateHero = () => {
      const heroTimeline = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      const split = new SplitText(heroTextRef.current, {
        type: "words, chars",
        mask: "words",
      });

      gsap.set(heroTextRef.current, { opacity: 1 });
      gsap.set(split.chars, {
        opacity: 0,
        y: 50,
      });
      gsap.set(heroOutlineRef.current, { yPercent: 115 });

      heroTimeline
        .to(heroEyebrowRef.current, { opacity: 1, duration: 0.8 }, 0)
        .to(split.chars, {
          opacity: 1,
          y: 0,
          stagger: 0.025,
          duration: 1,
        })
        .to(heroOutlineRef.current, {
          yPercent: 0,
          duration: 1.1,
          ease: "power4.out",
        }, "+=0.15")
        .to(heroSubRef.current, { opacity: 1, y: 0, duration: 0.8 }, "<=0.2")
        .to(heroCtaRef.current, { opacity: 1, y: 0, duration: 0.8 }, "<=0.1")
        .to(
          heroImgRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.25,
          },
          "<=0.5",
        );
    };

    const animateValues = (isMobile) => {
      const valueHeadingSplit = new SplitText(valuesHeadingRef.current, {
        type: "lines, chars",
      });

      const valueDescSplit = new SplitText(valuesDescRef.current, {
        type: "lines, chars",
      });

      gsap.set(valuesHeadingRef.current, { opacity: 1 });
      gsap.set(valuesDescRef.current, { opacity: 1 });

      gsap.set(valueHeadingSplit.chars, {
        opacity: 0,
        y: 50,
      });

      gsap.set(valueDescSplit.chars, {
        opacity: 0,
      });

      if (isMobile) {
        gsap.to(valuesImgRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: valuesImgRef.current,
            start: "top bottom",
            end: "bottom 20%",
          },
        });

        gsap.to(valueHeadingSplit.chars, {
          opacity: 1,
          y: 0,
          stagger: 0.02,
          ease: "power2.out",
          scrollTrigger: {
            trigger: valuesHeadingRef.current,
            start: "top 82.5%",
            end: "bottom 20%",
          },
        });

        gsap.to(valueDescSplit.chars, {
          opacity: 1,
          stagger: 0.01,
          ease: "power2.out",
          scrollTrigger: {
            trigger: valuesDescRef.current,
            start: "top 82.5%",
            end: "bottom 20%",
          },
        });

        gsap.to(valuesBtnRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: valuesBtnRef.current,
            start: "top 95%",
            end: "bottom 20%",
          },
        });
      } else {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: valuesSectionRef.current,
            start: "center bottom",
            end: "bottom 20%",
          },
        });

        tl.to(
          valuesImgRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.25,
          },
          0,
        )
          .to(
            valueHeadingSplit.chars,
            {
              opacity: 1,
              y: 0,
              stagger: 0.02,
            },
            0,
          )
          .to(
            valueDescSplit.chars,
            {
              opacity: 1,
              stagger: 0.01,
            },
            0,
          )
          .to(
            valuesBtnRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 1.25,
            },
            0,
          );
      }
    };

    const animateClasses = () => {
      const ourClassesHeadingSplit = new SplitText(
        ourClassesHeadingRef.current,
        {
          type: "lines, chars",
          mask: "lines",
        },
      );

      const ourClassesDescSplit = new SplitText(ourClassesDescRef.current, {
        type: "lines, chars",
        mask: "lines",
      });

      gsap.set(ourClassesLeftRef.current, { opacity: 1 });
      gsap.set(ourClassesHeadingSplit.chars, {
        opacity: 0,
        y: 50,
      });
      gsap.set(ourClassesDescSplit.chars, {
        opacity: 0,
      });

      const classesTl = gsap.timeline({
        scrollTrigger: {
          trigger: ourClassesLeftRef.current,
          start: "top 85%",
          end: "bottom 20%",
        },
      });

      classesTl
        .to(ourClassesHeadingSplit.chars, {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: "power2.out",
        })
        .to(
          ourClassesDescSplit.chars,
          {
            opacity: 1,
            stagger: 0.01,
            ease: "power2.out",
          },
          "<",
        );

      [...ourClassesRightRef.current.childNodes].map((child) => {
        const upperPart = child.childNodes[0];
        const lowerPart = child.childNodes[1];

        gsap.set(upperPart.childNodes, {
          opacity: 0,
          x: (index) => (index === 0 ? -50 : 50),
        });

        const tl = gsap.timeline();

        tl.to(upperPart.childNodes, {
          opacity: 1,
          x: 0,
          stagger: 0.1,
        }).to(
          lowerPart,
          {
            width: "100%",
            duration: 1,
            ease: "power2.out",
          },
          "<+=0.5",
        );

        classesTl.add(tl, "<+=0.25");
      });
    };

    const animateWhyChooseUs = () => {
      const whyUsHeadingSplit = new SplitText(whyChooseUsHeadingRef.current, {
        type: "lines, chars",
        mask: "lines",
      });

      gsap.set(whyChooseUsHeadingRef.current, { opacity: 1 });
      gsap.set(whyUsHeadingSplit.chars, {
        opacity: 0,
        y: 50,
      });

      gsap.to(whyUsHeadingSplit.chars, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: whyChooseUsHeadingRef.current,
          start: "top 85%",
          end: "bottom 20%",
        },
      });
    };

    const animateFaq = () => {
      const faqHeadingSplit = new SplitText(faqHeadingRef.current, {
        type: "lines, chars",
        mask: "lines",
      });

      gsap.set(faqHeadingRef.current, { opacity: 1 });
      gsap.set(faqHeadingSplit.chars, {
        opacity: 0,
        y: 50,
      });

      gsap.to(faqHeadingSplit.chars, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: faqHeadingRef.current,
          start: "top 85%",
        },
      });
    };

    const animateCta = () => {
      const ctaSectionHeadingSplit = new SplitText(
        ctaSectionRef.current.childNodes[0],
        {
          type: "lines, chars",
          mask: "lines",
        },
      );

      const ctaSectionParaSplit = new SplitText(
        ctaSectionRef.current.childNodes[1],
        {
          type: "lines, chars",
          mask: "lines",
        },
      );

      gsap.set(ctaSectionRef.current, { opacity: 1 });
      gsap.set(ctaSectionHeadingSplit.chars, {
        opacity: 0,
        y: 50,
      });
      gsap.set(ctaSectionParaSplit.chars, {
        opacity: 0,
        y: 50,
      });
      gsap.set(ctaSectionRef.current.childNodes[2], {
        opacity: 0,
        y: 25,
      });

      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 90%",
          end: "bottom 20%",
        },
      });

      ctaTl
        .to(ctaSectionHeadingSplit.chars, {
          y: 0,
          opacity: 1,
          stagger: 0.025,
          ease: "power2.out",
        })
        .to(
          ctaSectionParaSplit.chars,
          {
            y: 0,
            opacity: 1,
            stagger: 0.01,
            ease: "power2.out",
          },
          "<",
        )
        .to(
          ctaSectionRef.current.childNodes[2],
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          },
          "<+=0.5",
        );
    };

    animateHero();

    let mm = gsap.matchMedia();

    mm.add("(width < 64rem)", () => {
      animateValues(true);
      animateClasses();
      animateWhyChooseUs();
      animateFaq();
      animateCta();
    });

    mm.add("(width >= 64rem)", () => {
      animateValues(false);
      animateClasses();
      animateWhyChooseUs();
      animateFaq();
      animateCta();
    });
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
              className="eyebrow text-smoke opacity-0 flex items-center justify-center gap-3"
            >
              <span className="inline-block w-2 h-2 bg-lime"></span>
              Premium Training Club — Est. 2012
            </p>
            <h1 className="font-bebas-neue leading-[0.92] mt-6">
              <span
                ref={heroTextRef}
                className="block text-[19vw] lg:text-[10rem] opacity-0"
              >
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
              className="mt-6 max-w-xl mx-auto text-ink/70 leading-relaxed opacity-0 translate-y-4"
            >
              Elite coaching, world-class equipment, and a community built on
              discipline. Train at the standard — whatever standard you&apos;re
              chasing.
            </p>
            <div
              ref={heroCtaRef}
              className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 translate-y-4"
            >
              <button className="bg-ink text-paper px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-lime hover:text-ink transition-colors duration-300 cursor-pointer">
                Start Your Journey
              </button>
              <button className="border border-ink px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-ink hover:text-paper transition-colors duration-300 cursor-pointer">
                Explore Programs
              </button>
            </div>
          </div>

          <div
            ref={heroImgRef}
            className="relative mx-auto mt-12 lg:mt-16 max-w-6xl opacity-0 scale-[0.95]"
          >
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

          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-hairline border border-hairline">
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
        <div className="mt-20 lg:mt-28 w-screen relative left-1/2 -translate-x-1/2 bg-lime py-4 border-y border-ink -rotate-1">
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
          <div ref={valuesImgRef} className="opacity-0 scale-50">
            <div className="w-16 h-16 bg-lime rotate-45 flex items-center justify-center">
              <span className="-rotate-45 font-bebas-neue text-4xl">C</span>
            </div>
          </div>
          <p className="eyebrow text-smoke">01 / Our Philosophy</p>
          <h3
            ref={valuesHeadingRef}
            className="font-bebas-neue text-5xl lg:text-7xl opacity-0 leading-[0.95]"
          >
            Fitness should be
            <br />
            accessible to everyone
          </h3>
          <p
            ref={valuesDescRef}
            className="max-w-xl text-ink/70 leading-relaxed opacity-0"
          >
            CoreX is a premium training club built on a single belief:
            world-class coaching, equipment, and community should be within
            reach of anyone willing to put in the work. Beginner or athlete —
            you belong here.
          </p>
          <button
            ref={valuesBtnRef}
            className="bg-ink text-paper px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-lime hover:text-ink transition-colors duration-300 cursor-pointer opacity-0 translate-y-12"
          >
            Join Now
          </button>
        </section>

        {/* Our Classes */}
        <section className="mt-24 lg:mt-40 flex max-lg:flex-wrap justify-between items-start gap-10 lg:gap-16">
          {/* Left Part */}
          <div ref={ourClassesLeftRef} className="lg:w-1/2 opacity-0">
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
                <div className="w-0 mt-5 h-px bg-ink/40"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mt-24 lg:mt-40">
          <p className="eyebrow text-smoke text-center">03 / Why CoreX</p>
          <h1
            ref={whyChooseUsHeadingRef}
            className="font-bebas-neue text-5xl lg:text-7xl text-center mt-4 mb-16 lg:mb-24 opacity-0 leading-[0.95]"
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
              <h1 className="font-bebas-neue text-5xl lg:text-7xl mt-4 leading-[0.95]">
                Stories, tips & insights
                <br className="hidden lg:block" />
                straight from the floor.
              </h1>
            </div>
            <span className="eyebrow text-smoke shrink-0 cursor-pointer hover:text-ink transition-colors duration-300">
              View all →
            </span>
          </div>
          <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-4 gap-5">
            {highlightsData.map((highlight, i) => (
              <Highlight key={highlight.id} index={i + 1} {...highlight} />
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-24 lg:mt-40">
          <div className="text-center mb-10">
            <p className="eyebrow text-smoke">05 / Member Stories</p>
            <h2 className="font-bebas-neue text-5xl lg:text-7xl mt-4 leading-[0.95]">
              What Our Members Say
            </h2>
            <p className="mt-4 text-ink/70">
              We don&apos;t just transform bodies — we transform habits.
            </p>
          </div>
          <div
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
              className="font-bebas-neue text-5xl lg:text-7xl mt-4 opacity-0 leading-[0.95]"
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
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-lime opacity-10 blur-3xl" aria-hidden="true"></div>
            <div ref={ctaSectionRef} className="relative opacity-0">
              <h2 className="font-bebas-neue text-5xl lg:text-8xl leading-[0.95]">
                Ready to Start Your Journey?
              </h2>
              <p className="mt-5 text-paper/60 max-w-xl mx-auto leading-relaxed">
                Sign up today and unlock your full potential with CoreX — your
                first session is on us.
              </p>
              <button className="mt-10 bg-lime text-ink px-12 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-paper transition-colors duration-300 cursor-pointer">
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
