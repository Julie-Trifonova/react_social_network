import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input} from "../common/FormsControls/FormsControls.tsx";
import {required} from "../../utils/validators/validators.ts";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/authReducer.ts";
import {Navigate} from "react-router-dom";
import style from './../common/FormsControls/FormsControls.module.css'
import {AppStateType} from "../../redux/reduxStore";

type LoginFormOwnProps = {
    captchaUrl: string | null
}
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input, {})}
            {createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, {type: 'password'})}
            {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}

            { captchaUrl && <img src={captchaUrl} alt=''/> }
            { captchaUrl && createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [required], Input, {})}

            {error &&
                <div className={style.formSummaryError}>
                    {error}
                </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm)

type LoginFormValuesType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string;
}

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

export const LoginPage: React.FC = (props) => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Navigate to="/profile" replace/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}

