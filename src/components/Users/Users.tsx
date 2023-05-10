import React, {useEffect} from "react";
import {nanoid} from "nanoid";
import Paginator from "../common/Paginator/Paginator.tsx";
import User from "./User.tsx";
import {UsersSearchForm} from "./UsersSearchForm.tsx";
import {FilterType, follow, requestUsers} from "../../redux/usersReducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/usersSelectors.ts";
import {useNavigate} from "react-router-dom";

type PropsType = {}

export const Users: React.FC<PropsType> = (props) => {
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect (() => {
        navigate({
            pathname: 'users',
            search: `?term=${filter.term}&friend=${filter.friend}`
        })
    }, [filter])

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const follow = () => {
        dispatch(follow)
    }
    const unfollow = () => {
        dispatch(unfollow)
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <Paginator
                portionSize={10}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
            />
            <div>
                {
                    users.map(u => <User
                        key={nanoid()}
                        user={u}
                        followingInProgress={followingInProgress}
                        follow={follow}
                        unfollow={unfollow}
                    />)
                }
            </div>
        </div>
    )
}
