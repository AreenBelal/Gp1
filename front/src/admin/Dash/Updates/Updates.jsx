import React from "react";
import "./Updates.css";
import { UpdatesData } from "../Data";

const Updates = () => {
  return (
    <div className="Updatesadmin" style={{direction: 'rtl'}}>
      {UpdatesData.map((update) => {
        return (
          <div className="updateadmin">
            <img src={update.img} alt="profile" />
            <div className="notiadmin">
              <div  style={{marginBottom: '0.5rem'}}>
                <span style={{direction: 'rtl',marginRight:'5px'}}>{update.name}</span>
                </div>
                <div>
                <span style={{direction: 'rtl',fontSize:'15px' }}> {update.noti}</span>
              </div>
                <span style={{  color:'grey',fontSize:'8px',marginRight:'90px'}}>{update.time}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Updates;
