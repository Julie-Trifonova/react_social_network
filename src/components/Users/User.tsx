import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user_1.jpg";
import {NavLink} from "react-router-dom";
import {UserType} from "../../redux/types/types";

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const User: React.FC<PropsType> = ({user, followingInProgress, follow, unfollow}) => {
    return (<div>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small !== null ? user.photos.small : userPhoto}
                                 className={styles.userPhoto}
                                 alt=''
                            />
                            </NavLink>
                        </div>
                        <div>

                            {user.followed
                                ? <button disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => unfollow(user.id)
                                }>Unfollow</button>
                                : <button disabled={followingInProgress.some(id => id === user.id)}
                                          onClick={() => follow(user.id)
                                }>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            {/*<div>{u.location.country}</div>*/}
                            {/*<div>{u.location.city}</div>*/}
                        </span>
                    </span>
                </div>
    )
}
export default User;