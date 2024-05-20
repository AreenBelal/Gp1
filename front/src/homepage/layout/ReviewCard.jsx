import React from "react";

const ReviewCard = (props) => {
  return (
    <div className="w-full bg-darkMode-dark50 dark:bg-darkMode-dark800 border-2 border-lightText md:border-none p-5 rounded-lg hover:shadow-md dark:hover:shadow-md dark:hover:shadow-darkMode-dark200 duration-200 transition-all relative">
      <div className="absolute top-0 left-0 bg-gradient-to-r from-mainColor500 to-lightGreen w-2 h-full rounded-l-lg"></div>
      <div className="mt-4">
        {" "}
        {/* تغيير هنا */}
        <p className="text-darkText text-center mb-3 z-10 relative dark:text-darkMode-dark50">
          {" "}
          {/* تغيير هنا */}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In
          consectetur error, dolores quae ipsa quos enim corporis magni
          obcaecati tempore natus eos, libero ducimus nulla neque eaque maxime
          nam molestias?
        </p>
        <div className="flex justify-center z-10 relative">
          <img
            className="rounded-full w-24 h-24 object-cover border-4 border-mainfrom-mainColor500 shadow-lg"
            src={props.img}
            alt="img"
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
