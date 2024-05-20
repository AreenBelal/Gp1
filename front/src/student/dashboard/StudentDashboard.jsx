import { useEffect, useState } from "react";
import StudentResponsiveSidebar from "./StudentResponsiveSidebar";
import StudentNavbar from "./StudentNavbar";
import StudentSidebar from "./StudentSidebar";
import Nav from "../../homepage/components/Nav";
import Courses from "./Courses";
import Cart from "./Cart";
import Home from "./Home";
import Calendar from "../Dashstu/scenes/calendar/calendar";
import StudentNotes from "../Dashstu/scenes/Notes/StudentNotes";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoursesInCart } from "../../system-redux/functionality/cart/allCoursesInCartSlice";
function StudentDashboard() {
  const { coursesInCartData, coursesInCartLoading } = useSelector(
    (state) => state.allCoursesInCart
  );
  console.log(coursesInCartData);
  const { studentData, studentLoading } = useSelector(
    (state) => state.singleStudent
  );
  const [openSidebarRight, setOpenSidebarRight] = useState(false);
  const [updateCoursesInCart, setUpdateCoursesInCart] = useState(false);
  const openDrawerRight = () => setOpenSidebarRight(true);

  const [showItemDashBoard, setShowItemDashBoard] = useState("home");

  useEffect(() => {
    setShowItemDashBoard(
      sessionStorage.whereStudent ? sessionStorage.whereStudent : "home"
    );
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCoursesInCart(studentData?._id));
  }, [updateCoursesInCart]);

  return (
    <>
      <div dir="rtl" className="flex flex-col w-full">
        <StudentResponsiveSidebar
          openSidebarRight={openSidebarRight}
          setOpenSidebarRight={setOpenSidebarRight}
        />
        <div className="mb-[78px]">
          <Nav />
        </div>
        <div className="h-12">
          <StudentNavbar
            setShowItemDashBoard={setShowItemDashBoard}
            openDrawerRight={openDrawerRight}
          />
        </div>
        <div className="flex gap-2">
          <div className="lg:w-[25%] xl:w-[22%] xxl:w-[19%] hidden lg:block">
            <StudentSidebar
              showItemDashBoard={showItemDashBoard}
              setShowItemDashBoard={setShowItemDashBoard}
            />
          </div>
          <div
            className={`${
              showItemDashBoard === "home" ? "block" : "hidden"
            } w-full lg:w-[75%] xl:w-[78%] xxl:w-[81%]`}
          >
            <Home />
          </div>
          <div
            className={`${
              showItemDashBoard === "courses" ? "block" : "hidden"
            } w-full lg:w-[75%] xl:w-[78%] xxl:w-[81%]`}
          >
            <Courses
              updateCoursesInCart={updateCoursesInCart}
              setUpdateCoursesInCart={setUpdateCoursesInCart}
            />
          </div>
          <div
            className={`${
              showItemDashBoard === "cart" ? "block" : "hidden"
            } w-full lg:w-[75%] xl:w-[78%] xxl:w-[81%]`}
          >
            <Cart setShowItemDashBoard={setShowItemDashBoard} />
          </div>
          <div
            className={`${
              showItemDashBoard === "calendar" ? "block" : "hidden"
            } w-full lg:w-[75%] xl:w-[78%] xxl:w-[81%]`}
          >
            <Calendar />
          </div>
          <div
            className={`${
              showItemDashBoard === "notes" ? "block" : "hidden"
            } w-full lg:w-[75%] xl:w-[78%] xxl:w-[81%]`}
          >
            <StudentNotes />
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;
