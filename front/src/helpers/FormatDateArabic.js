import React from "react";

const FormatDateArabic = ({ createdAt }) => {
  console.log(createdAt);
  const date = new Date(createdAt);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    weekday: "long",
    timeZone: "Africa/Cairo",
  };

  const time = date.toLocaleDateString("ar-EG", options);

  return (
    <div>
      <span>{time && time}</span>
    </div>
  );
};

export default FormatDateArabic;
