import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'
import News from '../views/news/News'
import Detail from '../views/news/Detail'

export default function IndexRouter() {
  return (
    <HashRouter>
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/news' element={<News />} />
            <Route path='/detail/:id' element={<Detail />} />
            {/* <Route path='/' element={ localStorage.getItem("token") ? <NewsSandBox /> : <Navigate to='/login' /> } /> */}
            <Route path='/*' element={ localStorage.getItem("token") ? <NewsSandBox/> : <Navigate to='/login' /> } />
            <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
    </HashRouter>
  )
}
