import React from 'react';
import { Layout, Menu } from 'antd'
import {
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons';
import './SideMenu.css'
import MenuItem from 'antd/lib/menu/MenuItem';
const { Sider } = Layout
const { SubMenu } = Menu
const menuList = [
  {
    key: '/home',
    title: 'Home',
    icon: <UserOutlined />
  },
  {
    key: '/user-manage',
    title: 'User Administration',
    icon: <SettingOutlined />,
    children: [
      {
        key: '/user-manage/list',
        title: 'User List',
        icon: <UserOutlined />
      },
    ]
  },
  {
    key: '/right-manage',
    title: 'Right Administration',
    icon: <SettingOutlined />,
    children: [
      {
        key: '/right-manage/role/list',
        title: 'Role List',
        icon: <UserOutlined />
      },
      {
        key: '/right-manage/right/list',
        title: 'Right List',
        icon: <UserOutlined />
      },
    ]
  }
]

export default function SideMenu() {
  const renderMenu = (list) => {
    return list.map(item => {
      if(item.children) {
        return <SubMenu key={item.key} title={item.title} icon={item.icon}>
                  {renderMenu(item.children)}
              </SubMenu>
      }else {
        return <MenuItem key={item.key} icon={item.icon}>{item.title}</MenuItem>
      }
    })
  }
  
  return (
    <Sider trigger={null} collapsible collapsed={false}>
    <div className="logo">News System</div>
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      {renderMenu(menuList)}
    </Menu>
  </Sider>
  )
}
