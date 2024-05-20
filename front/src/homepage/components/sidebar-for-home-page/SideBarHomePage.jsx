import React, { useState } from "react";
import {
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { IoReorderFourOutline } from "react-icons/io5";
import { HiHome } from "react-icons/hi";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoIosChatbubbles } from "react-icons/io";
import { MdAnnouncement, MdLocalLibrary } from "react-icons/md";
import MenuLogin from "../menu_login/MenuLogin";
import { NavItem } from "../Nav";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const SideBarHomePage = ({ open, setOpen }) => {
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const { pathname } = useLocation();

  const content = [
    {
      id: 1,
      name: "الصفحة الرئيسية",
      icon: <HiHome className=" text-4xl" />,
      goTo: "home",
    },
    {
      id: 2,
      name: "من نحن؟",
      icon: <BsFillInfoCircleFill className="  text-4xl" />,
      goTo: "about",
    },
    {
      id: 3,
      name: "الدورات التي نقدمها",
      icon: <MdLocalLibrary className=" text-4xl" />,
      goTo: "courses",
    },
    {
      id: 4,
      name: "آراء طلابنا",
      icon: <IoIosChatbubbles className=" text-4xl" />,
      goTo: "reviews",
    },
    {
      id: 5,
      name: "إعلانات (وظيفة معلم )",
      icon: <MdAnnouncement className=" text-4xl" />,
      goTo: "contact",
    },
  ];
  const [openMenuLogin, setOpenMenuLogin] = useState(false);
  const { cn, tc, ro } = useSelector((state) => state.ma);

  return (
    <React.Fragment>
      <span className="block md:hidden" onClick={() => setOpen(!open)}>
        <IoReorderFourOutline className="text-4xl text-darkMode-dark900 dark:text-darkMode-dark50 duration-200 cursor-pointer hover:text-mainColor500" />
      </span>
      <Drawer
        placement="right"
        open={open}
        onClose={closeDrawer}
        className="dark:bg-darkMode-dark900"
      >
        <div className="h-full dark:bg-darkMode-dark900 shadow-lg dark:shadow-darkMode-dark50">
          <div className="pb-2 flex items-center justify-between p-4 dark:bg-darkMode-dark900">
            <Typography
              variant="h5"
              color="blue-gray"
              className="text-mainColor500 font-bold text-3xl"
            >
              تفوَّق
            </Typography>
            <IconButton
              variant="text"
              color="blue-gray"
              onClick={closeDrawer}
              className="dark:hover:bg-darkMode-dark50 dark:hover:text-darkMode-dark950 dark:text-darkMode-dark50 duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          <List className="dark:bg-darkMode-dark900">
            {pathname === "/" && cn
              ? content
                  ?.filter((item) => item.goTo !== "contact")
                  .map((item, index) => (
                    <NavItem key={index} to={item.goTo} title={item.name}>
                      <ListItem
                        onClick={closeDrawer}
                        className="group flex justify-between items-center dark:text-darkMode-dark50 dark:hover:bg-darkMode-dark50 dark:hover:text-darkMode-dark950 duration-200"
                      >
                        {item.name}
                        <ListItemPrefix className="dark:group-active:text-darkMode-dark950">
                          {item.icon}
                        </ListItemPrefix>
                      </ListItem>
                    </NavItem>
                  ))
              : content?.map((item, index) => (
                  <NavItem key={index} to={item.goTo} title={item.name}>
                    <ListItem
                      onClick={closeDrawer}
                      className="group flex justify-between items-center dark:text-darkMode-dark50 dark:hover:bg-darkMode-dark50 dark:hover:text-darkMode-dark950 duration-200"
                    >
                      {item.name}
                      <ListItemPrefix className="dark:group-active:text-darkMode-dark950">
                        {item.icon}
                      </ListItemPrefix>
                    </ListItem>
                  </NavItem>
                ))}
          </List>
          <div className="pt-3 pl-5 dark:bg-darkMode-dark900">
            {!cn && (
              <MenuLogin
                placement={"left"}
                openMenuLogin={openMenuLogin}
                setOpenMenuLogin={setOpenMenuLogin}
              />
            )}
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default SideBarHomePage;
