import React from "react";
import "./App.css";
import Dialogs from "./components/Dialogs/Dialogs";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = (props) => {

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>        
          <Routes>
            <Route exact path='/dialogs' element={<Dialogs dialogs={props.appState.dialogs} messages={props.appState.messages} />} />
            <Route exact path='/profile' element={<Profile posts={props.appState.posts}/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
