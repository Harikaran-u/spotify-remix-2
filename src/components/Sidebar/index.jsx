import React from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import "./index.css";

const Sidebar = () => {
  return (
    <div className="side-bar">
      <img
        src="https://res.cloudinary.com/diuvnny8c/image/upload/v1713338797/music_b5ox5o.png"
        alt="music-logo"
        className="app-logo"
      />

      <button type="button" className="logout-btn">
        <RiLogoutCircleRLine size="25" />
        <span className="logout-text">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
