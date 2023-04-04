import React, {Component} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profileReducer";
import withRouter from "../common/WithRouter";
import {Navigate} from "react-router-dom";

class ProfileContainer extends Component {

    componentDidMount() {
        let userId = this.props.params.userId;
        if(!userId) {
            userId = 2;
        }
        this.props.getUserProfile(userId);
    }

    render() {
        if (!this.props.isAuth) return <Navigate to="/login" replace />
        return (
                <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)
export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);
