import { useState } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import AdminNotificationsMenu from "./AdminNotificationsMenu";
import { IoMenuOutline } from "react-icons/io5";

const AdminNavbar = ({ openDrawerRight }) => {
  const { ownerData, ownerLoading } = useSelector((state) => state.singleOwner);

  return (
    <Navbar className="rounded-none fixed z-30 w-full max-w-full  py-[3px] shadow-none">
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
        <Typography
          variant="h6"
          className="mr-4 ml-2 cursor-pointer py-1.5 text-black flex gap-2 items-center"
        >
          أهلا بك{" "}
          {ownerLoading ? <Spinner color="green" /> : ownerData?.fullName}
        </Typography>
        <div className="ml-auto flex gap-1 md:mr-4">
          <AdminNotificationsMenu />
        </div>
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

export default AdminNavbar;
