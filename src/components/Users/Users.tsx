import React from "react";
import {nanoid} from "nanoid";
import Paginator from "../common/Paginator/Paginator.tsx";
import User from "./User.tsx";
import {UserType} from "../../redux/types/types";

type UsersType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
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
         users,
         followingInProgress,
         follow,
         unfollow,
     }) => {

    return (
        <div>
            <Paginator
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