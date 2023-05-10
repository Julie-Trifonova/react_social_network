import React, {useEffect} from "react";
import {nanoid} from "nanoid";
import Paginator from "../common/Paginator/Paginator.tsx";
import User from "./User.tsx";
import {UsersSearchForm} from "./UsersSearchForm.tsx";
import {FilterType, requestUsers} from "../../redux/usersReducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/usersSelectors.ts";
import {useLocation, useNavigate} from "react-router-dom";

type PropsType = {}

type QueryParamsType = { term?: string, page?: string, friend?: string };

export const Users: React.FC<PropsType> = (props) => {
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    let location = useLocation()

    useEffect (() => {
        navigate({
            search: `?$term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage])

    useEffect(() => {
        const parsed = new URLSearchParams(location.search.substring(1) as QueryParamsType)
        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.get('page')) actualPage = Number(parsed.get('page'))
        if (!!parsed.get('term')) actualFilter = {...actualFilter, term: parsed.get('term') as string}

        switch (parsed.get('friend')) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}

        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        navigate({
            search: `?$term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage])

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
