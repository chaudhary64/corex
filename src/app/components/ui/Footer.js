import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import { LuLinkedin } from "react-icons/lu";

const Footer = () => {
  return (
    <footer className="mt-16 lg:mt-28">
      <div>
        {/* Upper Part */}
        <div className="max-lg:hidden max-lg:invisible w-[90%] max-w-[1440px] mx-auto pb-16 flex justify-between items-center">
          <div
            style={{
              lineHeight: 1,
            }}
            className="flex items-center gap-2 text-xs"
          >
            <span>
              HEARD <br /> Enough
            </span>
            <FaArrowRightLong />
          </div>
          <div>
            <h2
              style={{
                textDecoration: "#FFB900 wavy underline 3px",
                textUnderlineOffset: "0.2rem",
              }}
              className="text-6xl font-bebas-neue"
            >
              Contact Us
            </h2>
          </div>
          <span className="bg-amber-400 rounded-full p-8">
            <FaArrowRightLong />
          </span>
        </div>
        {/* Lower Part */}
        <div className="py-16 bg-black text-white">
          <div className="w-[90%] max-w-[1440px] mx-auto flex max-lg:flex-wrap justify-between max-lg:gap-8">
            <div className="max-lg:w-full">
              <h2 className="text-4xl font-bebas-neue">
                MAKE YOUR BODY STRONGER THAN YESTERDAY
              </h2>
              <h1
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px white",
                  lineHeight: 1,
                }}
                className="text-[7rem] font-bebas-neue"
              >
                COREX
              </h1>
            </div>
            <div className="flex flex-col text-sm gap-1">
              <span className="underline underline-offset-2">Home</span>
              <span className="underline underline-offset-2">Trainers</span>
              <span className="underline underline-offset-2">Programs</span>
              <span className="underline underline-offset-2">Experience</span>
              <span className="underline underline-offset-2">Pricing</span>
            </div>
            <div className="flex flex-col text-sm gap-1">
              <span className="underline underline-offset-2">
                PRIVACY POLICY
              </span>
              <span className="underline underline-offset-2">
                TERMS OF SERVICE
              </span>
              <span className="underline underline-offset-2">
                COOKIE POLICY
              </span>
              <span className="underline underline-offset-2">Faq</span>
            </div>
            <div className="text-sm flex flex-col gap-1">
              <h5>
                <span className="text-amber-400">GET STARTED</span> WITH OUR
                PROGRAMS
              </h5>
              <div className="flex items-center gap-2">
                <span className="underline underline-offset-2">
                  SIGN UP FOR OUR NEWSLETTER
                </span>
                <FaArrowRightLong />
              </div>
              <div>
                <span>Follow Us:</span>
                <div className="mt-2 flex gap-2 text-base">
                  <FaInstagram />
                  <FiFacebook />
                  <FiTwitter />
                  <LuLinkedin />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
