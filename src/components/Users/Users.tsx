import React from "react";
import {nanoid} from "nanoid";
import Paginator from "../common/Paginator/Paginator.tsx";
import User from "./User.tsx";
import {UserType} from "../../redux/types/types";
import {UsersSearchForm} from "./UsersSearchForm.tsx";
import {FilterType} from "../../redux/usersReducer";

type UsersType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
    users: Array<UserType>
    followingInProgress: Array<number>,
    follow: () => void
    unfollow: () => void
}

const Users: React.FC<UsersType> =
    ({
         totalUsersCount,
         pageSize,
         currentPage,
         onPageChanged,
        onFilterChanged,
         users,
         followingInProgress,
         follow,
         unfollow,
     }) => {

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

export default Users;