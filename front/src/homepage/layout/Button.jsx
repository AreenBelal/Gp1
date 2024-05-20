import React from "react";

const Button = (props) => {
  return (
    <div>
      <button className="relative bg-brightGreen text-white py-3 px-6 rounded-full mt-4 outline-none border-none shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
        <span className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300"></span>
        <span className="relative z-10">{props.title}</span>
      </button>
    </div>
  );
};

export default Button;
