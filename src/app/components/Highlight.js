import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import Image from "./Image";

const Highlight = ({ index, imgSrc, description, link }) => {
  return (
    <article className="group w-full flex-1 flex flex-col bg-white border border-hairline hover:border-ink/40 transition-colors duration-500 cursor-pointer overflow-hidden rounded-xl">
      <div className="relative h-44 lg:h-52 overflow-hidden">
        <Image
          src={imgSrc}
          alt={link}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <span className="absolute top-4 left-4 bg-lime px-2.5 py-1 eyebrow text-ink">
          J—{String(index).padStart(2, "0")}
        </span>
      </div>
      <div className="p-6 lg:p-7 flex flex-col flex-1 justify-between gap-8">
        <p className="text-sm leading-relaxed text-ink/70">{description}</p>
        <div className="flex items-center justify-between border-t border-hairline pt-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em]">
            {link}
          </span>
          <span className="w-9 h-9 rounded-full bg-paper border border-hairline flex items-center justify-center group-hover:bg-ink group-hover:border-ink group-hover:text-lime transition-colors duration-500">
            <FiArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </span>
        </div>
      </div>
    </article>
  );
};

export default Highlight;
