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
        <Routes className="app-wrapper-content">
          <Route path='/dialogs' element={<Dialogs/>} />
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
