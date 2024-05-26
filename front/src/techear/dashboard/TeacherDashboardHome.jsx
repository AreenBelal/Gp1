import { Spinner } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";

const TeacherDashboardHome = () => {
  const { teacherData, teacherLoading } = useSelector(
    (state) => state.singleTeacher
  );
  return (
    <div className="my-10 px-4">
      {/* title of home */}
      <div>
        <p className="text-center text-4xl font-semibold tracking-wider">
          الرئيسية
        </p>
      </div>
      {/* end */}

      {/* The number of enrolled students */}
      <div className="flex items-center gap-2">
        <span>عدد الطلاب المشتركين</span>
        <span
          className={`${
            teacherData?.studentsIds?.length === 0
              ? "text-red-500"
              : "text-mainColor500"
          }  font-bold`}
        >
          {teacherLoading ? (
            <Spinner color="green" className="h-4 w-4" />
          ) : (
            teacherData?.studentsIds?.length
          )}
        </span>
      </div>
      {/* end */}

      {/* Total Revenue */}
      <div className="flex items-center gap-2">
        <span>إجمالي الإيرادات</span>
        <span
          className={`${
            teacherData?.totalSubscriptionPrices === ""
              ? "text-red-500"
              : "text-mainColor500"
          }  font-bold`}
        >
          {" "}
          {teacherLoading ? (
            <Spinner color="green" className="h-4 w-4" />
          ) : teacherData?.totalSubscriptionPrices ? (
            teacherData?.totalSubscriptionPrices
          ) : (
            0
          )}
        </span>
      </div>
      {/* end */}
    </div>
  );
};

export default TeacherDashboardHome;
