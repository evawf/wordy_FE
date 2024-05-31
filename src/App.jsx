import { Routes, Route } from "react-router-dom";
import New from "./pages/New";
import Home from "./pages/Home";
import Words from "./pages/Words";
import { useState, useEffect } from "react";

export default function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  return (
    <>
      {width < breakpoint ? (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/new" element={<New />} />
          <Route exact path="/words" element={<Words />} />
        </Routes>
      ) : (
        <>Please open the app on your mobile.</>
      )}
    </>
  );
}
