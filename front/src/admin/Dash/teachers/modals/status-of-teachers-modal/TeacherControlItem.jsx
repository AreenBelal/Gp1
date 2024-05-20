import React from "react";

const TeacherControlItem = ({ setOpen, teacher, setTeacherModal }) => {
  const styles = {
    darkText: "duration-200 transition-all dark:text-darkMode-dark50",
    darkBg: "dark:bg-darkMode-dark700",
  };

  const handleView = () => {
    setOpen(true);
    setTeacherModal(teacher);
  };

  return (
    //Geneate the Product
    <div
      className={`flex flex-col 
                 gap-y-5 justify-center `}
    >
      {/* This is for all a single Product */}
      {/* // This Div Container For the Product Content */}
      <div
        className={`w-full bg-darkMode-dark50 
                     p-4 flex flex-row items-center
                      justify-between gap-4 ${styles.darkBg}`}
      >
        {/* Div 1 for Image Part */}
        <div className="font-bold w-1/5 flex items-center justify-center text-center group ">
          <p className={`${styles.darkText}`}>
            {teacher?.fullName.length > 6
              ? teacher?.fullName.slice(0, 7) + "..."
              : teacher?.fullName}
          </p>
        </div>

        {/* Div 2 for firstName */}
        <div className="font-bold w-1/5 flex items-center justify-center text-center group ">
          <p className={`${styles.darkText}`}>{teacher?.idNum}</p>
        </div>

        {/* Div 3 for role */}
        <div className="w-1/5 flex items-center justify-center">
          <p className={`font-bold`}>{teacher?.course}</p>
        </div>

        {/* Div 4 for status */}
        <div className="w-1/5 flex items-center justify-center ">
          <p className={`font-bold`}>
            {teacher?.status === "accepted"
              ? "مقبول"
              : teacher?.status === "pending"
              ? "في الإنتظار"
              : "مرفوض"}
          </p>
        </div>

        {/* Div 6 for Delete button */}
        <div className="w-1/5 flex gap-2 items-center justify-center group cursor-pointer ">
          <button
            onClick={() => handleView()}
            className="transition-all duration-300 bg-gradient-to-tr from-red-500 to-red-900 hover:from-red-800 hover:to-red-900 rounded-lg text-white px-2 py-1"
          >
            عرض
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherControlItem;
