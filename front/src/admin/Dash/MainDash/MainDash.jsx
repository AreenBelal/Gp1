import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
const MainDash = () => {
  return (
    <div className="MainDashadmin" style={{direction:'rtl',marginLeft:'12px'}}>
      <h1 style={{marginRight:'250px'}}>لوحة التحكم الأساسية</h1>
      <Cards />
      <Table />
    </div>
  );
};

export default MainDash;
