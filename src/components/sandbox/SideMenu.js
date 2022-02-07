import React from 'react';
import { Layout, Menu } from 'antd'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  SettingOutlined
} from '@ant-design/icons';
import './SideMenu.css'
const { Sider } = Layout
const { SubMenu } = Menu

export default function SideMenu() {
  
  return (
    <Sider trigger={null} collapsible collapsed={false}>
    <div className="logo">News System</div>
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item key="2" icon={<VideoCameraOutlined />}>
        nav 2
      </Menu.Item>
      <Menu.Item key="3" icon={<UploadOutlined />}>
        nav 3
      </Menu.Item>
      <SubMenu key="sub4" icon={<SettingOutlined />} title="User Administration">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu>
    </Menu>
  </Sider>
  )
}
