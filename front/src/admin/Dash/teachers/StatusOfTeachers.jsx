import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeachers } from "../../../system-redux/users/teachers/allTeachersSlice";
import { Spinner } from "@material-tailwind/react";
import TeacherControlItem from "./modals/status-of-teachers-modal/TeacherControlItem";
import StatusOfTeachersModal from "./modals/status-of-teachers-modal/StatusOfTeachersModal";
import Pagination from "./Pagination";

const StatusOfTeachers = ({
  teacherModal,
  setTeacherModal,
  updatePage,
  setUpdatePage,
  open,
  setOpen,
}) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { teachersData, teachersLoading } = useSelector(
    (state) => state.allTeachers
  );

  useEffect(() => {
    dispatch(getAllTeachers(page));
  }, [updatePage, page]);

  useEffect(() => {
    setTotalPages(teachersData?.totalPages);
  }, [updatePage, teachersData]);

  const styles = {
    darkText: "duration-200 transition-all dark:text-darkMode-dark50",
    darkBg: "dark:bg-darkMode-dark700",
  };
  console.log(teachersData);
  return (
    <>
      <div className="flex flex-col gap-y-5 ">
        <div
          className="flex flex-col
gap-y-2"
        >
          {/* Users Nav */}
          <div
            className={`inline-flex items-center 
  justify-between font-semibold bg-darkMode-dark50 p-2 ${styles.darkText} dark:bg-darkMode800`}
          >
            <p className="w-1/5 flex items-center justify-center">اسم المعلم</p>
            <p className="w-1/5 flex items-center justify-center">الهوية</p>
            <p className="w-1/5 flex items-center justify-center">
              المادة المطلوبة
            </p>
            <p className="w-1/5 flex items-center justify-center">الحالة</p>
            <p className="w-1/5 flex items-center justify-center">عرض</p>
          </div>
          {/* end teachers Nav*/}
          <div className="flex flex-col-reverse gap-y-2 duration-300 transition-all">
            {/* teachers */}
            {teachersLoading ? (
              <div className="h-[72vh] w-full flex justify-center items-center">
                <Spinner color="green" />

                {/* <span
                className={` ${
                  localStorage.theme === "dark"
                    ? "loaderElementsDarkMode"
                    : "loaderElements"
                }`}
              ></span> */}
              </div>
            ) : (
              teachersData?.docs?.map((teacher, index) => (
                <TeacherControlItem
                  key={index}
                  setOpen={setOpen}
                  teacher={teacher}
                  setTeacherModal={setTeacherModal}
                />
              ))
            )}

            {/* end Users */}
          </div>
          {totalPages >= 2 && (
            <div className="flex justify-center items-center">
              <Pagination
                setPage={setPage}
                page={page}
                totalPages={totalPages}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StatusOfTeachers;
