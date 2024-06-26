import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loader from "../Loader";
import PlayListContainer from "../PlayListContainer";
import CategoryContainer from "../CategoryContainer";
import ErrorContainer from "../ErrorContainer";
import Sidebar from "../Sidebar";
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
  const [isFeaturePlayListError, setFeaturedPlayListError] = useState(false);
  const [isCategoryPlayListError, setCategoryPlayListError] = useState(false);
  const [isNewReleasesPlayListError, setNewReleasesPlayListError] =
    useState(false);
  const authToken = Cookies.get("authToken");

  const getFeaturedPlayListData = async () => {
    setFeaturedPlayListError(false);
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
      } else {
        setFeaturedPlayListError(true);
      }
    } catch (err) {
      setFeaturedPlayListError(true);
    }
  };

  const getCategoriesPlayListData = async () => {
    setCategoryPlayListError(false);
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
      } else {
        setCategoryPlayListError(true);
      }
    } catch (err) {
      setCategoryPlayListError(true);
    }
  };

  const getNewReleasePlayListData = async () => {
    setNewReleasesPlayListError(false);
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
      } else {
        setNewReleasesPlayListError(true);
      }
    } catch (err) {
      setNewReleasesPlayListError(true);
    }
  };

  useEffect(() => {
    getFeaturedPlayListData();
    getCategoriesPlayListData();
    getNewReleasePlayListData();
  }, []);

  return (
    <div className="main-home-container">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <Sidebar />
          <div className="play-list-data-container">
            {!isFeaturePlayListError ? (
              <div className="editors-pick-container">
                <h2 className="play-list-head">Editor's picks</h2>
                {featuredPlayList && (
                  <PlayListContainer playListData={featuredPlayList} />
                )}
              </div>
            ) : (
              <ErrorContainer retryCallback={getFeaturedPlayListData} />
            )}

            {!isCategoryPlayListError ? (
              <div className="genre-moods-container">
                <h2 className="play-list-head">Genres & Moods</h2>
                {categoryPlayList && (
                  <CategoryContainer categoryData={categoryPlayList} />
                )}
              </div>
            ) : (
              <ErrorContainer retryCallback={getCategoriesPlayListData} />
            )}

            {!isNewReleasesPlayListError ? (
              <div className="editors-pick-container">
                <h2 className="play-list-head">New releases</h2>
                {newReleasesPlayList && (
                  <PlayListContainer
                    playListData={newReleasesPlayList}
                    routePath="/new"
                  />
                )}
              </div>
            ) : (
              <ErrorContainer retryCallback={getNewReleasePlayListData} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
