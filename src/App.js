import React, {lazy} from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";

import DialogsContainer from "./components/Dialogs/DialogsContainer";
// const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'))
// const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'))

import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import withRouter from "./components/common/WithRouter";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/reduxStore";
import {withSuspense} from "./hoc/withSuspense";

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Routes>
                        <Route
                            exact
                            path="/dialogs"
                            element={
                            <DialogsContainer/>
                            // withSuspense(DialogsContainer)
                        }
                        />
                        <Route
                            exact
                            path="/profile/:userId?"
                            element={<ProfileContainer/>
                            // withSuspense(ProfileContainer)
                        }
                        />
                        <Route exact path="/users" element={<UsersContainer/>}/>
                        <Route exact path="/login" element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp = (props) => {
    return <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}
export default SamuraiJSApp