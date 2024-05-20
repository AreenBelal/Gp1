import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";

const StudentResponsiveSidebar = ({
  openSidebarRight,
  setOpenSidebarRight,
}) => {
  const closeDrawerRight = () => setOpenSidebarRight(false);

  return (
    <React.Fragment>
      <Drawer
        placement="right"
        open={openSidebarRight}
        onClose={closeDrawerRight}
        className="p-4 fixed h-full"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h4" color="blue-gray">
            لوحة التحكم
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerRight}
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
        <Typography color="gray" className="mb-8 pr-4 font-normal">
          هنا سيكون عناصر لوحة التحكم في الريسبونسف{" "}
        </Typography>
        <div className="flex gap-2">
          <Button size="sm">Get Started</Button>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default StudentResponsiveSidebar;
