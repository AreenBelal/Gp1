import React from "react";
import "./topnav.css";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import notifications from "./JsonData/notification.json";
import user_image from "./images/tuat.png";
import user_menu from "./JsonData/user_menus.json";

const curr_user = {
  display_name: "Tuat Tran",
  image: user_image,
};

const renderNotificationItem = (item, index) => (
  <div className="notification-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
);

const renderUserToggle = (user) => (
  <div
    className="topnav__right-user"
    style={{ direction: "rtl", alignItems: "center" }}
  >
    <div className="topnav__right-user__image" style={{ alignItems: "center" }}>
      <img src={user.image} alt="" />
    </div>
    <div
      className="topnav__right-user__name"
      style={{ marginRight: "13px", alignItems: "center" }}
    >
      {user.display_name}
    </div>
  </div>
);

const renderUserMenu = (item, index) => (
  <Link to={item.route} key={index} className="linkedto">
    <div className="notification-item">
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  </Link>
);

const Topnav = () => {
  return (
    <div className="topnav">
      <div className="topnav__right">
        <div className="topnav__right-item">
          <Dropdown
            customToggle={() => renderUserToggle(curr_user)}
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        <div className="topnav__right-item">
          <Dropdown
            icon="bx bx-bell"
            badge="12"
            contentData={notifications}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            renderFooter={() => <Link to="/">شاهد الجميع</Link>}
          />
        </div>
      </div>
    </div>
  );
};

export default Topnav;
