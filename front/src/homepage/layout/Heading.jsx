import React from "react";

const Heading = (props) => {
  return (
    <div className="mb-8">
      <h3 className="text-4xl font-bold text-center md:text-left">
        <span className="text-darkText">{props.title1}</span>{" "}
        <span className="text-mainColor500">{props.title2}</span>
      </h3>
    </div>
  );
};

export default Heading;
