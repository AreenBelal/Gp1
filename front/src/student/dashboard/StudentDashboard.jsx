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
import Subscriptions from "./Subscriptions";
import CourseHome from "./course-dashboard/CourseHome";
import CourseExams from "./course-dashboard/CourseExams";
import CourseVideos from "./course-dashboard/CourseVideos";
import SubscriptionsStudents from "./course-dashboard/SubscriptionsStudents";
import StudentProfile from "./course-dashboard/StudentProfile";
import TeacherProfile from "./course-dashboard/TeacherProfile";
import Chat from "./course-dashboard/Chat";
function StudentDashboard() {
  const { coursesInCartData, coursesInCartLoading } = useSelector(
    (state) => state.allCoursesInCart
  );

  const { studentData, studentLoading } = useSelector(
    (state) => state.singleStudent
  );
  const [openSidebarRight, setOpenSidebarRight] = useState(false);
  const [updateCoursesInCart, setUpdateCoursesInCart] = useState(false);
  const openDrawerRight = () => setOpenSidebarRight(true);

  const [showItemDashBoard, setShowItemDashBoard] = useState("home");
  const [previousStates, setPreviousStates] = useState([]);
  console.log(previousStates);
  useEffect(() => {
    const initialShowItem = sessionStorage.whereStudent
      ? sessionStorage.whereStudent
      : "home";
    setShowItemDashBoard(initialShowItem);
    setPreviousStates([initialShowItem]);
  }, []);

  const handleSetShowItemDashBoard = (newShowItem) => {
    setPreviousStates((prev) => [...prev, newShowItem]);
    setShowItemDashBoard(newShowItem);
    sessionStorage.whereStudent = newShowItem;
  };

  const handleBackButtonClick = () => {
    setPreviousStates((prev) => {
      const newStates = [...prev];
      newStates.pop();
      const lastState = newStates[newStates.length - 1] || "home";
      setShowItemDashBoard(lastState);
      sessionStorage.whereStudent = lastState;
      return newStates;
    });
  };

  const [passTheCourseForCourseDashboard, setPassTheCourseForCourseDashboard] =
    useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCoursesInCart(studentData?._id));
  }, [updateCoursesInCart]);

  return (
    <>
      <div dir="rtl" className="flex flex-col w-full">
        <div className="fixed left-6 bottom-6 z-50">
          <button
            onClick={handleBackButtonClick}
            className="p-2 bg-mainColor500 text-darkMode-dark50 duration-300 hover:text-darkMode-dark950 rounded-full shadow-md hover:bg-mainColor400"
          >
            رجوع
          </button>
        </div>
        <StudentResponsiveSidebar
          openSidebarRight={openSidebarRight}
          setOpenSidebarRight={setOpenSidebarRight}
        />
        <div className="mb-[78px]">
          <Nav />
        </div>
        <div className="h-12">
          <StudentNavbar
            setShowItemDashBoard={handleSetShowItemDashBoard}
            openDrawerRight={openDrawerRight}
          />
        </div>
        <div className="flex gap-2">
          <div className="lg:w-[25%] xl:w-[22%] xxl:w-[19%] hidden lg:block">
            <StudentSidebar
              showItemDashBoard={showItemDashBoard}
              setShowItemDashBoard={handleSetShowItemDashBoard}
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
            <Cart setShowItemDashBoard={handleSetShowItemDashBoard} />
          </div>
          <div
            className={`${
              showItemDashBoard === "subscriptions" ? "block" : "hidden"
            } w-full lg:w-[75%] xl:w-[78%] xxl:w-[81%]`}
          >
            <Subscriptions
              setCourse={setPassTheCourseForCourseDashboard}
              setShowItemDashBoard={handleSetShowItemDashBoard}
            />
          </div>
          {/* this is for course dashboard of teacher */}
          <div
            className={`${
              showItemDashBoard === "sub, home" ? "block" : "hidden"
            } w-full lg:w-[75%] xl:w-[78%] xxl:w-[81%]`}
          >
            <CourseHome course={passTheCourseForCourseDashboard} />
          </div>
          <div
            className={`${
              showItemDashBoard === "sub, exams" ? "block" : "hidden"
            } w-full lg:w-[75%] xl:w-[78%] xxl:w-[81%]`}
          >
            <CourseExams course={passTheCourseForCourseDashboard} />
          </div>
          <div
            className={`${
              showItemDashBoard === "sub, videos" ? "block" : "hidden"
            } w-full lg:w-[75%] xl:w-[78%] xxl:w-[81%]`}
          >
            <CourseVideos course={passTheCourseForCourseDashboard} />
          </div>
          <div
            className={`${
              showItemDashBoard === "sub, subscriptions-students"
                ? "block"
                : "hidden"
            } w-full lg:w-[75%] xl:w-[78%] xxl:w-[81%]`}
          >
            <SubscriptionsStudents
              setShowItemDashBoard={handleSetShowItemDashBoard}
              course={passTheCourseForCourseDashboard}
            />
          </div>
          <div
            className={`${
              showItemDashBoard === "sub, student-profile" ? "block" : "hidden"
            } w-full lg:w-[75%] xl:w-[78%] xxl:w-[81%]`}
          >
            <StudentProfile setShowItemDashBoard={handleSetShowItemDashBoard} />
          </div>
          <div
            className={`${
              showItemDashBoard === "sub, teacher-profile" ? "block" : "hidden"
            } w-full lg:w-[75%] xl:w-[78%] xxl:w-[81%]`}
          >
            <TeacherProfile setShowItemDashBoard={handleSetShowItemDashBoard} />
          </div>
          <div
            className={`${
              showItemDashBoard === "sub, chat" ? "block" : "hidden"
            } w-full lg:w-[75%] xl:w-[78%] xxl:w-[81%]`}
          >
            <Chat course={passTheCourseForCourseDashboard} />
          </div>
          {/* end */}
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
