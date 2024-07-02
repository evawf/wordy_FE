import { Routes, Route } from "react-router-dom";
import New from "./pages/New";
import Dashboard from "./pages/Dashboard";
import Words from "./pages/Words";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useState, useEffect } from "react";
import Register from "./pages/Register";
import axios from "axios";
import Profile from "./pages/Profile";

export default function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;
  axios.defaults.withCredentials = true;

  // useEffect(() => {
  //   window.addEventListener("resize", () => setWidth(window.innerWidth));
  // }, []);

  return (
    <>
      {/* {width < breakpoint ? ( */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/new" element={<New />} />
        <Route exact path="/words" element={<Words />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
      {/* ) : (
        <div style={{ width: "100%", height: "100%", marginTop: "200px" }}>
          <h3 style={{ width: "100%" }}>Desktop version coming soon...</h3>
        </div>
      )} */}
    </>
  );
}
