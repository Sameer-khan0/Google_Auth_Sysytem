import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Authentication from "./components/Authentication";
import Home from "./components/Home";
import Verification from "./components/Varification";

function App() {
  const user = localStorage.getItem("token");

  return (
    <>
      <Router>
        <Routes>
          {user && <Route path="/" exact element={<Home />} />}
          <Route path="/auth" element={<Authentication />} />
          <Route path="/" element={<Navigate replace to="/auth" />} />
          <Route path="/user/:id/verify/:token" element={<Verification />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
