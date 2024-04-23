import Cookies from "js-cookie";
import "./index.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const PlayListContainer = (props) => {
  const { playListData, routePath } = props;

  return (
    <ul className="display-playlist-container">
      {playListData.map((eachPlayList) => (
        <Link
          to={`/playlist${routePath ? routePath : ""}/${eachPlayList.id}`}
          key={eachPlayList.id}
          className="link-style"
        >
          <li className="play-list-banner">
            <img
              src={eachPlayList.images[0].url}
              alt="playlist-logo"
              className="play-list-logo"
            />
            <span className="play-list-name">{eachPlayList.name}</span>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default PlayListContainer;
