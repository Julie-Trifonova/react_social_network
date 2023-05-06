import {updateObjectInArray} from "../utils/objectHelpers.ts";
import {UserType} from "./types/types";
import {Dispatch} from "redux";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";
import {usersAPI} from "../components/api/usersAPI.ts";
import {APIResponseType} from "../components/api/api";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 20,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, //array of users id
    filter: {
        term: ''
    },
}

const usersReducer = (state = initialState, action: ActionsTypes)
    : InitialStateType => {
    switch(action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true} )
            }
        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false} )
            }
        case 'SN/USERS/SET_USERS': {
            return {
                ...state,
                users: action.users
            }
        }
        case 'SN/USERS/SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.currentPage,
            }
        }
        case 'SN/USERS/SET_FILTER': {
            return {
                ...state,
                filter: action.payload,
            }
        }
        case 'SN/USERS/SET_TOTAL_USERS_COUNT': {
            return {
                ...state,
                totalUsersCount: action.count,
            }
        }
        case 'SN/USERS/TOGGLE_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching,
            }
        }
        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
        }
}

export const actions = {
    followSuccess: (userId: number) => ({type: 'SN/USERS/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'SN/USERS/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SN/USERS/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', currentPage} as const),
    setFilter: (term: string) => ({type: 'SN/USERS/SET_FILTER', payload: {term}} as const),
    setUsersTotalCount: (totalUsersCount: number) => ({type: 'SN/USERS/SET_TOTAL_USERS_COUNT', count: totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const),
}

export const requestUsers = (currentPage: number, pageSize: number, term: string)
    : ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.setFilter(term));

        let response = await usersAPI.getUsers(currentPage, pageSize, term);
                dispatch(actions.toggleIsFetching(false));
                dispatch(actions.setUsers(response.items));
                dispatch(actions.setUsersTotalCount(response.totalCount));
    }
}

const _followUnfollowFlow = async (
    dispatch: Dispatch<ActionsTypes>,
    userId: number,
    apiMethod: (userId: number) => Promise<APIResponseType>,
    actionCreator: (userId: number) => ActionsTypes
) => {
    dispatch(actions.toggleFollowingProgress(true, userId));

    let data = await apiMethod(userId)
    if(data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
    }
}

export default usersReducer;

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>