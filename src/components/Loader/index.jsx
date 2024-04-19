import "./index.css";

const Loader = () => (
  <div className="loader-main-container">
    <div className="loader">
      <img
        src="https://res.cloudinary.com/diuvnny8c/image/upload/v1713338797/music_b5ox5o.png"
        className="loader-logo"
        alt="app-logo"
      />
      <p className="loading-info">Loading...</p>
    </div>
  </div>
);

export default Loader;
