import React from "react";

const Testimonial = ({ quote, name, imgSrc }) => {
  return (
    <div className="group w-[400px] md:w-[450px] shrink-0 flex flex-col justify-between bg-white/75 hover:bg-white/90 backdrop-blur-sm shadow-md hover:shadow-xl border border-gray-100 transition-all duration-500 rounded-2xl p-8 cursor-pointer relative overflow-hidden">
      {/* Decorative Quote Mark */}
      <div className="absolute top-4 right-6 w-24 h-24 text-black/5 group-hover:text-[#E7B2AA]/20 transition-colors duration-500 fill-current">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          xmlSpace="preserve"
        >
          <g
            style={{
              stroke: "none",
              strokeWidth: 0,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              fill: "currentColor",
              fillRule: "nonzero",
              opacity: 1,
            }}
            transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
          >
            <path
              d="M 0 13.077 V 44.13 c 0 2.526 2.048 4.575 4.575 4.575 h 20.723 c 1.775 0 3.214 1.439 3.214 3.214 v 0 c 0 9.88 -8.009 17.889 -17.889 17.889 H 7.016 c -2.034 0 -3.683 1.649 -3.683 3.683 v 4.324 c 0 2.034 1.649 3.683 3.683 3.683 h 3.606 c 16.337 0 29.58 -13.243 29.58 -29.58 v -3.214 V 38.027 v -24.95 c 0 -2.526 -2.048 -4.575 -4.575 -4.575 H 4.575 C 2.048 8.502 0 10.55 0 13.077 z"
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeMiterlimit: 10,
                fill: "currentColor",
                fillRule: "nonzero",
                opacity: 1,
              }}
              transform=" matrix(1 0 0 1 0 0) "
              strokeLinecap="round"
            />
            <path
              d="M 49.798 13.077 V 44.13 c 0 2.526 2.048 4.575 4.575 4.575 h 20.723 c 1.775 0 3.214 1.439 3.214 3.214 v 0 c 0 9.88 -8.009 17.889 -17.889 17.889 h -3.606 c -2.034 0 -3.683 1.649 -3.683 3.683 v 4.324 c 0 2.034 1.649 3.683 3.683 3.683 h 3.606 c 16.337 0 29.58 -13.243 29.58 -29.58 v -3.214 V 38.027 v -24.95 c 0 -2.526 -2.048 -4.575 -4.575 -4.575 H 54.372 C 51.846 8.502 49.798 10.55 49.798 13.077 z"
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeMiterlimit: 10,
                fill: "currentColor",
                fillRule: "nonzero",
                opacity: 1,
              }}
              transform=" matrix(1 0 0 1 0 0) "
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      <p className="italic leading-relaxed text-gray-700 relative z-10">
        &quot;{quote}&quot;
      </p>

      <div className="mt-8 flex items-center justify-between border-t border-gray-200/60 pt-5 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#E7B2AA] transition-colors duration-300 shadow-sm group-hover:shadow-md">
            <img
              src={imgSrc}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bebas-neue text-lg tracking-wide text-black uppercase">
              {name}
            </span>
            <span className="text-xs text-gray-500 font-bold tracking-widest uppercase">
              CoreX Member
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
