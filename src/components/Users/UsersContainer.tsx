import React from 'react'
import {useSelector} from "react-redux";
import Preloader from "../common/Preloader/Preloader.tsx";
import {getIsFetching,} from "../../redux/usersSelectors.ts";
import {Users} from "./Users.tsx";

type UsersPagePropsType = {

}
export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)
    return <>
        { isFetching ? <Preloader/> : null }
        <Users/>
        </>
}