import { isWeekend } from "date-fns";
import * as React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SelectADate = ({ when, mainDetailsOfExam, setMainDetailsOfExam }) => {
  const handleDateChange = (date) => {
    if (when === "start") {
      setMainDetailsOfExam((prevState) => ({
        ...prevState,
        startTime: date,
      }));
    }
  };

  const filterPastDates = (date) => {
    return date.getTime() >= new Date().getTime();
  };
  return (
    <DatePicker
      style={{ width: "100%" }}
      placeholderText="حدد التاريخ والوقت"
      className="px-4 py-2 w-full rounded-md dark:text-darkMode-dark50 !border !border-gray-300 bg-transparent text-mainColor700 font-bold shadow-sm shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 dark:focus:!border-darkMode-dark50 focus:!border-t-gray-900 dark:focus:!border-t-darkMode-dark50 focus:ring-gray-900/10 dark:focus:ring-darkMode-dark50"
      selected={when === "start" && mainDetailsOfExam.startTime}
      onChange={handleDateChange}
      dateFormat={`MM/dd/yyyy | h:mm aa`}
      filterDate={filterPastDates}
      showTimeSelect
      timeIntervals={10}
      timeFormat="h:mm aa"
      labelProps={{
        className: "hidden",
      }}
      containerProps={{ className: "min-w-[100px]" }}
    />
  );
};

export default SelectADate;
