import React from 'react';
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';

import type {MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import DialogsContainer from "../components/Dialogs/DialogsContainer.tsx";
import ProfileContainer from "../components/Profile/ProfileContainer.tsx";
import {UsersPage} from "../components/Users/UsersContainer.tsx";
import {LoginPage} from "../components/Login/LoginPage.tsx";
import s from './Layout.module.css'
import SubMenu from "antd/es/menu/SubMenu";


const {Header, Content, Footer, Sider} = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);

        let newLabel = ''
        if (key === '1') newLabel = 'My profile'
        if (key === '2') newLabel = 'Developers'
        if (key === '3') newLabel = 'Subnav 3'
        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,
            children:
                new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;

            return {
                key: subKey,
                label: `option${subKey}`,
            };
            }),
        };
    },
);

const AppLayout: React.FC = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <Layout>
            <Header className="header">
                <div className="logo"/>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key='1'>nav 1</Menu.Item>
                <Menu.Item key='2'>nav 2</Menu.Item>
                <Menu.Item key='3'>nav 3</Menu.Item>
                </Menu>
            </Header>
            <Content style={{padding: '0 50px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout style={{padding: '24px 0', background: colorBgContainer}}>
                    <Sider style={{background: colorBgContainer}} width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            // defaultOpenKeys={['sub1']}
                            style={{height: '100%'}}
                            // items={items2}
                        >
                            <SubMenu key='sub1' icon={<UserOutlined/>} title='My Profile'>
                                <Menu.Item key='1'>
                                    <NavLink to="/profile" className={({isActive}) => (isActive ? s.active : s.inactive)}>
                                        Profile
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key='2'>
                                    <NavLink to="/dialogs" className={({isActive}) => (isActive ? s.active : s.inactive)}>
                                        Messages
                                    </NavLink>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key='sub2' icon={<UserOutlined/>} title='Developers'>
                                <Menu.Item key='3'>
                                    <NavLink to="/users" className={({isActive}) => (isActive ? s.active : s.inactive)}>
                                        Users
                                    </NavLink>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{padding: '0 24px', minHeight: 280}}>
                        <Routes>
                            <Route exact path="/" element={<Navigate to={'/profile'} replace/>}/>
                            <Route
                                exact
                                path="/dialogs"
                                element={
                                    <DialogsContainer/>
                                    // <SuspendedDialogs/>
                                }
                            />
                            <Route
                                exact
                                path="/profile/:userId?"
                                element={<ProfileContainer/>
                                    // <SuspendedProfile/>
                                }
                            />
                            <Route exact path="/users" element={<UsersPage/>}/>
                            <Route exact path="/login" element={<LoginPage/>}/>
                            <Route exact path="*" element={<div>404 NOT FOUND</div>}/>
                        </Routes>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
    );
};

export default AppLayout;