import React from "react";
import { Link } from "react-scroll";

const Footer = () => {
  return (
    <div className="flex flex-col gap-6 pb-4 flex-wrap bg-darkMode-dark50 dark:bg-darkMode-dark900 rounded-t-lg md:px-15 p-3 border-t-4 border-green-600 dark:border-darkMode-dark100">
      <div
        className="flex gap-4 font-semibold text-lg items-center justify-center flex-wrap"
        style={{ direction: "rtl" }}
      >
        <Link
          to="home"
          spy={true}
          smooth={true}
          duration={500}
          className="text-gray-800 dark:text-darkMode-dark50 dark:hover:text-mainColor500  hover:textmainColor5000 transition-colors cursor-pointer"
        >
          الصفحة الرئيسية
        </Link>
        <Link
          to="about"
          spy={true}
          smooth={true}
          duration={500}
          className="text-gray-800 dark:text-darkMode-dark50 dark:hover:text-mainColor500 hover:text-mainColor500 transition-colors cursor-pointer"
        >
          من نحن؟
        </Link>
        <Link
          to="courses"
          spy={true}
          smooth={true}
          duration={500}
          className="text-gray-800 dark:text-darkMode-dark50 dark:hover:text-mainColor500 hover:text-mainColor500 transition-colors cursor-pointer"
        >
          الدورات التي نقدمها
        </Link>
        <Link
          to="reviews"
          spy={true}
          smooth={true}
          duration={500}
          className="text-gray-800 dark:text-darkMode-dark50 dark:hover:text-mainColor500 hover:text-mainColor500 transition-colors cursor-pointer"
        >
          آراء طُلابنا
        </Link>
        <Link
          to="contact"
          spy={true}
          smooth={true}
          duration={500}
          className="text-gray-800 dark:text-darkMode-dark50 dark:hover:text-mainColor500 hover:text-mainColor500 transition-colors cursor-pointer"
        >
          إعلانات
        </Link>
      </div>
      <div className="text-center text-mainColor900 dark:text-darkMode-dark50 font-bold">
        <p>
          {" "}
          © جميع الحقوق محفوظة لموقع{" "}
          <span className="text-mainColor500 hover:text-mainColor400 cursor-pointer">
            تفوَّق
          </span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
