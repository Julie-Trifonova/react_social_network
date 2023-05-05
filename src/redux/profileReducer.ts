import {nanoid} from "nanoid";
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "./types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./reduxStore";
import {usersAPI} from "../components/api/usersAPI";
import {profileAPI} from "../components/api/profileAPI.ts";
import {File} from "buffer";


let initialState = {
    posts: [
        { id: nanoid(), message: "Hi, how are you?", likesCount: 5 },
        { id: nanoid(), message: "It`s my first post", likesCount: 27 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
};

const profileReducer = ( state = initialState, action: ActionsTypes ): InitialStateType => {
    switch(action.type) {
        case 'SN/PROFILE/ADD-POST': {
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
        case 'SN/PROFILE/SET_STATUS': {
            return {
                ...state,
                status: action.status
            };
        }
        case 'SN/PROFILE/SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            };
        }
        case 'SN/PROFILE/DELETE_POST': {
            return {
                ...state,
                posts: action.posts.filter(p => p.id !== action.postId)
            };
        }
        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS': {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            };
        }
        default:
            return state;
        }
}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'SN/PROFILE/ADD-POST', newPostText}),
    setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile}),
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status}),
    deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId, posts: []}),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos}),
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId);
        dispatch(actions.setUserProfile(data))
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
        dispatch(actions.setStatus(data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status))
        }
    } catch(error) {}
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
        if (data.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(data.data.photos))
        }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);
        if (data.resultCode === 0) {
            if (userId !== null) {
                dispatch(getUserProfile(userId))
            } else {
                throw new Error(`userId can't be null`)
            }
        } else {
            dispatch(stopSubmit('edit-profile', { _error: data.messages[0]}))
            return Promise.reject(data.messages[0])
            // dispatch(stopSubmit('edit-profile', {'contacts': {'facebook': response.data.messages[0]}}))
        }
}

export default profileReducer;

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>