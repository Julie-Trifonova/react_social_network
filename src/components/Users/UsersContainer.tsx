import React, {Component} from 'react'
import {connect} from "react-redux";
import {
    follow, unfollow, requestUsers, FilterType,
} from "../../redux/usersReducer.ts";
import Users from "./Users.tsx";
import Preloader from "../common/Preloader/Preloader.tsx";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers, getUsersFilter,
} from "../../redux/usersSelectors.ts";
import {UserType} from "../../redux/types/types";
import {AppStateType} from "../../redux/reduxStore";

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    users: Array<UserType>
    totalUsersCount: number
    followingInProgress: Array<number>
    filter: FilterType
}
type MapDispatchPropsType = {
    follow: () => void
    unfollow: () => void
    getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

export class UsersContainer extends Component<PropsType, {}> {

    componentDidMount() {
        const {currentPage, pageSize, filter} = this.props;
        this.props.getUsers(currentPage, pageSize, filter);
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize, filter} = this.props;
        this.props.getUsers(pageNumber, pageSize, filter);
    }

    onFilterChanged = (filter: FilterType) => {
        const {pageSize} = this.props;
        this.props.getUsers(1, pageSize, filter);
    }

    render() {
        return <>
            { this.props.isFetching ? <Preloader/> : null }
        <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            onFilterChanged={this.onFilterChanged}
            users={this.props.users}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            followingInProgress={this.props.followingInProgress}
        />
        </>
    }
}

let mapStateToProps = (state: AppStateType | any): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state),
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>
    (mapStateToProps,{follow, unfollow, getUsers: requestUsers})
)(UsersContainer)