import React from "react";
import Updates from "../Updates/Updates";
import "./RightSide.css";

const RightSide = () => {
  return (
    <div className="RightSideadmin" style={{direction:'rtl'}}>
      <div>
        <h3>التحديثات</h3>
        <Updates />
      </div>
   
    </div>
  );
};

export default RightSide;
