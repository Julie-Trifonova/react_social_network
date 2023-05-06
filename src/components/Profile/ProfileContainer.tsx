import React, {Component} from "react";
import Profile from "./Profile.tsx";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profileReducer.ts";
import withRouter from "../common/WithRouter";
import {withAuthRedirect} from "../../hoc/withAuthRedirect.tsx";
import {compose} from "redux";
import {AppStateType} from "../../redux/reduxStore";
import {ProfileType} from "../../redux/types/types";

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
type OwnsPropsType = {}
// type PathParamsType = {
//     userId: string
// }

type PropsType = MapPropsType & DispatchPropsType

// & RouteComponentProps<PathParamsType>

class ProfileContainer extends Component<PropsType, OwnsPropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.router.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            // if (!userId) {
            // todo: replace push with Redirect
            //     this.props.history.push('/login')
            // }
        }
        if (!userId) {
            console.error("ID should exists in URL params or in state ('authorizedUserId')")
        } else {
            this.props.getUserProfile(userId)
            this.props.getStatus(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.router.params.userId !== prevProps.router.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.router.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}
            />
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})
export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
//
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)
// export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);
