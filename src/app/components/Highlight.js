import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

const Highlight = ({ description, link }) => {
  return (
    <div className="group w-full flex-1 flex flex-col justify-between bg-white/75 hover:bg-white/90 backdrop-blur-sm shadow-md hover:shadow-xl border border-gray-100 transition-all duration-500 rounded-2xl p-6 cursor-pointer">
      <p className="text-lg leading-relaxed text-gray-700">{description}</p>
      <div className="mt-10 flex items-center justify-between border-t border-gray-200/60 pt-4">
        <span className="font-bebas-neue text-xl tracking-wide uppercase text-black">
          {link}
        </span>
        <div className="p-2 bg-white text-black shadow-sm group-hover:shadow-md group-hover:bg-black group-hover:text-white rounded-full transition-all duration-500">
          <FiArrowUpRight
            size={20}
            className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Highlight;
