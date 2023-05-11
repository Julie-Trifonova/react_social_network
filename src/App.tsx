import React, {Component, ComponentType, lazy} from "react";
import "./App.css";
import 'antd/dist/reset.css'
import {BrowserRouter, HashRouter} from "react-router-dom";
// const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer.tsx'))
// const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'))
import {connect, Provider} from "react-redux";
import withRouter from "./components/common/WithRouter";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer.ts";
import Preloader from "./components/common/Preloader/Preloader.tsx";
import store, {AppStateType} from "./redux/reduxStore.ts";
import {withSuspense} from "./hoc/withSuspense";
import AppLayout from "./css/Layout.tsx";

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
            <AppLayout/>
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