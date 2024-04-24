import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { RiLogoutCircleRLine } from "react-icons/ri";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import "./index.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("authToken");
    navigate("/login", { replace: true });
  };

  return (
    <div className="side-bar">
      <img
        src="https://res.cloudinary.com/diuvnny8c/image/upload/v1713338797/music_b5ox5o.png"
        alt="music-logo"
        className="app-logo"
      />
      <Popup
        trigger={
          <button type="button" className="logout-btn">
            <RiLogoutCircleRLine size="25" />
            <span className="logout-text">Logout</span>
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header"> Spotify-Remix </div>
            <h1 className="content">Are you sure want to logout?</h1>
            <div className="actions">
              <button className="button yes-btn" onClick={handleLogout}>
                Yes
              </button>
              <button
                className="button"
                onClick={() => {
                  close();
                }}
              >
                No
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default Sidebar;
