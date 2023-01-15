import React from "react";
import "./App.css";
import Dialogs from "./components/Dialogs/Dialogs";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <Routes>
          <div className="app-wrapper-content">
            <Route component={Dialogs} />
            <Route component={Profile} />
          </div>
        </Routes>
      </div>
      {/* <Dialogs/> */}
      {/* <Profile/> */}
    </BrowserRouter>
  );
};

export default App;
