"use client";
import React, { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import Highlight from "@/app/components/Highlight";
import Faq from "./components/Faq";
import WhyUs from "./components/WhyUs";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Home = () => {
  const highlightsData = [
    {
      id: 1,
      description:
        "Our training journal where we share workouts, recovery tips, and science-backed advice.",
      link: "Read the blog",
    },
    {
      id: 2,
      description:
        "Interview with our Head Coach on strength, mobility, and sustainable fat loss today.",
      link: "Read the interview",
    },
    {
      id: 3,
      description:
        "We published a transformation case study: program, nutrition, and real results",
      link: "Read the case study",
    },
    {
      id: 4,
      description:
        "Daily motivation, form cues, and member wins from the gym floor.",
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
      description: `CoreX isn’t just a gym—it’s where real transformation begins.

      <br />
      <br />
      <ul>
        <li>💪 Personalized training made for you</li>
        <li>🎯 Expert coaches who care</li>
        <li>⚡ Next-gen equipment & facilities</li>
        <li>🔥 A community that drives results</li>
      </ul>
      `,
      btnTxt: "[ Get Your Membership Now ]",
      layout: "l-r",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1534368270820-9de3d8053204?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      heading: "Ready to Take the Plunge with CoreX?",
      description: `Imagine having unlimited access to premium workouts, expert trainers, and top-class facilities—all in one membership. At CoreX, we make fitness simple, flexible, and designed around your lifestyle.
      <br />
      <br />
      💪 Strength • 🏊 Cardio • 🧘 Flexibility • 🔥 Endurance 
      `,
      btnTxt: "[ Get Started Now ]",
      layout: "r-l",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1585892478726-d26363dbf9e8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      heading: "Experience Training Like Never Before with CoreX",
      description: `At CoreX, our trainers don’t just guide you—they transform you. Each certified professional blends science, motivation, and personalization to craft a fitness plan that works for you.

Unlike standard gyms, CoreX trainers go beyond reps and sets. They focus on your goals, your progress, and your lifestyle to ensure lasting results.
<br />
<br />
🧠 Expertise • 🤝 Personal Guidance • 💡 Motivation • 📈 Real Results`,
      btnTxt: "[ Get Started Now ]",
      layout: "l-r",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1685633224306-2a2b37050713?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      heading: "Train Smarter with CoreX Equipment",
      description: `At CoreX, we’ve invested in the best so you can train at your best.
      <br />
      <br />
      <ul>
        <li>🏋️ Strength Zone</li>
        <li>🏃 Cardio Hub</li>
        <li>🧘 Flex & Mobility</li>
        <li>⚡ Functional Training</li>
      </ul>
      <br />

Every machine, every space—designed to help you push limits and see real results.`,
      btnTxt: "[ Explore CoreX Memberships ]",
      layout: "r-l",
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
        "<=0.75"
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
        }
      );

      const ourClassesDescSplit = new SplitText(
        ourClassesLeftRef.current.childNodes[1],
        {
          type: "lines, chars",
          mask: "lines",
        }
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
        0
      )
        .from(
          valueHeadingSplit.chars,
          {
            opacity: 0,
            y: 50,
            stagger: 0.02,
            ease: "power2.out",
          },
          0
        )
        .from(
          valueDescSplit.chars,
          {
            opacity: 0,
            stagger: 0.01,
            ease: "power2.out",
          },
          0
        )
        .from(
          valuesBtnRef.current,
          {
            opacity: 0,
            y: 50,
            duration: 1.25,
            ease: "power2.out",
          },
          0
        );

      const classesTl = gsap.timeline({
        scrollTrigger: {
          trigger: ourClassesLeftRef.current,
          start: "top 85%",
          end: "bottom 20%",
          markers: true,
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
          "<"
        );

      console.dir(ourClassesRightRef.current.childNodes);
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
            className="mx-auto mt-5 lg:mt-10 max-w-[1024px] lg:h-[512px] rounded-xl overflow-hidden"
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
              <div
                key={category}
                className="py-3 flex justify-between items-center font-bold border-b cursor-pointer"
              >
                <span>{category}</span>
                <FiArrowUpRight />
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mt-16 lg:mt-28">
          <h1 className="mb-16 font-bebas-neue text-6xl text-center">
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
            Transformation is an art,
            <br className="hidden lg:block" />
            and we are the artists
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
          <h2 className="text-4xl font-bebas-neue text-center mb-8">
            What Our Members Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col justify-between gap-3 bg-white/75 shadow-lg rounded-xl p-6">
              <p className="italic">
                &quot;CoreX helped me transform my lifestyle. The trainers are
                amazing and the community is so supportive!&quot;
              </p>
              <div className="font-bold">- Alex</div>
            </div>
            <div className="flex flex-col justify-between gap-3 bg-white/75 shadow-lg rounded-xl p-6">
              <p className="italic">
                &quot;I love the variety of classes. There’s something new to
                try every week!&quot;
              </p>
              <div className="font-bold">- Priya</div>
            </div>
            <div className="flex flex-col justify-between gap-3 bg-white/75 shadow-lg rounded-xl p-6">
              <p className="italic">
                &quot;The personalized programs made it easy for me to stay
                motivated and reach my goals.&quot;
              </p>
              <div className="font-bold">- John</div>
            </div>
          </div>
        </section>

        {/* Faq */}
        <section className="mt-16 lg:mt-28 md:flex justify-between">
          <h2 className="text-4xl font-bebas-neue mb-4">
            FAQ ({faqData.length})
          </h2>
          <div className="md:w-1/2 lg:ml-auto">
            {faqData.map((item) => (
              <Faq key={item.id} {...item} />
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="mt-16 lg:mt-28 text-center">
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
