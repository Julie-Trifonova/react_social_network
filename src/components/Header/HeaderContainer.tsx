import React, {Component} from 'react'
import Header, {DispatchPropsType, MapPropsType} from "./Header.tsx";
import {connect} from "react-redux";
import {logout} from "../../redux/authReducer.ts";
import {AppStateType} from "../../redux/reduxStore";

class HeaderContainer extends Component<MapPropsType, {}> {
    render() {
        return (
            <Header {...this.props}/>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
} as MapPropsType)
export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {logout})(HeaderContainer);
