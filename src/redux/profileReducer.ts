import {nanoid} from "nanoid";
import {profileAPI, usersAPI} from "../components/api/api.ts";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "./types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        { id: nanoid(), message: "Hi, how are you?", likesCount: 5 },
        { id: nanoid(), message: "It`s my first post", likesCount: 27 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
};
type InitialStateType = typeof initialState
type ActionTypes = AddPostActionCreatorActionType
| SetUserProfileActionType
| SetStatusActionType
| DeletePostActionType
| SavePhotoSuccessActionType

const profileReducer = ( state = initialState, action: ActionTypes ): InitialStateType => {
    switch(action.type) {
        case ADD_POST: {
            type NewPostType = {
                id: string,
                message: string,
                likesCount: number | any,
            }
            let newPost: NewPostType = {
                id: nanoid(),
                message: action.newPostText,
                likesCount: 0,
            };

            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: action.posts.filter(p => p.id !== action.postId)
            };
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            };
        }
        default:
            return state;
        }
}

type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({
    type: ADD_POST, newPostText
})

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({
    type: SET_USER_PROFILE, profile
})

type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({
    type: SET_STATUS, status
})

type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
    posts: Array<PostType>
}
export const deletePost = (postId: number): DeletePostActionType => ({
    type: DELETE_POST, postId, posts: []
})

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({
    type: SAVE_PHOTO_SUCCESS, photos
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getUserProfile = (userId: number)
    : ThunkType => async (dispatch) => {
    const response = await usersAPI.getProfile(userId);
        dispatch(setUserProfile(response.data))
}
export const getStatus = (userId: number)
    : ThunkType => async (dispatch) => {
    const response = await profileAPI.getStatus(userId);
        dispatch(setStatus(response.data))
}
export const updateStatus = (status: string)
    : ThunkType => async (dispatch) => {
    try {
        const response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch(error) {}
}
export const savePhoto = (file: object)
    : ThunkType => async (dispatch) => {
    const response = await profileAPI.savePhoto(file);
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
}
export const saveProfile = (profile: ProfileType)
    : ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
        if (response.data.resultCode === 0) {
            dispatch(getUserProfile(userId))
        } else {
            dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0]}))
            return Promise.reject(response.data.messages[0])
            // dispatch(stopSubmit('edit-profile', {'contacts': {'facebook': response.data.messages[0]}}))
        }
}

export default profileReducer;