import React from "react";
import { IoMdHome } from "react-icons/io";
import { FiArrowLeft } from "react-icons/fi";

const Navhome = () => {
  return (
    <div
      className="bg-white shadow-md fixed top-0 left-0 right-0 z-10"
      style={{ direction: "rtl" }}
    >
      <div className="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
        <a
          href="/"
          className="font-semibold text-3xl p-1 cursor-pointer text-green-600 hover:text-black"
          style={{
            textDecoration: "none",
            color: "#14af1e8d",
            marginRight: "50px",
          }}
        >
          تفوَّق
        </a>

        <nav className="flex-grow flex items-center justify-center">
          <a
            href="/home"
            className="nav-item"
            title="الصفحة الرئيسية"
            style={{ color: "#14af1e8d" }}
          >
            <IoMdHome style={{ fontSize: "32px" }} className="home-icon" />
          </a>
        </nav>

        <div
          className="dropdown"
          style={{ marginLeft: "1px", direction: "rtl" }}
        >
          <a
            href="../../homepage/homemain"
            className="dropbtn"
            style={{
              marginLeft: "1px",
              direction: "rtl",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <FiArrowLeft
              style={{ marginRight: "4px" }}
              className="arrow-icon"
            />
            <span style={{ marginLeft: "4px" }} className="hover-text">
              الصفحة السابقة
            </span>
          </a>
        </div>
      </div>

      <style jsx>{`
        .dropbtn {
          background-color: #14af1e8d;
          color: #ffff; /* White text color */
          font-size: 16px;
          border: none;
          cursor: pointer;
          padding: 10px 20px;
          border-radius: 20px;
          display: flex;
          align-items: center;
        }

        .dropbtn:hover {
          background-color: #ffff; /* White background color */
          color: #14af1e8d; /* Primary text color */
        }

        .arrow-icon:hover {
          color: #14af1e8d; /* White color */
        }

        .hover-text:hover {
          text-decoration: none;
          color: #14af1e8d; /* White color */
        }
      `}</style>
    </div>
  );
};

export default Navhome;
