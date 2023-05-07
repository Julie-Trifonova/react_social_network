import React, {Component, ComponentType, lazy} from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.tsx";
import {BrowserRouter, HashRouter, Navigate, Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer.tsx";
// const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer.tsx'))
// const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'))
import {UsersPage} from "./components/Users/UsersContainer.tsx";
import ProfileContainer from "./components/Profile/ProfileContainer.tsx";
import HeaderContainer from "./components/Header/HeaderContainer.tsx";
import Login from "./components/Login/Login.tsx";
import {connect, Provider} from "react-redux";
import withRouter from "./components/common/WithRouter";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer.ts";
import Preloader from "./components/common/Preloader/Preloader.tsx";
import store, {AppStateType} from "./redux/reduxStore.ts";
import {withSuspense} from "./hoc/withSuspense";

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}
type OwnsType = {}
// type SuspendedDialogs = withSuspense(DialogsContainer)
// type SuspendedProfile = withSuspense(ProfileContainer)


class App extends Component<MapPropsType & DispatchPropsType, OwnsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        console.log(`Some error occurred`)
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
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
                        <Route exact path="/" element={<Navigate to ={'/profile'} replace/>}/>
                        <Route
                            exact
                            path="/dialogs"
                            element={
                            <DialogsContainer/>
                            // <SuspendedDialogs/>
                        }
                        />
                        <Route
                            exact
                            path="/profile/:userId?"
                            element={<ProfileContainer/>
                            // <SuspendedProfile/>
                        }
                        />
                        <Route exact path="/users" element={<UsersPage/>}/>
                        <Route exact path="/login" element={<Login/>}/>
                        <Route exact path="*" element={<div>404 NOT FOUND</div>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state:AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp: React.FC = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}
export default SamuraiJSApp