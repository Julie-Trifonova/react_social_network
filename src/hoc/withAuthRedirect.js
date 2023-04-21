import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
})

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Navigate to="/login" replace />
            return <Component {...this.props}/>
        }
    }

    // let ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    // return ConnectedRedirectComponent;
    return connect(mapStateToPropsForRedirect)(RedirectComponent);

}