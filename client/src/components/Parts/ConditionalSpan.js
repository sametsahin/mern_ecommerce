import React from "react";

const ConditionalSpan = ({ type, text }) => {
  let fnl;
  if (type === "green") {
    fnl = (
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        {text}
      </span>
    );
  } else if (type === "red") {
    fnl = (
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
        {text}
      </span>
    );
  }

  return fnl;
};

export default ConditionalSpan;
