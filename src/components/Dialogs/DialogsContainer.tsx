import React from 'react'
import {actions} from "../../redux/dialogsReducer.ts";
import Dialogs from "./Dialogs.tsx";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect.tsx";
import {compose} from "redux";
import {AppStateType} from "../../redux/reduxStore";

let mapStateToProps = (state: AppStateType) => {
    return {
        messagesPage: state.messagesPage,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions}),
    withAuthRedirect
)(Dialogs)

// let mapDispatchToProps = (dispatch) => {
//     return {
//         sendMessage: (newMessageBody) => {
//             dispatch(actions.sendMessage(newMessageBody));
//         }
//     }
// }

// let AuthRedirectComponent = withAuthRedirect(Dialogs);
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
// export default DialogsContainer;
