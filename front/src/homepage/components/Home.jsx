import React from "react";
import Button from "../layout/Button";
import { Link } from "react-scroll";
import gifImage from "../assets/gif.gif"; // استيراد المسار إلى الصورة

const Home = () => {
  return (
    <div className="min-h-[80vh] flex flex-col md:flex-row md:justify-between items-center md:mx-32 mx-5 mt-36 md:mt-28">
      {" "}
      {/* زيادة المسافة العلوية */}
      <div className="md:w-2/4 text-center">
        <h2 className="text-5xl font-semibold leading-tight text-gray-800 dark:text-darkMode-dark50">
          أهلًا بك في
          <span className="text-mainColor500"> تفوَّق</span>
        </h2>
        <p className="text-lg text-lightText dark:text-darkMode-dark400 mt-5 text-center">
          معًا لتحقيق غايتك، ونجاحك الكبير
        </p>
      </div>
      <div className="w-full md:w-2/4 mt-10 md:mt-0">
        {" "}
        {/* زيادة المسافة العلوية وتنسيق الصورة */}
        <img
          src={gifImage}
          className="w-full max-w-lg mx-auto rounded-lg"
          alt="img"
        />
      </div>
    </div>
  );
};

export default Home;
