import React, { useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const MenuLogin = ({ openMenuLogin, setOpenMenuLogin, placement }) => {
  console.log(placement);
  const menuItems = [
    {
      title: "المعلمون",
      description: "سجل الدخول كمعلم",
      goTo: "/teacher/login",
    },
    {
      title: "الطلاب",
      description: "سجل الدخول كطالب",
      goTo: "/student/login",
    },
    {
      title: "الإدارة",
      description: "سجل الدخول كمدير",
      goTo: "/admin/login",
    },
  ];
  return (
    <Menu
      open={openMenuLogin}
      handler={setOpenMenuLogin}
      allowHover
      placement={placement}
    >
      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center gap-3 text-base font-normal capitalize tracking-normal dark:text-darkMode-dark50"
        >
          تسجيل الدخول
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 transition-transform dark:text-darkMode-dark50 ${
              openMenuLogin ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="outline-none grid-cols-1 gap-3 overflow-visible grid">
        <ul dir="rtl" className="col-span-4 flex w-full flex-col gap-1 p-2">
          {menuItems.map(({ title, description, goTo }) => (
            <Link to={goTo} key={title}>
              <MenuItem dir="rtl">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="text-center"
                >
                  {title}
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal text-center"
                >
                  {description}
                </Typography>
              </MenuItem>
            </Link>
          ))}
        </ul>
      </MenuList>
    </Menu>
  );
};

export default MenuLogin;
