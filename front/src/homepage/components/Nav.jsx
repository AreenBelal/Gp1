import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { HiHome } from "react-icons/hi";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdLocalLibrary } from "react-icons/md";
import { IoIosChatbubbles } from "react-icons/io";
import { MdAnnouncement } from "react-icons/md";
import MenuDarkMode from "./menu-darkMode/MenuDarkMode";
import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Spinner,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import SideBarHomePage from "./sidebar-for-home-page/SideBarHomePage";
import MenuLogin from "./menu_login/MenuLogin";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAuth } from "../../system-redux/users/auth/authSlice";
import DropDownAvatarMenu from "../../DropDownAvatarMenu";

const Nav = () => {
  const { pathname } = useLocation();

  const [openMenu, setOpenMenu] = useState(false);
  const [openMenuLogin, setOpenMenuLogin] = useState(false);
  const [open, setOpen] = useState(false);
  const { cn, tc, ro } = useSelector((state) => state.ma);
  const { teacherData, teacherLoading } = useSelector(
    (state) => state.singleTeacher
  );
  const { ownerData, ownerLoading } = useSelector((state) => state.singleOwner);
  const { studentData, studentLoading } = useSelector(
    (state) => state.singleStudent
  );
  console.log("nav studentData: ", studentData);

  return (
    <div
      className="shadow-md bg-darkMode-dark50 fixed top-0 left-0 right-0 z-50 dark:bg-darkMode-dark900 dark:shadow-darkMode-dark500"
      style={{ direction: "rtl" }}
    >
      <div className="container mx-auto py-2 flex justify-between items-center">
        <Link
          to="/"
          className="font-semibold text-3xl p-1 cursor-pointer hover:text-green-600 duration-200"
        >
          <span className="nav-link hover:scale-105 duration-200 dark:text-darkMode-dark50 shadow-md rounded-full dark:shadow-darkMode-dark50 p-2">
            تفــوَّق
          </span>
        </Link>
        <div className="md:hidden block shadow-md dark:shadow-darkMode-dark50 rounded-full p-1">
          {cn &&
            (ro === "TEACHER" ? (
              teacherLoading ? (
                <Spinner color="green" />
              ) : (
                <DropDownAvatarMenu
                  role="TEACHER"
                  image={teacherData?.avatar}
                />
              )
            ) : ro === "OWNER" ? (
              ownerLoading ? (
                <Spinner color="green" />
              ) : (
                <DropDownAvatarMenu role="OWNER" image={ownerData?.avatar} />
              )
            ) : (
              ro === "STUDENT" &&
              (studentLoading ? (
                <Spinner color="green" />
              ) : (
                <DropDownAvatarMenu
                  role="STUDENT"
                  image={studentData?.avatar}
                />
              ))
            ))}
        </div>
        <div>
          <SideBarHomePage open={open} setOpen={setOpen} />
        </div>

        <nav className="hidden flex-grow md:flex items-center gap-4 justify-center dark:text-darkMode-dark50">
          {" "}
          {pathname === "/" && (
            <>
              {/* تم تغيير هندسة الـ <nav> */}
              <NavItem to="home" title="الصفحة الرئيسية">
                <HiHome className="icon_style_darkMode text-5xl shadow-md dark:shadow-darkMode-dark50 rounded-full p-2" />{" "}
                {/* زيادة حجم الأيقونات */}
              </NavItem>
              <NavItem to="about" title="من نحن؟">
                <BsFillInfoCircleFill className="icon_style_darkMode text-5xl shadow-md dark:shadow-darkMode-dark50 rounded-full p-2" />{" "}
                {/* إضافة مسافة بين الأيقونات */}
              </NavItem>
              <NavItem to="courses" title="الدورات التي نقدمها">
                <MdLocalLibrary className="icon_style_darkMode text-5xl shadow-md dark:shadow-darkMode-dark50 rounded-full p-2" />{" "}
                {/* إضافة مسافة بين الأيقونات */}
              </NavItem>
              <NavItem to="reviews" title="آراء طلابنا">
                <IoIosChatbubbles className="icon_style_darkMode text-5xl shadow-md dark:shadow-darkMode-dark50 rounded-full p-2" />{" "}
                {/* إضافة مسافة بين الأيقونات */}
              </NavItem>
              {!cn && (
                <NavItem to="contact" title="إعلانات (وظيفة معلم )">
                  <MdAnnouncement className="icon_style_darkMode text-5xl shadow-md dark:shadow-darkMode-dark50 rounded-full p-2" />
                </NavItem>
              )}
            </>
          )}
          <div className=" shadow-md dark:shadow-darkMode-dark50 rounded-full p-2">
            {/* Menu Dark Mode Component*/}
            <MenuDarkMode openMenu={openMenu} setOpenMenu={setOpenMenu} />
          </div>
        </nav>

        <div className="hidden md:block shadow-md dark:shadow-darkMode-dark50 rounded-full p-1">
          {cn &&
            (ro === "TEACHER" ? (
              teacherLoading ? (
                <Spinner color="green" />
              ) : (
                <DropDownAvatarMenu
                  role="TEACHER"
                  image={teacherData?.avatar}
                />
              )
            ) : ro === "OWNER" ? (
              ownerLoading ? (
                <Spinner color="green" />
              ) : (
                <DropDownAvatarMenu role="OWNER" image={ownerData?.avatar} />
              )
            ) : (
              ro === "STUDENT" &&
              (studentLoading ? (
                <Spinner color="green" />
              ) : (
                <DropDownAvatarMenu
                  role="STUDENT"
                  image={studentData?.avatar}
                />
              ))
            ))}
        </div>
        <div className="hidden md:block shadow-inner dark:shadow-darkMode-dark50 rounded-lg">
          {!cn && (
            <MenuLogin
              placement={"bottom"}
              openMenuLogin={openMenuLogin}
              setOpenMenuLogin={setOpenMenuLogin}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const NavItem = ({ to, children, title }) => {
  return (
    <Tooltip title={title} placement="bottom">
      <ScrollLink
        to={to}
        spy={true}
        smooth={true}
        duration={500}
        className="text-lg font-medium text-gray-700 hover:text-green-600 cursor-pointer ml-4 md:ml-0 md:mr-4 transition-colors"
        activeClass="text-green-600"
        style={{ textDecoration: "none" }}
      >
        <span style={{ position: "relative" }}>
          {children}
          <span
            className="tooltip-text"
            style={{
              visibility: "hidden",
              position: "absolute",
              zIndex: "1",
              backgroundColor: "black",
              color: "white",
              fontSize: "18px",
              padding: "8px",
              borderRadius: "4px",
              bottom: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </span>
        </span>
      </ScrollLink>
    </Tooltip>
  );
};

export default Nav;
