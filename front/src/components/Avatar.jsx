import React from "react";
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from "react-redux";

const Avatar = ({ userId, name, imageUrl, width, height }) => {
  const { onlineStudents } = useSelector((state) => state.socketIo);

  let avatarName = "";

  if (name) {
    const splitName = name?.split(" ");
    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else {
      avatarName = splitName[0][0];
    }
  }

  const bgColor = [
    "bg-gray-200",
    "bg-teal-200",
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-orange-200",
  ];

  const randomNum = Math.floor(Math.random() * 6);

  const isOnline = onlineStudents.includes(userId);

  return (
    <div
      className={`text-gray-700  rounded-full border text-xl font-bold relative`}
      style={{ width: width + "px", height: height + "px" }}
    >
      {imageUrl ? (
        <img
          className="overflow-hidden rounded-full"
          src={imageUrl}
          width={width}
          height={height}
          alt={name}
        />
      ) : name ? (
        <div
          style={{ width: width + "px", height: height + "px" }}
          className={`overflow-hidden rounded-full flex justify-center items-center text-lg ${bgColor[randomNum]}`}
        >
          {avatarName}
        </div>
      ) : (
        <PiUserCircle size={width} />
      )}
      {isOnline && (
        <div className="bg-mainColor500 p-1 rounded-full absolute top-0 left-0 z-10"></div>
      )}
    </div>
  );
};

export default Avatar;
