"use client";
import React, { useState } from "react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-[90%] max-w-[1440px] mx-auto relative">
      <nav className="py-4 flex items-center justify-between border-b border-gray-500">
        <span className="font-black cursor-pointer">COREX</span>
        <ul className="max-lg:hidden max-lg:invisible flex items-center gap-6">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Trainers</li>
          <li className="cursor-pointer">Programs</li>
          <li className="cursor-pointer">Experiences</li>
          <li className="cursor-pointer">Pricing</li>
        </ul>
        <button className="max-lg:hidden max-lg:invisible bg-black text-white py-2 px-10 rounded-full cursor-pointer">
          Get Started
        </button>

        {/* Toggle Mobile Navigation */}
        <button
          className="cursor-pointer lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white">
            <ul className="flex flex-col py-4">
              <li className="py-2">Home</li>
              <li className="py-2">Trainers</li>
              <li className="py-2">Programs</li>
              <li className="py-2">Experiences</li>
              <li className="py-2">Pricing</li>
            </ul>
            <button className="w-full bg-black text-white py-2 rounded-full cursor-pointer">
              Get Started
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Nav;
