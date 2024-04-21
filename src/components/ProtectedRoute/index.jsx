import { Redirect, Route } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = (props) => {
  const authToken = Cookies.get("authToken");

  if (authToken === undefined) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;
