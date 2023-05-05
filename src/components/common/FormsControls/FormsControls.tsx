import React from "react";
import styles from './FormsControls.module.css'
import {Field, WrappedFieldProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators/validators";

type FormControlPropsType = {
    meta: {
        touched: boolean,
        error: string
    },
    // meta: WrappedFieldMetaProps,
    // children: React.ReactNode
}

const FormControl:React.FC<FormControlPropsType> = ({meta:{touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, child, ...restProps} = props;
    return  <FormControl {...props}>
        <textarea {...input} {...restProps}/>
    </FormControl>
}
export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}>
        <input {...input} {...restProps}/>
    </FormControl>
}

// type LoginFormValuesType = {
//     email: string;
//     password: string;
//     rememberMe: boolean;
//     captcha: string;
// }
//
// type LoginFormValuesTypeKeys = keyof LoginFormValuesType

export function createField<FormKeysType extends string>(placeholder: string | undefined,
                            name: FormKeysType, //LoginFormValuesTypeKeys
                            validators: Array<FieldValidatorType> | string,
                            component: React.FC<WrappedFieldProps>, // string | React.Component | React.FC,
                            props,
                            text='') {
    return <div>
        <Field
            placeholder={placeholder}
            name={name}
            validate={validators}
            component={component}
            {...props}/>
        {text}
    </div>
}
