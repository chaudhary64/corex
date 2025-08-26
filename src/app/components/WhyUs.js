"use client";
import React, { useEffect, useState } from "react";

const WhyUs = ({ src, heading, description, btnTxt, layout }) => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="flex max-lg:flex-wrap max-lg:gap-4">
      {layout === "l-r" || screenWidth < 768 ? (
        <>
          <img className="max-lg:w-full lg:w-1/2" src={src} alt={heading} />
          <div className="max-lg:w-full lg:w-1/2 px-8 flex flex-col justify-center text-center">
            <h2 className="text-3xl font-bold font-bebas-neue">{heading}</h2>
            <div
              className="mt-4 mb-6 text-gray-900"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
            <button className="font-mozilla-headline">{btnTxt}</button>
          </div>
        </>
      ) : (
        <>
          <div className="max-lg:w-full lg:w-1/2 px-8 flex flex-col justify-center text-center">
            <h2 className="text-3xl font-bold font-bebas-neue">{heading}</h2>
            <div
              className="mt-4 mb-6 text-gray-900"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
            <button className="font-mozilla-headline">{btnTxt}</button>
          </div>
          <img className="max-lg:w-full lg:w-1/2" src={src} alt={heading} />
        </>
      )}
    </div>
  );
};

export default WhyUs;
