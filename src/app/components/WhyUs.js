"use client";
import React, { useRef } from "react";

const WhyUs = ({ src, heading, description, btnTxt, layout }) => {

  return (
    <div
      className="flex max-lg:flex-wrap max-lg:gap-4"
    >
      {/* Image - Shows first on mobile, positioned based on layout on desktop */}
      <div
        className={`max-lg:w-full lg:w-1/2 relative ${
          layout === "r-l" ? "lg:order-2" : ""
        }`}
      >
        <aside className="absolute inset-0 bg-[#EEEEEE]"></aside>
        <img
          src={src}
          alt={heading}
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Content - Shows second on mobile, positioned based on layout on desktop */}
      <div
        className={`max-lg:w-full lg:w-1/2 px-8 flex flex-col justify-center text-center ${
          layout === "r-l" ? "lg:order-1" : ""
        }`}
      >
        <h2 className="text-3xl font-bold font-bebas-neue">{heading}</h2>
        <div className="my-6 text-gray-900">
          <p>{description}</p>
        </div>
        <button className="font-mozilla-headline">{btnTxt}</button>
      </div>
    </div>
  );
};

export default WhyUs;
