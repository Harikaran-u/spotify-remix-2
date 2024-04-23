import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import "./index.css";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import Sidebar from "../Sidebar";
import { FaArrowLeft } from "react-icons/fa";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { IoMdPause, IoMdPlay } from "react-icons/io";

const titlesArray = ["#", "Track", "Time", "Artist"];

const NewReleasesSinglePlayList = () => {
  const [album, setAlbum] = useState(null);
  const [albumTracks, setAlbumTracks] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());
  const { id } = useParams();
  const authToken = Cookies.get("authToken");

  useEffect(() => {
    getPlayList();
  }, []);

  useEffect(() => {
    audioRef.current.addEventListener("ended", handleAudioEnded);
    return () => {
      audioRef.current.removeEventListener("ended", handleAudioEnded);
    };
  }, []);
  const getPlayList = async () => {
    const playListUrl = `https://apis2.ccbp.in/spotify-clone/album-details/${id}`;
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
        setAlbum(data);
        setAlbumTracks(data.tracks.items);
        console.log(data.tracks.items);
        console.log(data);
      } else {
        console.log("error", data);
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleSelectedTrack = (newTrack) => {
    setSelectedTrack(newTrack);
    setIsPlaying(true);
    if (isMobile() && newTrack) {
      audioRef.current.src = newTrack.preview_url;
      audioRef.current.play();
    }
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

  const isMobile = () => {
    const userAgent = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
  };

  const getArtistsName = (artistsArr) => {
    const artistsNames = artistsArr.map((each) => each.name);
    const result = artistsNames.join(",");
    return result;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <>
      <div className="new-releases-single-main-container">
        <Sidebar />
        <div className="new-releases-single-playlist-contaier">
          <button className="back-btn">
            <FaArrowLeft />
            <span>Back</span>
          </button>
          {album && (
            <div className="single-playlist-banner">
              <img
                src={album.images[0].url}
                className="single-playlist-logo"
                alt="single-playlist-logo"
              />
              <div className="single-playlist-info">
                <p className="play-list-category-name">New Releases</p>
                <h1 className="single-play-list-name">{album.name}</h1>
                <p className="play-list-owner-name">{album.label}</p>
              </div>
            </div>
          )}
          {album && (
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
                  {albumTracks.map((eachTrack, index) => (
                    <tr
                      className={`track-row ${
                        selectedTrack !== null &&
                        selectedTrack.id === eachTrack.id &&
                        "selected-track"
                      }`}
                      key={index}
                      onClick={() => handleSelectedTrack(eachTrack)}
                    >
                      <td className="track-data">{index + 1}</td>
                      <td className="track-data album-name">
                        {eachTrack.name}
                      </td>
                      <td className="track-data">
                        {getDurationInMinutes(eachTrack.duration_ms)}
                      </td>
                      <td className="track-data">
                        {eachTrack.artists[0].name}
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
                  src={album.images[0].url}
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
              {!isMobile() && (
                <AudioPlayer
                  src={selectedTrack.preview_url}
                  layout="horizontal"
                  showJumpControls={false}
                  customAdditionalControls={[]}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="single-playlist-main-container-mobile">
        <button className="back-btn">
          <FaArrowLeft />
          <span>Back</span>
        </button>
        {album && (
          <div className="single-playlist-banner-mobile">
            <img
              src={album.images[0].url}
              alt="play-list-banner"
              className="single-playlist-logo-mobile"
            />
            <div className="single-playlist-info-mobile">
              <h1 className="single-play-list-name">{album.name}</h1>
              <p className="play-list-owner-name">{album.label}</p>
            </div>
          </div>
        )}
        {albumTracks && (
          <ul className="display-tracks-container-mobile">
            {albumTracks.map((eachTrack) => (
              <li
                key={eachTrack.id}
                className="track-container-mobile"
                onClick={() => handleSelectedTrack(eachTrack)}
              >
                <div>
                  <h3 className="track-name-mobile">{eachTrack.name}</h3>
                  <p className="track-artist-mobile">
                    {eachTrack.artists[0].name}
                  </p>
                </div>
                <span className="track-duration-mobile">
                  {getDurationInMinutes(eachTrack.duration_ms)}
                </span>
              </li>
            ))}
          </ul>
        )}
        {selectedTrack && (
          <div className="audio-player-container">
            <div className="album-logo-artist-container">
              <img
                src={album.images[0].url}
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
            <button className="audio-control-btn" onClick={handlePlayPause}>
              {isPlaying ? <IoMdPause /> : <IoMdPlay />}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NewReleasesSinglePlayList;
