import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../../views/sandbox/home/Home';
import UserList from '../../views/sandbox/user-manage/UserList';
import RightList from '../../views/sandbox/right-manage/RightList';
import RoleList from '../../views/sandbox/right-manage/RoleList';
import NoPermission from '../../views/sandbox/noPermission/NoPermission';

export default function NewsRouter() {
    return (
        <div>
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/user-manage/list' element={<UserList />} />
                <Route path='/right-manage/role/list' element={<RoleList />} />
                <Route path='/right-manage/right/list' element={<RightList />} />
                <Route path='*' element={<NoPermission />} />
                <Route path='/' element={<Navigate replace to='/home' />} />
            </Routes>
        </div>
    )
}
