import {nanoid} from "nanoid";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';

let initialState = {
    users: [
        { id: nanoid(), followed: false, fullName: "Jimmy", status: 'Developer', location: {city: 'Rom', country: 'Italy'}},
        { id: nanoid(), followed: false, fullName: "Hannah", status: 'Architect', location: {city: 'Oulu', country: 'Finland'}},
        { id: nanoid(), followed: true, fullName: "Uati", status: 'Batman', location: {city: 'Auckland', country: 'New Zealand'}},

    ],
    newPostText: "itBro",
};

const usersReducer = (state = initialState, action ) => {
    switch(action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map( u => {
                    if(u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }

        case UNFOLLOW:
        default:
            return state;
        }
}

export const followAC = (userId) => ({
    type: FOLLOW, userId
})

export const unfollowAC = (userId) => ({
    type: UNFOLLOW, userId
})

export default usersReducer;