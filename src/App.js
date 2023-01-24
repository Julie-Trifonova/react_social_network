import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

const App = () => {
  return (
    // <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="app-wrapper-content">
          <Routes>
            <Route
              exact
              path="/dialogs"
              element={<DialogsContainer
                  // store={props.store}
              />}
            />
            <Route
              exact
              path="/profile"
              element={<Profile
                  // store={props.store}
              />}
            />
          </Routes>
        </div>
      </div>
    // </BrowserRouter>
  );
};

export default App;
