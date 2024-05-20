import React from "react";
import img from "../assets/about.svg";
import Button from "../layout/Button";
import Heading from "../layout/Heading";
import { Link } from "react-scroll";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center md:px-32 px-5 mt-14 gap-10">
      <div className="w-full md:w-1/2">
        <img src={img} alt="img" className="w-full max-w-lg mx-auto" />
      </div>

      <div className="w-full md:w-1/2 text-center space-y-6">
        <Heading title2="نبذة عن المعهد" />

        <p className="text-gray-700 dark:text-darkMode-dark200">
          يعتبر معهدنا مركزًا متخصصًا في تقديم التعليم والتدريب على البرمجة
          وتطوير الويب. نحن نسعى جاهدين لتوفير بيئة تعليمية حيوية وملهمة
          لطلابنا.
        </p>
      </div>
    </div>
  );
};

export default About;
