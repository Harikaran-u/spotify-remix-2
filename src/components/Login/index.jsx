import { useState } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const loginReqUrl = "https://apis.ccbp.in/login";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setUserPassword] = useState("");
  const [loginErrorMsg, setLoginErrorMsg] = useState("");

  const { history } = props;
  const authToken = Cookies.get("authToken");

  if (authToken !== undefined) {
    return <Redirect to="/" />;
  }

  const submitUserDetails = async () => {
    const configOptions = {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    };
    try {
      const response = await fetch(loginReqUrl, configOptions);
      const data = await response.json();
      if (response.ok) {
        const token = data.jwt_token;
        Cookies.set("authToken", token, { expires: 30, path: "/" });
        history.replace("/");
      } else {
        setLoginErrorMsg(data.error_msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    submitUserDetails();
    setUsername("");
    setUserPassword("");
  };

  const handleUserName = (e) => {
    setUsername(e.target.value);
    setLoginErrorMsg("");
  };

  const handleUserPassword = (e) => {
    setUserPassword(e.target.value);
    setLoginErrorMsg("");
  };

  return (
    <div className="login-main-container">
      <form onSubmit={handleLoginSubmit} className="login-form-container">
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/diuvnny8c/image/upload/v1713338797/music_b5ox5o.png"
            className="music-logo"
            alt="logo-img"
          />
          <h1 className="app-title">Spotify Remix</h1>
        </div>
        <div>
          <label htmlFor="username" className="user-label">
            USERNAME
          </label>
          <input
            id="username"
            type="text"
            className="user-input"
            value={username}
            onChange={handleUserName}
          />
          <label htmlFor="password" className="user-label">
            PASSWORD
          </label>
          <input
            id="password"
            type="password"
            className="user-input"
            value={password}
            onChange={handleUserPassword}
          />
        </div>
        <button type="submit" className="login-btn">
          LOGIN
        </button>
        {loginErrorMsg && <p className="login-error-msg">* {loginErrorMsg}</p>}
      </form>
    </div>
  );
};
export default Login;
