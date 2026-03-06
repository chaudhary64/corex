"use client";
import React, { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import Highlight from "@/app/components/Highlight";
import Faq from "./components/Faq";
import WhyUs from "./components/WhyUs";
import Testimonial from "./components/Testimonial";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Home = () => {
  const highlightsData = [
    {
      id: 1,
      description:
        "Our training journal where we share intense workouts, recovery protocols, and science-backed nutritional advice.",
      link: "Read the blog",
    },
    {
      id: 2,
      description:
        "Insights from our Head Coach on building strength, improving mobility, and achieving sustainable fat loss.",
      link: "Read the blog",
    },
    {
      id: 3,
      description:
        "Read a detailed transformation case study covering the entire training program, nutrition plan, and real results.",
      link: "Read the blog",
    },
    {
      id: 4,
      description:
        "Daily motivation, essential form cues, and inspiring member wins straight from the gym floor.",
      link: "Read the blog",
    },
  ];
  const faqData = [
    {
      id: 1,
      question: "Which plan includes weights and cardio?",
      answer:
        "Our all-access membership includes unlimited weight training, group cardio sessions, and open gym hours—perfect for a balanced routine.",
    },
    {
      id: 2,
      question: "How often should I train for muscle growth?",
      answer:
        "For most beginners and intermediates, 4–5 sessions per week with rest days in between is optimal for muscle growth and recovery.",
    },
    {
      id: 3,
      question: "Is a strict diet needed for results?",
      answer:
        "Not strict, but consistency matters—focus on balanced meals with adequate protein, whole carbs, and healthy fats for best results.",
    },
    {
      id: 4,
      question: "Can beginners get personal coaching?",
      answer:
        "Yes, beginners benefit most from one-on-one coaching since trainers create a custom plan, unlike group classes which are general.",
    },
    {
      id: 5,
      question: "What other facilities are available?",
      answer:
        "We provide a cardio zone, functional training area, yoga studio, steam room, and personal lockers for every member.",
    },
    {
      id: 6,
      question: "Is nutrition guidance included?",
      answer:
        "Yes, our certified nutritionists provide meal guidance and custom diet charts based on your fitness goals and body type.",
    },
    {
      id: 7,
      question: "Are there beginner-friendly classes?",
      answer:
        "Yes, we offer beginner classes and programs tailored for those new to fitness, with extra guidance from trainers.",
    },
    {
      id: 8,
      question: "Can I pause my membership if needed?",
      answer:
        "Absolutely! You can pause your membership for up to 3 months due to travel, health, or personal reasons.",
    },
  ];
  const whyChooseUsData = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1642267165393-951c20e0a8b8?q=80&w=1154&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      heading: "Why CoreX is Different",
      description: `CoreX is more than a gym — it's the place where lasting change starts. We build mental resilience, sustainable habits, and a supportive community that keeps you motivated. Our approach combines cutting-edge training methods with personalized attention to help you become your strongest self.`,
      btnTxt: "[ Get Your Membership Now ]",
      layout: "l-r",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1534368270820-9de3d8053204?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      heading: "Ready to Take the Plunge with CoreX?",
      description: `Imagine having unlimited access to premium workouts, expert trainers, and top - class facilities — all in one membership. At CoreX, we make fitness simple, flexible, and designed around your lifestyle.
      `,
      btnTxt: "[ Get Started Now ]",
      layout: "r-l",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1585892478726-d26363dbf9e8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      heading: "Experience Training Like Never Before with CoreX",
      description: `At CoreX, our trainers don’t just guide you — they transform you. Each certified professional blends science, motivation, and personalization to craft a fitness plan that works for you.

      Unlike standard gyms, CoreX trainers go beyond reps and sets. They focus on your goals, your progress, and your lifestyle to ensure lasting results.`,
      btnTxt: "[ Get Started Now ]",
      layout: "l-r",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1685633224306-2a2b37050713?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      heading: "Train Smarter with CoreX Equipment",
      description: `At CoreX, we’ve invested in the best so you can train at your best.
      Every machine, every space — designed to help you push limits and see real results.`,
      btnTxt: "[ Explore CoreX Memberships ]",
      layout: "r-l",
    },
  ];

  const testimonialsData = [
    {
      id: 1,
      quote:
        "CoreX helped me transform my lifestyle. The trainers are amazing and the community is so supportive!",
      name: "Alex",
      imgSrc:
        "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=1240&auto=format&fit=crop",
    },
    {
      id: 2,
      quote:
        "I love the variety of classes. There’s something new to try every week!",
      name: "Priya",
      imgSrc:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: 3,
      quote:
        "The personalized programs made it easy for me to stay motivated and reach my goals.",
      name: "John",
      imgSrc:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1287&auto=format&fit=crop",
    },
    {
      id: 4,
      quote:
        "I've never felt stronger. The community here pushes you to be your absolute best.",
      name: "Sarah",
      imgSrc:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop",
    },
    {
      id: 5,
      quote:
        "Top-tier equipment, expert trainers, and an atmosphere that just breeds success.",
      name: "Marcus",
      imgSrc:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop",
    },
    {
      id: 6,
      quote:
        "Joining CoreX was the best decision I made for my fitness journey. The results say it all.",
      name: "Elena",
      imgSrc:
        "https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1240&auto=format&fit=crop",
    },
    {
      id: 7,
      quote:
        "The energy is infectious. Working out here isn't a chore, it's the best part of my day.",
      name: "Angel",
      imgSrc:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1240&auto=format&fit=crop",
    },
  ];

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

    const heroTimeline = gsap.timeline();

    const split = new SplitText(heroTextRef.current, {
      type: "words, chars",
      mask: "words",
    });

    heroTimeline
      .from(split.chars, {
        opacity: 0,
        y: 50,
        stagger: 0.025,
        duration: 1,
        ease: "power2.out",
      })
      .from(
        heroImgRef.current,
        {
          opacity: 0,
          scale: 0.85,
          duration: 1,
          ease: "power2.out",
        },
        "<=0.75",
      );

    let mm = gsap.matchMedia();

    mm.add("(width < 64rem)", () => {
      const valueHeadingSplit = new SplitText(valuesHeadingRef.current, {
        type: "lines, chars",
        mask: "lines",
      });

      const valueDescSplit = new SplitText(valuesDescRef.current, {
        type: "lines, chars",
        mask: "lines",
      });

      gsap.from(valuesImgRef.current, {
        opacity: 0,
        scale: 0.5,
        rotate: gsap.utils.random([-360, 360]),
        duration: 1.75,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: valuesImgRef.current,
          start: "top bottom",
          end: "bottom 20%",
        },
      });

      gsap.from(valueHeadingSplit.chars, {
        opacity: 0,
        y: 50,
        stagger: 0.02,
        ease: "power2.out",
        scrollTrigger: {
          trigger: valuesHeadingRef.current,
          start: "top 82.5%",
          end: "bottom 20%",
        },
      });

      gsap.from(valueDescSplit.chars, {
        opacity: 0,
        stagger: 0.01,
        ease: "power2.out",
        scrollTrigger: {
          trigger: valuesDescRef.current,
          start: "top 82.5%",
          end: "bottom 20%",
        },
      });

      gsap.from(valuesBtnRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.25,
        ease: "power2.out",
        scrollTrigger: {
          trigger: valuesBtnRef.current,
          start: "top 95%",
          end: "bottom 20%",
        },
      });

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

      const classesTl = gsap.timeline({
        scrollTrigger: {
          trigger: ourClassesLeftRef.current,
          start: "top 85%",
          end: "bottom 20%",
        },
      });

      classesTl
        .from(ourClassesHeadingSplit.chars, {
          opacity: 0,
          y: 50,
          stagger: 0.05,
          ease: "power2.out",
        })
        .from(
          ourClassesDescSplit.chars,
          {
            opacity: 0,
            stagger: 0.01,
            ease: "power2.out",
          },
          "<",
        );

      [...ourClassesRightRef.current.childNodes].map((child) => {
        const upperPart = child.childNodes[0];
        const lowerPart = child.childNodes[1];

        const tl = gsap.timeline();

        tl.from(upperPart.childNodes, {
          opacity: 0,
          x: (index) => (index === 0 ? -50 : 50),
          stagger: 0.1,
        }).from(
          lowerPart,
          {
            width: 0,
            duration: 1,
            ease: "power2.out",
          },
          "<+=0.5",
        );

        classesTl.add(tl, "<+=0.25");
      });

      const whyUsHeadingSplit = new SplitText(whyChooseUsHeadingRef.current, {
        type: "lines, chars",
        mask: "lines",
      });

      gsap.from(whyUsHeadingSplit.chars, {
        opacity: 0,
        y: 50,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: whyChooseUsHeadingRef.current,
          start: "top 85%",
          end: "bottom 20%",
        },
      });

      const faqHeadingSplit = new SplitText(faqHeadingRef.current, {
        type: "lines, chars",
        mask: "lines",
      });

      gsap.from(faqHeadingSplit.chars, {
        y: 50,
        opacity: 0,
        stagger: 0.05,
        scrollTrigger: {
          trigger: faqHeadingRef.current,
          start: "top 85%",
        },
      });

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

      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 90%",
          end: "bottom 20%",
        },
      });

      ctaTl
        .from(ctaSectionHeadingSplit.chars, {
          y: 50,
          opacity: 0,
          stagger: 0.025,
          ease: "power2.out",
        })
        .from(
          ctaSectionParaSplit.chars,
          {
            y: 50,
            opacity: 0,
            stagger: 0.01,
            ease: "power2.out",
          },
          "<",
        )
        .from(
          ctaSectionRef.current.childNodes[2],
          {
            y: 25,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "<+=0.5",
        );
    });

    mm.add("(width >= 64rem)", () => {
      const valueHeadingSplit = new SplitText(valuesHeadingRef.current, {
        type: "lines, chars",
        mask: "lines",
      });

      const valueDescSplit = new SplitText(valuesDescRef.current, {
        type: "lines, chars",
        mask: "lines",
      });

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

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: valuesSectionRef.current,
          start: "center bottom",
          end: "bottom 20%",
        },
      });

      tl.from(
        valuesImgRef.current,
        {
          opacity: 0,
          scale: 0.5,
          rotate: gsap.utils.random([-360, 360]),
          duration: 1.75,
          ease: "power2.out",
        },
        0,
      )
        .from(
          valueHeadingSplit.chars,
          {
            opacity: 0,
            y: 50,
            stagger: 0.02,
            ease: "power2.out",
          },
          0,
        )
        .from(
          valueDescSplit.chars,
          {
            opacity: 0,
            stagger: 0.01,
            ease: "power2.out",
          },
          0,
        )
        .from(
          valuesBtnRef.current,
          {
            opacity: 0,
            y: 50,
            duration: 1.25,
            ease: "power2.out",
          },
          0,
        );

      const classesTl = gsap.timeline({
        scrollTrigger: {
          trigger: ourClassesLeftRef.current,
          start: "top 85%",
          end: "bottom 20%",
        },
      });

      classesTl
        .from(ourClassesHeadingSplit.chars, {
          opacity: 0,
          y: 50,
          stagger: 0.05,
          ease: "power2.out",
        })
        .from(
          ourClassesDescSplit.chars,
          {
            opacity: 0,
            stagger: 0.01,
            ease: "power2.out",
          },
          "<",
        );

      [...ourClassesRightRef.current.childNodes].map((child) => {
        const upperPart = child.childNodes[0];
        const lowerPart = child.childNodes[1];

        const tl = gsap.timeline();

        tl.from(upperPart.childNodes, {
          opacity: 0,
          x: (index) => (index === 0 ? -50 : 50),
          stagger: 0.1,
        }).from(
          lowerPart,
          {
            width: 0,
            duration: 1,
            ease: "power2.out",
          },
          "<+=0.5",
        );

        classesTl.add(tl, "<+=0.25");
      });

      const whyUsHeadingSplit = new SplitText(whyChooseUsHeadingRef.current, {
        type: "lines, chars",
        mask: "lines",
      });

      gsap.from(whyUsHeadingSplit.chars, {
        opacity: 0,
        y: 50,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: whyChooseUsHeadingRef.current,
          start: "top 85%",
          end: "bottom 20%",
        },
      });

      const faqHeadingSplit = new SplitText(faqHeadingRef.current, {
        type: "lines, chars",
        mask: "lines",
      });

      gsap.from(faqHeadingSplit.chars, {
        y: 50,
        opacity: 0,
        stagger: 0.05,
        scrollTrigger: {
          trigger: faqHeadingRef.current,
          start: "top 85%",
        },
      });

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

      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 90%",
          end: "bottom 20%",
        },
      });

      ctaTl
        .from(ctaSectionHeadingSplit.chars, {
          y: 50,
          opacity: 0,
          stagger: 0.025,
          ease: "power2.out",
        })
        .from(
          ctaSectionParaSplit.chars,
          {
            y: 50,
            opacity: 0,
            stagger: 0.01,
            ease: "power2.out",
          },
          "<",
        )
        .from(
          ctaSectionRef.current.childNodes[2],
          {
            y: 25,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "<+=0.5",
        );
    });
  }, []);

  return (
    <>
      <main className="w-[90%] max-w-[1440px] mx-auto">
        {/* Hero Section */}
        <section className="mt-10 lg:mt-28">
          <div ref={heroTextRef} className="mx-auto text-center">
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
            className="mx-auto mt-5 lg:mt-10 max-w-5xl lg:h-[512px] rounded-xl overflow-hidden"
          >
            <img
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
          <img ref={valuesImgRef} src="/logo/Star Logo.svg" className="h-20" />
          <h3 ref={valuesHeadingRef} className="text-6xl font-bebas-neue">
            Fitness should be
            <br />
            Accessible to Everyone
          </h3>
          <p ref={valuesDescRef}>
            CoreX is a modern fitness platform that connects you with top
            trainers, personalized programs, and a community of fitness
            enthusiasts. Whether you&apos;re a beginner or an experienced
            athlete, CoreX has something for everyone.
          </p>
          <button
            ref={valuesBtnRef}
            className="py-2 px-10 rounded-full cursor-pointer font-bold border-2 border-black hover:bg-black hover:text-white transition-colors duration-700"
          >
            Join Now
          </button>
        </section>

        {/* Our Classes */}
        <section className="mt-16 lg:mt-28 flex max-lg:flex-wrap justify-between items-center gap-5 lg:gap-10">
          {/* Left Part */}
          <div ref={ourClassesLeftRef} className="lg:w-1/2">
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
                <div className="w-full mt-3 border-b"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mt-16 lg:mt-28">
          <h1
            ref={whyChooseUsHeadingRef}
            className="mb-16 font-bebas-neue text-6xl text-center"
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
            className="h-fit text-4xl font-bebas-neue mb-4"
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
        <section ref={ctaSectionRef} className="mt-16 lg:mt-28 text-center">
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
    </>
  );
};

export default Home;
