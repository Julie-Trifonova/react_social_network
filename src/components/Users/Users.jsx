import React from 'react'
import PropTypes from 'prop-types'
import styles from './users.module.css'
import {nanoid} from "nanoid";

const Users = (props) => {

    if (props.users.length === 0) {
        props.setUsers([
            { id: nanoid(), photoUrl:'https://www.film.ru/sites/default/files/news/14040483-834747.jpg',
                followed: false, fullName: "Jimmy", status: 'Developer', location: {city: 'Rom', country: 'Italy'}},
            { id: nanoid(), photoUrl: 'https://i.imgur.com/urLrkXb.jpg',
                followed: false, fullName: "Hannah", status: 'Architect', location: {city: 'Oulu', country: 'Finland'}},
            { id: nanoid(), photoUrl: 'https://postila.ru/data/3f/df/3f/b1/3fdf3fb1cf65d04425e3a14b3b59c951b125efca6641515c965e963c6ce5ca2b.jpg',
                followed: true, fullName: "Uati", status: 'Batman', location: {city: 'Auckland', country: 'New Zealand'}},
        ])
    }

    return (
        <div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photoUrl} className={styles.userPhoto}/>
                        </div>
                        <div>
                            { u.followed
                                ? <button onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
                                : <button onClick={() => {props.follow(u.id)}}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}

Users.propTypes = {}

export default Users
