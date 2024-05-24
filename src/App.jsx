import { Routes, Route } from "react-router-dom";
import New from "./pages/New";
import Home from "./pages/Home";
import Words from "./pages/Words";

export default function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/new" element={<New />} />
      <Route exact path="/words" element={<Words />} />
    </Routes>
  );
}
