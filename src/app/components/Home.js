"use client";
import React, { useRef } from "react";
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
import { highlightsData, faqData, whyChooseUsData, testimonialsData } from "@/app/data/homeData";

const Home = () => {

  const heroTextRef = useRef(null);
  const heroImgRef = useRef(null);

  const valuesSectionRef = useRef(null);
  const valuesImgRef = useRef(null);
  const valuesHeadingRef = useRef(null);
  const valuesDescRef = useRef(null);
  const valuesBtnRef = useRef(null);

  const ourClassesLeftRef = useRef(null);
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

      heroTimeline
        .to(split.chars, {
          opacity: 1,
          y: 0,
          stagger: 0.025,
          duration: 1,
        })
        .to(
          heroImgRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.25,
          },
          "<=0.75",
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
          rotate: 0,
          startAt: { rotate: gsap.utils.random([-360, 360]) },
          duration: 1.75,
          delay: 0.5,
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
        let tl = gsap.timeline({
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
            rotate: 0,
            startAt: { rotate: gsap.utils.random([-360, 360]) },
            duration: 1.75,
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
        ourClassesLeftRef.current.childNodes[0],
        {
          type: "lines, chars",
          mask: "lines",
        },
      );

      const ourClassesDescSplit = new SplitText(
        ourClassesLeftRef.current.childNodes[1],
        {
          type: "lines, chars",
          mask: "lines",
        },
      );

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
        <section className="mt-10 lg:mt-28">
          <div ref={heroTextRef} className="mx-auto text-center opacity-0">
            <p className="text-sm">ACHIEVE YOUR FITNESS GOALS</p>
            <h1
              style={{
                lineHeight: 1,
              }}
              className="text-7xl lg:text-[7rem] font-bebas-neue"
            >
              FIND YOUR STRENGTH
            </h1>
          </div>
          <div
            ref={heroImgRef}
            className="mx-auto mt-5 lg:mt-10 max-w-5xl lg:h-128 rounded-xl overflow-hidden opacity-0 scale-[0.85]"
          >
            <Image
              src="https://images.unsplash.com/photo-1584863231364-2edc166de576?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Hero Image"
              className="object-cover object-center h-full w-full"
            />
          </div>
        </section>

        {/* Values Section */}
        <section
          ref={valuesSectionRef}
          className="mt-16 lg:mt-28 lg:w-1/2 mx-auto flex flex-col items-center text-center gap-6"
        >
          <Image
            ref={valuesImgRef}
            src="/logo/Star_Logo.svg"
            className="h-20 opacity-0 scale-50"
          />
          <h3 ref={valuesHeadingRef} className="text-6xl font-bebas-neue opacity-0">
            Fitness should be
            <br />
            Accessible to Everyone
          </h3>
          <p ref={valuesDescRef} className="opacity-0">
            CoreX is a modern fitness platform that connects you with top
            trainers, personalized programs, and a community of fitness
            enthusiasts. Whether you&apos;re a beginner or an experienced
            athlete, CoreX has something for everyone.
          </p>
          <button
            ref={valuesBtnRef}
            className="py-2 px-10 rounded-full cursor-pointer font-bold border-2 border-black hover:bg-black hover:text-white transition-colors duration-700 opacity-0 translate-y-12"
          >
            Join Now
          </button>
        </section>

        {/* Our Classes */}
        <section className="mt-16 lg:mt-28 flex max-lg:flex-wrap justify-between items-center gap-5 lg:gap-10">
          {/* Left Part */}
          <div ref={ourClassesLeftRef} className="lg:w-1/2 opacity-0">
            <h5 className="font-bebas-neue text-4xl max-lg:text-center">
              Our Classes
            </h5>
            <p className="mt-2">
              Explore a variety of fitness classes designed for all levels, from
              yoga and pilates to high-intensity interval training (HIIT). Our
              expert trainers will guide you every step of the way.
            </p>
          </div>
          {/* Right Part */}
          <div ref={ourClassesRightRef} className="w-full lg:w-1/2">
            {["Men", "Women", "Kids"].map((category) => (
              <div key={category} className="pt-3 font-bold cursor-pointer">
                <div className="flex justify-between items-center">
                  <span>{category}</span>
                  <FiArrowUpRight />
                </div>
                <div className="w-0 mt-3 border-b"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mt-16 lg:mt-28">
          <h1
            ref={whyChooseUsHeadingRef}
            className="mb-16 font-bebas-neue text-6xl text-center opacity-0"
          >
            Why Choose Us?
          </h1>
          <div className="flex flex-col max-lg:gap-8">
            {whyChooseUsData.map((item, index) => (
              <WhyUs key={index} {...item} />
            ))}
          </div>
        </section>

        {/* Transformation is an Art */}
        <section className="mt-16 lg:mt-28">
          <h1 className="font-bebas-neue text-4xl max-lg:text-center">
            Stories, tips & insights
            <br className="hidden lg:block" />
            straight from the gym floor.
          </h1>
          <div className="flex max-lg:flex-wrap justify-between gap-8 mt-8">
            {highlightsData.map((highlight) => (
              <Highlight
                key={highlight.id}
                description={highlight.description}
                link={highlight.link}
              />
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-16 lg:mt-28">
          <h2 className="text-4xl font-bebas-neue text-center">
            What Our Members Say
          </h2>
          <p className="mb-8 text-center text-gray-800">
            We dont just transform bodies, we transform lives.
          </p>
          <div
            className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden py-4 -mt-4"
            style={{
              maskImage:
                "radial-gradient(ellipse 50% 150% at 50% 50%, black 75%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 50% 150% at 50% 50%, black 75%, transparent 100%)",
            }}
          >
            <div className="flex w-max gap-8 animate-marquee pl-8 pt-4 pb-12">
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
        <section className="mt-16 lg:mt-28 md:flex justify-between">
          <h2
            ref={faqHeadingRef}
            className="h-fit text-4xl font-bebas-neue mb-4 opacity-0"
          >
            FAQ ({faqData.length})
          </h2>
          <div className="md:w-1/2 lg:ml-auto">
            {faqData.map((item) => (
              <Faq key={item.id} {...item} />
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section ref={ctaSectionRef} className="mt-16 lg:mt-28 text-center opacity-0">
          <h2 className="text-4xl font-bebas-neue mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="mb-6">
            Sign up today and unlock your full potential with CoreX!
          </p>
          <button className="py-3 px-12 rounded-full cursor-pointer bg-[#E7B2AA] text-black font-bold hover:bg-black hover:text-white transition-colors duration-700">
            Get Started
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
