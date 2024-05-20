import React from "react";
import "./layout.css";
import Sidebar from "./sidebar";
import TopNav from "./TopNav";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";

const Layout = () => {
  return (
    <div className={`layout`}>
      <Sidebar />
      <div className="layout__content">
        <TopNav />
        <div className="layout__content-main">
          <Dashboard />
          <Customers />
        </div>
      </div>
    </div>
  );
};

export default Layout;
