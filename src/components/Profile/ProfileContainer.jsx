import React, {Component} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profileReducer";
import withRouter from "../common/WithRouter";

class ProfileContainer extends Component {

    componentDidMount() {
        let userId = this.props.params.userId;
        if(!userId) {
            userId = 2;
        }
        this.props.getUserProfile(userId);

        // usersAPI.getProfile(userId).then(response => {
        //          this.props.setUserProfile(response.data);
        //      });
    }

    render() {
        return (
                <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)
export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);
