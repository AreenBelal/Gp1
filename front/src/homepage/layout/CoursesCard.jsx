import React from "react";
import webImg from "../assets/web-dev.svg";

const CoursesCard = (props) => {
  return (
    <div className="bg-darkMode-dark50 dark:bg-darkMode-dark800 rounded-lg shadow-md dark:shadow hover:shadow-lg dark:hover:shadow-md transition-shadow p-6 cursor-pointer dark:shadow-darkMode-dark200 dark:hover:shadow-darkMode-dark200 duration-200">
      <div className="w-32 h-32 mx-auto mb-6">
        <img
          src={props.img}
          alt="img"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div>
        <h3 className="font-semibold text-xl text-center mb-4 dark:text-darkMode-dark50">
          {props.title}
        </h3>
        <p className="text-gray-700 text-lg text-center dark:text-darkMode-dark50">
          zz
        </p>
      </div>
    </div>
  );
};

export default CoursesCard;
