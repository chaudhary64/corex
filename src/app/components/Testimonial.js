import React from "react";
import Image from "./Image";

const Testimonial = ({ quote, name, imgSrc }) => {
  return (
    <figure className="group w-[85vw] max-w-100 md:w-112.5 shrink-0 flex flex-col justify-between bg-white border border-hairline hover:border-lime/80 transition-colors duration-500 rounded-xl p-6 md:p-8 cursor-pointer relative overflow-hidden">
      {/* Decorative Quote Mark */}
      <div className="absolute top-2 right-4 md:top-4 md:right-6 w-16 h-16 md:w-20 md:h-20 text-lime/25 group-hover:text-lime/50 transition-colors duration-500 fill-current select-none">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
        </svg>
      </div>

      <blockquote className="text-sm md:text-base leading-relaxed text-ink/80 relative z-10">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <figcaption className="mt-6 md:mt-8 flex items-center gap-3 md:gap-4 border-t border-hairline pt-4 md:pt-5 relative z-10">
        <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-lime transition-all duration-300">
          <Image
            src={imgSrc}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-bebas-neue text-base md:text-lg tracking-wide uppercase">
            {name}
          </span>
          <span className="eyebrow text-smoke">CoreX Member</span>
        </div>
      </figcaption>
    </figure>
  );
};

export default Testimonial;
