import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { RiLogoutCircleRLine } from "react-icons/ri";
import Loader from "../Loader";
import PlayListContainer from "../PlayListContainer";
import CategoryContainer from "../CategoryContainer";
import "./index.css";

const featuredPlaylistsApiUrl =
  "https://apis2.ccbp.in/spotify-clone/featured-playlists";

const categoriesApiUrl = "https://apis2.ccbp.in/spotify-clone/categories";

const newReleasesApiUrl = "https://apis2.ccbp.in/spotify-clone/new-releases";

const Home = () => {
  const [featuredPlayList, setFeaturedPlayList] = useState(null);
  const [categoryPlayList, setCategoryPlayList] = useState(null);
  const [newReleasesPlayList, setNewReleasesPlayList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const authToken = Cookies.get("authToken");

  const getFeaturedPlayListData = async () => {
    const configOptions = {
      method: "GET",
      headers: {
        Authorization: `bearer ${authToken}`,
      },
    };
    try {
      const response = await fetch(featuredPlaylistsApiUrl, configOptions);
      const data = await response.json();
      if (response.ok) {
        setFeaturedPlayList(data.playlists.items);
        setIsLoading(false);
        console.log(data.playlists.items);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCategoriesPlayListData = async () => {
    const configOptions = {
      method: "GET",
      headers: {
        Authorization: `bearer ${authToken}`,
      },
    };
    try {
      const response = await fetch(categoriesApiUrl, configOptions);
      const data = await response.json();
      if (response.ok) {
        setCategoryPlayList(data.categories.items);
        console.log(data.categories.items);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getNewReleasePlayListData = async () => {
    const configOptions = {
      method: "GET",
      headers: {
        Authorization: `bearer ${authToken}`,
      },
    };
    try {
      const response = await fetch(newReleasesApiUrl, configOptions);
      const data = await response.json();
      if (response.ok) {
        setNewReleasesPlayList(data.albums.items);
        setIsLoading(false);
        console.log(data.albums.items);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeaturedPlayListData();
    getCategoriesPlayListData();
  }, []);

  useEffect(() => {
    getNewReleasePlayListData();
  }, []);

  return (
    <div className="main-home-container">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <div className="side-bar">
            <img
              src="https://res.cloudinary.com/diuvnny8c/image/upload/v1713338797/music_b5ox5o.png"
              alt="music-logo"
              className="app-logo"
            />

            <button type="button" className="logout-btn">
              <RiLogoutCircleRLine size="25" />
              <span className="logout-span">Logout</span>
            </button>
          </div>
          <div className="play-list-data-container">
            <div className="editors-pick-container">
              <h2 className="play-list-head">Editor's picks</h2>
              {featuredPlayList && (
                <PlayListContainer playListData={featuredPlayList} />
              )}
            </div>
            <div className="genre-moods-container">
              <h2 className="play-list-head">Genres & Moods</h2>
              {categoryPlayList && (
                <CategoryContainer categoryData={categoryPlayList} />
              )}
            </div>
            <div className="editors-pick-container">
              <h2 className="play-list-head">New releases</h2>
              {newReleasesPlayList && (
                <PlayListContainer playListData={newReleasesPlayList} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
