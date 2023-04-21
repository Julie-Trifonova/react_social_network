import React, {Component} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profileReducer";
import withRouter from "../common/WithRouter";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends Component {

    componentDidMount() {
        let userId = this.props.params.userId;
        if(!userId) {
            userId = 2;
        }
        this.props.getUserProfile(userId);
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
export default compose(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
//
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)
// export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);
