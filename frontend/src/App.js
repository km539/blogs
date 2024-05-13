import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Friends from "./Components/Friends";
import MyPage from "./Components/MyPage";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Router>
        <div className="content-wrapper">
          <NavBar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Friends" element={<Friends />} />
              <Route path="/MyPage" element={<MyPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
