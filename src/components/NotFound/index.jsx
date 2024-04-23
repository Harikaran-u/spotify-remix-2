import React from "react";
import "./index.css";
import { FaArrowLeft } from "react-icons/fa";
import Sidebar from "../Sidebar";

const NotFound = () => {
  return (
    <div className="not-found-main-container">
      <Sidebar />
      <div className="not-found-info-container">
        <button className="back-btn">
          <FaArrowLeft />
          <span>Back</span>
        </button>
        <div className="not-found-container">
          <img
            src="https://res.cloudinary.com/diuvnny8c/image/upload/v1713866190/Frame_153_vgig9q.png"
            alt="not-found"
            className="not-found-img"
          />
          <h1 className="not-found-name">Page Not Found</h1>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
