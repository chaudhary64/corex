import React from "react";

const Highlight = ({ description, link }) => {
  return (
    <div className="w-full flex flex-col justify-between bg-white/75 shadow-lg rounded-xl p-6">
      <p>{description}</p>
      <span className="mt-2 font-semibold underline underline-offset-1 cursor-pointer">
        {link}
      </span>
    </div>
  );
};

export default Highlight;
