import {getAuthUserData} from "./authReducer.ts";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType = {
    initialized: boolean,
}
let initialState: InitialStateType = {
    initialized: false,
};

type ActionTypes = InitializedSuccessActionType
const appReducer = (state= initialState, action: ActionTypes ): InitialStateType => {
    switch(action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
        }
}

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS,
}
export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

export const initializeApp = ()
    : (dispatch) => void => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    //dispatch(somethingElse())
    //dispatch(somethingElse())
    Promise.all([promise])
        .then(() => {
        dispatch(initializedSuccess())
    })
};

export default appReducer;