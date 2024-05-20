import React from "react";
import Heading from "../layout/Heading";
import CoursesCard from "../layout/CoursesCard";
import webImg from "../assets/web-dev.svg";
import appImg from "../assets/App-dev.svg";
import graphicImg from "../assets/graphic.svg";
import digitalImg from "../assets/digital.svg";

const Courses = () => {
  return (
    <div className="min-h-screen flex flex-col items-center md:px-32 px-5 my-10">
      <Heading title2="الدورات التي نقدمها" />

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-6"
        style={{ direction: "rtl" }}
      >
        <CoursesCard img={webImg} title="رياضيات - الفرع العلمي" />
        <CoursesCard img={appImg} title="كيمياء - الفرع العلمي" />
        <CoursesCard img={graphicImg} title="اللغة العربية - الفرع الأدبي" />
        <CoursesCard img={digitalImg} title="محاسبة - الفرع التجاري" />
        <CoursesCard img={webImg} title="رياضيات - الفرع العلمي" />
      </div>
    </div>
  );
};

export default Courses;
