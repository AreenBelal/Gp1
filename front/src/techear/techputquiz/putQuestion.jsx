import React, { useState } from "react";
import Sidebar from "../sidebar";
import { IconButton, Drawer } from "@mui/material";
import Topnav from "../TopNav";
import Techquiz from "./techquiz";

const PutQuestion = () => {
  const [isOpen, setIsOpen] = useState(false); // State variable to control the opening and closing of the sidebar

  const toggleDrawer = () => {
    setIsOpen(!isOpen); // Toggle the value of isOpen
  };

  const handleCommand = () => {
    // Your command logic here
    console.log("Command executed!");
  };

  const handleMenuIconClick = () => {
    toggleDrawer(); // Call the toggleDrawer function when clicked
  };

  return (
    <div className={`layout`}>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer}
        className={`layout`}
      >
        <Sidebar />
      </Drawer>

      <div className="layout__content" style={{ height: "250vh" }}>
        <Topnav handleCommand={handleCommand} />

        <div
          className="topnav"
          style={{
            position: "fixed" /* جعل العنصر ثابتًا */,
            top: "0px" /* تحديد المسافة من الأعلى */,
            left: "20px" /* تحديد المسافة من اليسار */,
            zIndex: "1000" /* تحديد ترتيب الطبقات (يمكن تعديله حسب الحاجة) */,
          }}
        >
          <IconButton onClick={handleMenuIconClick} edge="start">
            <img
              width="40"
              height="40"
              src="https://img.icons8.com/doodle/96/menu.png"
              alt="menu"
            />
          </IconButton>
        </div>
        <div>
          <Techquiz />
        </div>
      </div>
    </div>
  );
};

export default PutQuestion;
