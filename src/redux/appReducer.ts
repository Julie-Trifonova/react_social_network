import {getAuthUserData} from "./authReducer.ts";
import {InferActionsTypes} from "./reduxStore";

let initialState = {
    initialized: false,
}

export type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>
    
const appReducer = (state= initialState, action: ActionsTypes ): InitialStateType => {
    switch(action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
        }
}

const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = ()
    : (dispatch) => void => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    //dispatch(somethingElse())
    //dispatch(somethingElse())
    Promise.all([promise])
        .then(() => {
        dispatch(actions.initializedSuccess())
    })
};

export default appReducer;