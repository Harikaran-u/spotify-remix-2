import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom/cjs/react-router-dom";
import Cookies from "js-cookie";
import "./index.css";
import Sidebar from "../Sidebar";
import ErrorContainer from "../ErrorContainer";
import { FaArrowLeft } from "react-icons/fa";

const CategoryPlayList = () => {
  const [playListTracks, setPlayListTracks] = useState(null);
  const [isError, setIsError] = useState(false);
  const authToken = Cookies.get("authToken");
  const { id } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryName = params.get("name");
  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    const categoryPlaylistUrl = `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`;
    const configOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    try {
      const response = await fetch(categoryPlaylistUrl, configOptions);
      const data = await response.json();
      if (response.ok) {
        setPlayListTracks(data.playlists.items);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  const handleRetry = () => {
    getCategoryList();
  };

  return (
    <div className="category-playlist-main-container">
      <Sidebar />
      <div className="display-category-playlist-container">
        <button className="back-btn">
          <FaArrowLeft />
          <span>Back</span>
        </button>
        {!isError && (
          <div className="category-playlist-data-container">
            <h2 className="category-playlist-title-name">{categoryName}</h2>
            {playListTracks && (
              <ul className="category-playlist-data-list-container">
                {playListTracks.map((eachPlaylist) => (
                  <li
                    className="category-playlist-info-container"
                    key={eachPlaylist.id}
                  >
                    <img
                      src={eachPlaylist.images[0].url}
                      alt="playlist-logo"
                      className="category-playlist-logo"
                    />
                    <div className="category-details-container">
                      <h2 className="category-playlist-name">
                        {eachPlaylist.name}
                      </h2>
                      <p className="category-playlist-count">
                        {`${eachPlaylist.tracks.total} Tracks`}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {isError && <ErrorContainer retryCallback={handleRetry} />}
      </div>
    </div>
  );
};

export default CategoryPlayList;