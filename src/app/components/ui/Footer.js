"use client";

import React, { useRef } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import { LuLinkedin } from "react-icons/lu";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

const Footer = () => {
  const upperLeftRef = useRef(null);
  const upperCenterRef = useRef(null);
  const upperRightRef = useRef(null);
  const pathRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    gsap.registerPlugin(SplitText, DrawSVGPlugin);

    mm.add("(width >= 64rem)", () => {
      const upperLeftText = upperLeftRef.current.children[0];
      const upperLeftArrow = upperLeftRef.current.children[1].children[0];

      const upperCenterText = upperCenterRef.current;

      const upperLeftTextSplit = new SplitText(upperLeftText, {
        type: "lines,words,chars",
        mask: "lines",
      });

      const upperCenterTextSplit = new SplitText(upperCenterText, {
        type: "chars",
        mask: "chars",
      });

      gsap.set(upperLeftTextSplit.lines, {
        xPercent: -100,
        opacity: 0,
      });

      gsap.set(upperLeftArrow, {
        xPercent: 100,
      });

      gsap.set(upperCenterTextSplit.chars, {
        yPercent: 100,
        opacity: 0,
      });

      gsap.set(pathRef.current, {
        drawSVG: 0,
      });

      const upperTl = gsap.timeline({
        scrollTrigger: {
          trigger: upperLeftRef.current,
          start: "top 80%",
          end: "bottom 60%",
        },
      });

      upperTl
        .to(upperLeftTextSplit.lines, {
          xPercent: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
        })
        .to(
          upperLeftArrow,
          {
            xPercent: 0,
            ease: "power2.out",
          },
          0,
        )
        .to(
          upperCenterTextSplit.chars,
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.8,
            ease: "power2.out",
          },
          0,
        )
        .to(
          pathRef.current,
          {
            drawSVG: "100%",
            duration: 2.5,
            ease: "power2.out",
          },
          "-=0.5",
        )
        .to(
          upperRightRef.current,
          {
            scale: 1,
            ease: "back.out(1.7)",
          },
          0,
        );
    });
  });

  return (
    <footer className="mt-24 lg:mt-40">
      <div>
        {/* Upper Part */}
        <div className="hidden lg:flex w-[90%] max-w-360 mx-auto pb-20 justify-between items-center">
          <div
            ref={upperLeftRef}
            style={{
              lineHeight: 1,
            }}
            className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em]"
          >
            <span>
              HEARD <br /> Enough
            </span>
            <div className="overflow-clip">
              <FaArrowRightLong />
            </div>
          </div>
          <div className="text-center">
            <h2 ref={upperCenterRef} className="text-7xl font-bebas-neue">
              Contact Us
            </h2>
            {/* Sine Wave */}
            <svg
              width="214"
              height="12"
              viewBox="0 0 214 12"
              fill="none"
              className="-mt-2 w-full"
            >
              <path
                ref={pathRef}
                d="M1.50006 6L2.02888 5.36595L2.55771 4.74454L3.08653 4.14819L3.61535 3.58878L4.14417 3.07748L4.67299 2.6245L5.20182 2.23886L5.73064 1.92828L6.25946 1.69893L6.78828 1.5554L7.3171 1.50055L7.84593 1.53548L8.37475 1.65949L8.90357 1.8701L9.43239 2.16312L9.96121 2.53269L10.49 2.97144L11.0189 3.47062L11.5477 4.02027L12.0765 4.60943L12.6053 5.22632L13.1341 5.85865L13.663 6.49381L14.1918 7.1191L14.7206 7.72208L15.2494 8.29069L15.7783 8.81359L16.3071 9.28036L16.8359 9.68168L17.3647 10.0095L17.8935 10.2574L18.4224 10.4203L18.9512 10.495L19.48 10.48L20.0088 10.3757L20.5377 10.184L21.0665 9.90884L21.5953 9.5557L22.1241 9.13161L22.6529 8.64503L23.1818 8.10568L23.7106 7.52432L24.2394 6.91254L24.7682 6.28256L25.2971 5.64693L25.8259 5.01836L26.3547 4.40936L26.8835 3.83211L27.4123 3.29811L27.9412 2.81802L28.47 2.40142L28.9988 2.05662L29.5276 1.7905L30.0565 1.60837L30.5853 1.51387L31.1141 1.50888L31.6429 1.5935L32.1717 1.76604L32.7006 2.02305L33.2294 2.35943L33.7582 2.76843L34.287 3.24192L34.8159 3.77044L35.3447 4.34344L35.8735 4.9495L36.4023 5.57651L36.9311 6.21198L37.46 6.84322L37.9888 7.45763L38.5176 8.04296L39.0464 8.58753L39.5752 9.08046L40.1041 9.51194L40.6329 9.87334L41.1617 10.1575L41.6905 10.3586L42.2194 10.4728L42.7482 10.4978L43.277 10.433L43.8058 10.2798L44.3346 10.0411L44.8635 9.72186L45.3923 9.32834L45.9211 8.86841L46.4499 8.35125L46.9788 7.78717L47.5076 7.18743L48.0364 6.564L48.5652 5.92931L49.094 5.29605L49.6229 4.67682L50.1517 4.08399L50.6805 3.5294L51.2093 3.0241L51.7382 2.57817L52.267 2.20053L52.7958 1.89869L53.3246 1.67868L53.8534 1.54489L54.3823 1.5L54.9111 1.54489L55.4399 1.67868L55.9687 1.89869L56.4976 2.20053L57.0264 2.57817L57.5552 3.0241L58.084 3.5294L58.6128 3.58878L59.1417 3.77044L59.6705 4.08399L60.1993 4.67682L60.7281 5.29605L61.257 5.92931L61.7858 6.564L62.3146 7.18743L62.8434 7.78717L63.3722 8.35125L63.9011 8.86841L64.4299 9.32834L64.9587 9.72186L65.4875 10.0411L66.0164 10.2798L66.5452 10.433L67.074 10.4978L67.6028 10.4728L68.1316 10.3586L68.6605 10.1575L69.1893 9.87334L69.7181 9.51194L70.2469 9.08046L70.7758 8.58753L71.3046 8.04296L71.8334 7.45763L72.3622 6.84322L72.891 6.21198L73.4199 5.57651L73.9487 4.9495L74.4775 4.34344L75.0063 3.77044L75.5352 3.24192L76.064 2.76843L76.5928 2.35943L77.1216 2.02305L77.6504 1.76604L78.1793 1.5935L78.7081 1.50888L79.2369 1.51387L79.7657 1.60837L80.2945 1.7905L80.8234 2.05662L81.3522 2.40142L81.881 2.81802L82.4098 3.29811L82.9387 3.83211L83.4675 4.40936L83.9963 5.01836L84.5251 5.64693L85.0539 6.28256L85.5828 6.91254L86.1116 7.52432L86.6405 8.10568L87.1692 8.64503L87.6981 9.13161L88.2269 9.5557L88.7557 9.90884L89.2845 10.184L89.8133 10.3757L90.3422 10.48L90.871 10.495L91.3998 10.4203L91.9286 10.2574L92.4575 10.0095L92.9863 9.68168L93.5151 9.28036L94.0439 8.81359L94.5727 8.29069L95.1016 7.72208L95.6304 7.1191L96.1592 6.49381L96.688 5.85865L97.2169 5.22632L97.7457 4.60943L98.2745 4.02027L98.8033 3.47062L99.3321 2.97144L99.861 2.53269L100.39 2.16312L100.919 1.8701L101.447 1.65949L101.976 1.53548L102.505 1.50055L103.034 1.5554L103.563 1.69893L104.092 1.92828L104.62 2.23886L105.149 2.6245L105.678 3.07748L106.207 3.58878L106.736 4.14819L107.264 4.74454L107.793 5.36595L108.322 6L108.851 6.63405L109.38 7.25546L109.909 7.85181L110.437 8.41122L110.966 8.92252L111.495 9.3755L112.024 9.76113L112.553 10.0717L113.082 10.3011L113.61 10.4446L114.139 10.4994L114.668 10.4645L115.197 10.3405L115.726 10.1299L116.254 9.83688L116.783 9.46731L117.312 9.02856L117.841 8.52938L118.37 7.97973L118.899 7.39057L119.427 6.77368L119.956 6.14135L120.485 5.50619L121.014 4.8809L121.543 4.27792L122.071 3.70931L122.6 3.18641L123.129 2.71964L123.658 2.31832L124.187 1.99047L124.716 1.74262L125.244 1.57971L125.773 1.505L126.302 1.51997L126.831 1.62434L127.36 1.816L127.889 2.09116L128.417 2.4443L128.946 2.86839L129.475 3.35497L130.004 3.89432L130.533 4.47568L131.061 5.08746L131.59 5.71744L132.119 6.35307L132.648 6.98164L133.177 7.59064L133.706 8.16789L134.234 8.70189L134.763 9.18198L135.292 9.59858L135.821 9.94338L136.35 10.2095L136.879 10.3916L137.407 10.4861L137.936 10.4065L138.465 10.234L138.994 9.97695L139.523 9.64057L140.051 9.23157L140.58 8.75808L141.109 8.22956L141.638 7.65656L142.167 7.0505L142.696 6.42349L143.224 5.78802L143.753 5.15678L144.282 4.54237L144.811 3.95704L145.34 3.41247L145.868 2.91954L146.397 2.48806L146.926 2.12666L147.455 1.84254L147.984 1.64138L148.513 1.52718L149.041 1.56701L149.57 1.72025L150.099 1.95888L150.628 2.27814L151.157 2.67166L151.686 3.13159L152.214 3.64875L152.743 4.21283L153.272 4.81257L153.801 5.436L154.33 6.07069L154.858 6.70395L155.387 7.32318L155.916 7.91601L156.445 8.4706L156.974 8.9759L157.503 9.42183L158.031 9.79947L158.56 10.1013L159.089 10.3213L159.618 10.4551L160.147 10.5L160.676 10.4551L161.204 10.3213L161.733 10.1013L162.262 9.79947L162.791 9.42183L163.32 8.9759L163.848 8.4706L164.377 7.91601L164.906 7.32318L165.435 6.70395L165.964 6.07069L166.493 5.436L167.021 4.81257L167.55 4.21283L168.079 3.64875L168.608 3.13159L169.137 2.67166L169.665 2.27814L170.194 1.95888L170.723 1.72025L171.252 1.56701L171.781 1.50222L172.31 1.52718L172.838 1.64138L173.367 1.84254L173.896 2.12666L174.425 2.48806L174.954 2.91954L175.483 3.41247L176.011 3.95704L176.54 4.54237L177.069 5.15678L177.598 5.78802L178.127 6.42349L178.655 7.0505L179.184 7.65656L179.713 8.22956L180.242 8.75808L180.771 9.23157L181.3 9.64057L181.828 9.97695L182.357 10.234L182.886 10.4065L183.415 10.4911L183.944 10.4861L184.472 10.3916L185.001 10.2095L185.53 9.94338L186.059 9.59858L186.588 9.18198L187.117 8.70189L187.645 8.16789L188.174 7.59064L188.703 6.98164L189.232 6.35307L189.761 5.71744L190.29 5.08746L190.818 4.47568L191.347 3.89432L191.876 3.35497L192.405 2.86839L192.934 2.4443L193.462 2.09116L193.991 1.816L194.52 1.62434L195.049 1.51997L195.578 1.505L196.107 1.57971L196.635 1.74262L197.164 1.99047L197.693 2.31832L198.222 2.71964L198.751 3.18641L199.28 3.70931L199.808 4.27792L200.337 4.8809L200.866 5.50619L201.395 6.14135L201.924 6.77368L202.452 7.39057L202.981 7.97973L203.51 8.52938L204.039 9.02856L204.568 9.46731L205.097 9.83688L205.625 10.1299L206.154 10.3405L206.683 10.4645L207.212 10.4994L207.741 10.4446L208.269 10.3011L208.798 10.0717L209.327 9.76113L209.856 9.3755L210.385 8.92252L210.914 8.41122L211.442 7.85181L211.971 7.25546L212.5 6.63405"
                stroke="#CCFF00"
                strokeWidth="3"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span ref={upperRightRef} className="bg-lime text-ink rounded-full p-8 scale-0">
            <FaArrowRightLong />
          </span>
        </div>

        {/* Lower Part */}
        <div className="py-16 lg:py-20 bg-ink text-paper">
          <div className="w-[90%] max-w-360 mx-auto flex max-lg:flex-wrap justify-between max-lg:gap-12">
            <div className="max-lg:w-full">
              <p className="eyebrow text-paper/40">CoreX Training Club</p>
              <h2 className="font-bebas-neue text-3xl mt-3">
                MAKE YOUR BODY STRONGER
                <br />
                THAN YESTERDAY
              </h2>
              <h1
                className="text-[18vw] lg:text-[11rem] font-bebas-neue text-outline-light leading-[0.85] mt-6"
                aria-label="CoreX"
              >
                COREX
              </h1>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <span className="eyebrow text-lime mb-2">Explore</span>
              <span className="cursor-pointer hover:text-lime transition-colors duration-300">
                Home
              </span>
              <span className="cursor-pointer hover:text-lime transition-colors duration-300">
                Trainers
              </span>
              <span className="cursor-pointer hover:text-lime transition-colors duration-300">
                Programs
              </span>
              <span className="cursor-pointer hover:text-lime transition-colors duration-300">
                Experience
              </span>
              <span className="cursor-pointer hover:text-lime transition-colors duration-300">
                Pricing
              </span>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <span className="eyebrow text-lime mb-2">Legal</span>
              <span className="cursor-pointer hover:text-lime transition-colors duration-300">
                Privacy Policy
              </span>
              <span className="cursor-pointer hover:text-lime transition-colors duration-300">
                Terms of Service
              </span>
              <span className="cursor-pointer hover:text-lime transition-colors duration-300">
                Cookie Policy
              </span>
              <span className="cursor-pointer hover:text-lime transition-colors duration-300">
                FAQ
              </span>
            </div>
            <div className="text-sm flex flex-col gap-3">
              <span className="eyebrow text-lime">Get Started</span>
              <div className="flex items-center gap-2 cursor-pointer hover:text-lime transition-colors duration-300 w-fit">
                <span className="font-bold uppercase tracking-[0.15em] text-xs">
                  Sign up for our newsletter
                </span>
                <FaArrowRightLong />
              </div>
              <div className="mt-2">
                <span className="eyebrow text-paper/40">Follow Us</span>
                <div className="mt-3 flex gap-3 text-base">
                  <span className="w-9 h-9 rounded-full border border-paper/20 flex items-center justify-center cursor-pointer hover:bg-lime hover:text-ink hover:border-lime transition-colors duration-300">
                    <FaInstagram />
                  </span>
                  <span className="w-9 h-9 rounded-full border border-paper/20 flex items-center justify-center cursor-pointer hover:bg-lime hover:text-ink hover:border-lime transition-colors duration-300">
                    <FiFacebook />
                  </span>
                  <span className="w-9 h-9 rounded-full border border-paper/20 flex items-center justify-center cursor-pointer hover:bg-lime hover:text-ink hover:border-lime transition-colors duration-300">
                    <FiTwitter />
                  </span>
                  <span className="w-9 h-9 rounded-full border border-paper/20 flex items-center justify-center cursor-pointer hover:bg-lime hover:text-ink hover:border-lime transition-colors duration-300">
                    <LuLinkedin />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[90%] max-w-360 mx-auto mt-16 pt-6 border-t border-paper/10 flex max-lg:flex-col max-lg:gap-2 justify-between items-center">
            <p className="eyebrow text-paper/30">
              © 2026 CoreX Training Club. All rights reserved.
            </p>
            <p className="eyebrow text-paper/30">Strength is a habit.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
