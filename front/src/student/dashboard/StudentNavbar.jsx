import React from "react";
import { Navbar, Typography, Spinner, Badge } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { IoMenuOutline } from "react-icons/io5";
import StudentNotificationsMenu from "./StudentNotificationsMenu";
import { LuShoppingCart } from "react-icons/lu";

const StudentNavbar = ({ openDrawerRight, setShowItemDashBoard }) => {
  const { studentData, studentLoading } = useSelector(
    (state) => state.singleStudent
  );
  const { coursesInCartData, coursesInCartLoading } = useSelector(
    (state) => state.allCoursesInCart
  );

  return (
    <Navbar className="rounded-none fixed z-30 w-full max-w-full  py-[3px] shadow-none">
      <div className="flex gap-4 text-white">
        <div>
          <Typography
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 text-black flex gap-2 items-center"
          >
            أهلا بك{" "}
            {studentLoading ? <Spinner color="green" /> : studentData?.fullName}
          </Typography>
        </div>
        <div className="">
          <StudentNotificationsMenu />
        </div>
        {/* add to cart */}
        <div
          onClick={() => {
            setShowItemDashBoard("cart");
            sessionStorage.whereStudent = "cart";
          }}
          dir="rtl"
          className="flex justify-center cursor-pointer items-center group w-fit"
        >
          <Badge
            content={`${coursesInCartData.length}`}
            withBorder
            className="h-2 w-2"
          >
            <LuShoppingCart className="text-xl text-gray-900 font-bold group-hover:text-mainColor500 duration-200" />
          </Badge>
        </div>
        {/* end */}
        <div
          onClick={openDrawerRight}
          className="lg:hidden bg-mainColor500 p-1 rounded-md hover:bg-mainColor400 duration-200 cursor-pointer"
        >
          <IoMenuOutline className="text-darkMode-dark50 " />
        </div>
      </div>
    </Navbar>
  );
};

export default StudentNavbar;
