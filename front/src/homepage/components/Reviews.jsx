import React from "react";
import Heading from "../layout/Heading";
import ReviewCard from "../layout/ReviewCard";
import img1 from "../assets/images/pic1.png";
import img2 from "../assets/images/pic2.png";
import img3 from "../assets/images/pic3.png";

const Reviews = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center md:px-32 px-5 mb-10">
      <Heading title2="آراء طُلابنا" />

      <div
        dir="rtl"
        className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-2 md:mt-12 justify-center items-center"
      >
        <ReviewCard img={img1}>
          <p className="text-lightText text-center dark:text-darkMode-dark50 ">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua."
          </p>
        </ReviewCard>
        <ReviewCard img={img2}>
          <p className="text-lightText text-center dark:text-darkMode-dark50">
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat."
          </p>
        </ReviewCard>
        <ReviewCard img={img3}>
          <p className="text-lightText text-center dark:text-darkMode-dark50">
            "Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur."
          </p>
        </ReviewCard>
      </div>
    </div>
  );
};

export default Reviews;
