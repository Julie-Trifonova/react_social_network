import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import {Navigate, Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";

const App = () => {
  return (
      <div className="app-wrapper">
        <HeaderContainer/>
        <Navbar />
        <div className="app-wrapper-content">
          <Routes>
              <Route exact path="/dialogs" element={<DialogsContainer/>}/>
              <Route exact path="/profile/:userId?" element={<ProfileContainer/>}/>
              <Route exact path = "/users" element={<UsersContainer/>}/>
              <Route exact path = "/login" element={<Login/>}/>
          </Routes>
        </div>
      </div>
  );
};

export default App;
