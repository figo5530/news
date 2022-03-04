import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../../views/sandbox/home/Home';
import UserList from '../../views/sandbox/user-manage/UserList';
import RightList from '../../views/sandbox/right-manage/RightList';
import RoleList from '../../views/sandbox/right-manage/RoleList';
import NewsWrite from '../../views/sandbox/news-manage/NewsWrite'
import NewsDraft from '../../views/sandbox/news-manage/NewsDraft'
import NewsPreview from '../../views/sandbox/news-manage/NewsPreview'
import NewsCategory from '../../views/sandbox/news-manage/NewsCategory'
import NewsUpdate from '../../views/sandbox/news-manage/NewsUpdate'
import Audit from '../../views/sandbox/audit-manage/Audit'
import AuditList from '../../views/sandbox/audit-manage/AuditList'
import Published from '../../views/sandbox/publish-manage/Published'
import Unpublished from '../../views/sandbox/publish-manage/Unpublished'
import Archived from '../../views/sandbox/publish-manage/Archived'
import NoPermission from '../../views/sandbox/noPermission/NoPermission';
import axios from 'axios';
import { Spin } from 'antd';
import { connect } from 'react-redux'

const LocalRouterMap = {
    "/home": <Home />,
    "/user-manage/list": <UserList />,
    "/right-manage/role/list": <RoleList />,
    "/right-manage/right/list": <RightList />,
    "/news-manage/news/write": <NewsWrite />,
    "/news-manage/news/draft": <NewsDraft />,
    "/news-manage/news/update/:id": <NewsUpdate />,
    "/news-manage/news/preview/:id": <NewsPreview />,
    "/news-manage/news/category": <NewsCategory />,
    "/audit-manage/audit/news": <Audit />,
    "/audit-manage/audit/list": <AuditList />,
    "/publish-manage/published": <Published />,
    "/publish-manage/unpublished": <Unpublished />,
    "/publish-manage/archived": <Archived />
}

function NewsRouter(props) {
    const [backendRouteList, setBackendRouteList] = useState([])
    useEffect(() => {
        Promise.all([
            axios.get("http://localhost:5000/rights"),
            axios.get("http://localhost:5000/children"),
        ]).then(res => {
            setBackendRouteList([...res[0].data, ...res[1].data])
        })
    }, [])

    const checkRoute = item => {
        return (item.pagepermission || item.routepermission) && LocalRouterMap[item.key]
    }

    const { role: { rights } } = JSON.parse(localStorage.getItem("token"))

    const checkUserPermission = item => {
        return rights.includes(item.key)
    }

    return (
        <Spin size='large' spinning={props.isLoading}>
            <Routes>
                {
                    backendRouteList.map(item => {
                        if (checkRoute(item) && checkUserPermission(item)) {
                            return <Route path={item.key} element={LocalRouterMap[item.key]} key={item.key} />
                        }
                        return null
                    })
                }
                <Route path='/' element={<Navigate replace to='/home' />} />
                {
                    backendRouteList.length > 0 && <Route path='*' element={<NoPermission />} />
                }
            </Routes>
        </Spin>
    )
}

const mapStateToProps = ({ LoadingReducer: { isLoading } }) => {
    return {
        isLoading
    }
}

export default connect(mapStateToProps)(NewsRouter)