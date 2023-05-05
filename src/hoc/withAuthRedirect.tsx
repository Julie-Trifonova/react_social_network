import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/reduxStore";
import {Navigate} from "react-router-dom";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

type MapPropsType = {
    isAuth: boolean
}
type DispatchPropsType = {}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType) {
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props

        if (!isAuth) return <Navigate to="/login" replace />
        return <WrappedComponent {...restProps as WCP}/>
    }
    return connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(
        mapStateToPropsForRedirect, {})(RedirectComponent);
}