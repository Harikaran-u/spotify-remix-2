import React, { useState } from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import moment from "moment";
import Sidebar from "../Sidebar";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./index.css";

const titlesArray = ["#", "Track", "Album", "Time", "Artist", "Added"];

const SinglePlayList = () => {
  const [singlePlaylistData, setSinglePlaylistData] = useState(null);
  const [tracksArray, setTracksArray] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const { id } = useParams();
  const authToken = Cookies.get("authToken");

  useEffect(() => {
    getPlayList();
  }, []);

  const getPlayList = async () => {
    const playListUrl = `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`;
    const configOptions = {
      method: "GET",
      headers: {
        Authorization: `bearer ${authToken}`,
      },
    };
    try {
      const response = await fetch(playListUrl, configOptions);
      const data = await response.json();
      if (response.ok) {
        setSinglePlaylistData(data);
        setTracksArray(data.tracks.items);
        console.log(data.tracks.items);
      } else {
        console.log("error", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDistanceFromNow = (date) => {
    const newDate = new Date(date);
    const distanceFromNow = moment(newDate).fromNow();
    return distanceFromNow;
  };

  const getDurationInMinutes = (duration) => {
    const totalSeconds = Math.floor(duration / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const timeString = `${formattedMinutes}:${formattedSeconds}`;
    return timeString;
  };

  const handleSelectedTrack = (selectedTrack) => {
    setSelectedTrack(selectedTrack.track);
    console.log(selectedTrack.track);
  };

  const getArtistsName = (artistsArr) => {
    const artistsNames = artistsArr.map((each) => each.name);
    const result = artistsNames.join(",");
    return result;
  };

  return (
    <div className="single-playlist-main-container">
      <Sidebar />
      <div className="single-playlist-data-display-container">
        <button className="back-btn">
          <FaArrowLeft />
          <span>Back</span>
        </button>
        {singlePlaylistData && (
          <div className="single-playlist-banner">
            <img
              src={singlePlaylistData.images[0].url}
              className="single-playlist-logo"
              alt="single-playlist-logo"
            />
            <div className="single-playlist-info">
              <p className="play-list-category-name">Editor's picks</p>
              <h1 className="single-play-list-name">
                {singlePlaylistData.name}
              </h1>
              <p className="play-list-owner-name">
                {singlePlaylistData.owner.display_name}
              </p>
            </div>
          </div>
        )}
        {singlePlaylistData && (
          <div className="display-songs-container">
            <table className="data-table">
              <thead className="table-head">
                <tr>
                  {titlesArray.map((title, index) => (
                    <th className="playlist-title" key={index}>
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tracksArray.map((eachTrack, index) => (
                  <tr
                    className={`track-row ${
                      selectedTrack !== null &&
                      selectedTrack.id === eachTrack.track.id &&
                      "selected-track"
                    }`}
                    key={index}
                    onClick={() => handleSelectedTrack(eachTrack)}
                  >
                    <td className="track-data">{index + 1}</td>
                    <td className="track-data">{eachTrack.track.name}</td>
                    <td className="track-data album-name">
                      {eachTrack.track.album.name}
                    </td>
                    <td className="track-data">
                      {getDurationInMinutes(eachTrack.track.duration_ms)}
                    </td>
                    <td className="track-data">
                      {eachTrack.track.artists[0].name}
                    </td>
                    <td className="track-data">
                      {getDistanceFromNow(eachTrack.added_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {selectedTrack && (
          <div className="audio-player-container">
            <div className="album-logo-artist-container">
              <img
                src={selectedTrack.album.images[0].url}
                alt="album-logo"
                className="album-art"
              />
              <div className="album-artist-info-container">
                <h3 className="selected-album-name">{selectedTrack.name}</h3>
                <p className="selected-album-artist-name">
                  {getArtistsName(selectedTrack.artists)}
                </p>
              </div>
            </div>

            <AudioPlayer
              src={selectedTrack.preview_url}
              layout="horizontal"
              showJumpControls={false}
              customAdditionalControls={[]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePlayList;
