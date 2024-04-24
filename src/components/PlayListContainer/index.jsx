import { Link } from "react-router-dom";
import "./index.css";

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
