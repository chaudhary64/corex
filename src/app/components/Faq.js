import React from "react";
import { FiPlus } from "react-icons/fi";

const Faq = ({ id, question, answer }) => {
  const number = id.toString().padStart(2, "0");
  return (
    <div className="border-b border-gray-500 py-4">
      <div className="flex justify-between items-center">
        <div>
          <span>{number + ")"}</span>
          &ensp;
          <span>{question}</span>
        </div>
        <FiPlus className="text-lg" />
      </div>
      <p className="hidden invisible">{answer}</p>
    </div>
  );
};

export default Faq;
