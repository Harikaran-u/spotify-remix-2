import "./index.css";

const PlayListContainer = (props) => {
  const { playListData } = props;

  return (
    <ul className="display-playlist-container">
      {playListData.map((eachPlayList) => (
        <li className="play-list-banner" key={eachPlayList.id}>
          <img
            src={eachPlayList.images[0].url}
            alt="playlist-logo"
            className="play-list-logo"
          />
          <span className="play-list-name">{eachPlayList.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default PlayListContainer;
