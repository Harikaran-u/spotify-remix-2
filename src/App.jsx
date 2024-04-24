import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Home from "./components/Home";
import SinglePlayList from "./components/SinglePlayList";
import NotFound from "./components/NotFound";
import NewReleasesSinglePlayList from "./components/NewReleaseSinglePlayList";
import CategoryPlayList from "./components/CategoryPlayList";
import "./App.css";

const App = () => (
  <div className="main-app-container">
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/playlist/:id" element={<SinglePlayList />} />
        <Route
          path="/playlist/new/:id"
          element={<NewReleasesSinglePlayList />}
        />
        <Route path="/category/playlist/:id" element={<CategoryPlayList />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
);

export default App;
