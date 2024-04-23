import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Home from "./components/Home";
import SinglePlayList from "./components/SinglePlayList";
import NotFound from "./components/NotFound";
import NewReleasesSinglePlayList from "./components/NewReleaseSinglePlayList";
import CategoryPlayList from "./components/CategoryPlayList";
import "./App.css";
import { Redirect } from "react-router-dom/cjs/react-router-dom";

const App = () => (
  <div className="main-app-container">
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/playlist/:id" component={SinglePlayList} />
      <ProtectedRoute
        exact
        path="/playlist/new/:id"
        component={NewReleasesSinglePlayList}
      />
      <ProtectedRoute
        exact
        path="/category/playlist/:id"
        component={CategoryPlayList}
      />
      <Route exact path="/notfound" component={NotFound} />
      <Redirect to="/notfound" />
    </Switch>
  </div>
);

export default App;
