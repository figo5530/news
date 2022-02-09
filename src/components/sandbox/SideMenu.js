import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd'
// import {
//   UserOutlined,
//   SettingOutlined
// } from '@ant-design/icons';
import './SideMenu.css'
import { useNavigate } from 'react-router-dom'
import MenuItem from 'antd/lib/menu/MenuItem';
import axios from 'axios'

const { Sider } = Layout
const { SubMenu } = Menu
// const menuList = [
//   {
//     key: '/home',
//     title: 'Home',
//     icon: <UserOutlined />
//   },
//   {
//     key: '/user-manage',
//     title: 'User Administration',
//     icon: <SettingOutlined />,
//     children: [
//       {
//         key: '/user-manage/list',
//         title: 'User List',
//         icon: <UserOutlined />
//       },
//     ]
//   },
//   {
//     key: '/right-manage',
//     title: 'Right Administration',
//     icon: <SettingOutlined />,
//     children: [
//       {
//         key: '/right-manage/role/list',
//         title: 'Role List',
//         icon: <UserOutlined />
//       },
//       {
//         key: '/right-manage/right/list',
//         title: 'Right List',
//         icon: <UserOutlined />
//       },
//     ]
//   }
// ]

function SideMenu(props) {
  
  let navigate = useNavigate()

  const [menu, setMenu] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then(res => {
      console.log(res.data)
      setMenu(res.data)
    })
  }, [])

  const checkPagePermission = item => {
    return item.pagepermission
  }

  const renderMenu = (list) => {
    return list.map(item => {
      if(item.children && checkPagePermission(item)) {
        return <SubMenu key={item.key} title={item.title} icon={item.icon}>
                  {renderMenu(item.children)}
              </SubMenu>
      }else {
        return checkPagePermission(item) && <MenuItem key={item.key} icon={item.icon} onClick={() => {
          navigate(item.key)
        }}>{item.title}</MenuItem>
      }
    })
  }

  return (
    <Sider trigger={null} collapsible collapsed={false}>
    <div className="logo">News System</div>
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      {renderMenu(menu)}
    </Menu>
  </Sider>
  )
}
export default SideMenu