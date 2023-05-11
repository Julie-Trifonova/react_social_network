import React from 'react'
import s from './Header.module.css'
import {Link, NavLink} from "react-router-dom";
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUserLogin, selectIsAuth} from "../../redux/authSelectors.ts";
import {logout} from "../../redux/authReducer.ts";

export type MapPropsType = {}

export const Header: React.FC<MapPropsType> = (props) => {

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)
    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }

    const {Header} = Layout;

    return (
        <Header className="header">
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key='1'>
                            <NavLink to="/developers" className={({isActive}) => (isActive ? s.active : s.inactive)}>
                                Developers
                            </NavLink>
                        </Menu.Item>
                    </Menu>
                </Col>
                {isAuth ?
                    <>
                        <Col span={1}>
                            <Avatar title={login} style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                        </Col>
                        <Col span={5}>
                            <Button onClick={logoutCallback}>Log out</Button>
                        </Col>
                    </>
                    : <Col span={6}>
                        <Button>
                            <Link to={'/login'}>Login</Link>
                        </Button>
                    </Col>
                    }
                    </Row>
                    </Header>

                    // <header className={s.header}>
                    //   <img
                    //     src="https://cdn.cssauthor.com/wp-content/uploads/2012/12/accelrys1.png?strip=all&lossy=1&resize=730%2C500&ssl=1"
                    //     alt=""
                    //   />
                    //     <div className={s.loginBlock}>
                    //         { props.isAuth
                    //             ? <div>
                    //                 {props.login}
                    //                 <button onClick={props.logout}>Log out</button>
                    //             </div>
                    //             : <NavLink to={'/login'}>Login</NavLink> }
                    //     </div>
                    // </header>
                    );
                }

