import usersReducer, {actions, InitialStateType} from "./usersReducer";
import axios from "axios";

let state: InitialStateType;

beforeEach(() => {
    state = {
        users: [
            {id: 0, name: 'Max 0', followed: false, photos: {small: null, large: null}, status: 'status 0'},
            {id: 0, name: 'Max 1', followed: false, photos: {small: null, large: null}, status: 'status 1'},
            {id: 0, name: 'Max 2', followed: true, photos: {small: null, large: null}, status: 'status 2'},
            {id: 0, name: 'Max 3', followed: true, photos: {small: null, large: null}, status: 'status 3'},
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test ('follow success', () => {
    const newState = usersReducer(state, actions.followSuccess(1))

    expect (newState.users[0].followed).toBeFalsy()
    expect (newState.users[1].followed).toBeTruthy()
})

test ('unfollow success', () => {
    const newState = usersReducer(state, actions.unfollowSuccess(3))

    expect (newState.users[2].followed).toBeTruthy()
    expect (newState.users[3].followed).toBeFalsy()
})
