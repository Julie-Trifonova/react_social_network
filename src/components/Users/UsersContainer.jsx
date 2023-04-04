import React, {Component} from 'react'
import {connect} from "react-redux";
import {
    followSuccess, getUsers,
    setCurrentPage, toggleFollowingProgress,
    unfollowSuccess
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader";

export class UsersContainer extends Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {

        return <>
            { this.props.isFetching ? <Preloader/> : null }
        <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            follow={this.props.followSuccess}
            unfollow={this.props.unfollowSuccess}
            toggleFollowingProgress={this.props.toggleFollowingProgress}
            followingInProgress={this.props.followingInProgress}
        />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}

export default connect(mapStateToProps,
    {
        followSuccess,
        unfollowSuccess,
        setCurrentPage,
        toggleFollowingProgress,
        getUsers
    }
)(UsersContainer);