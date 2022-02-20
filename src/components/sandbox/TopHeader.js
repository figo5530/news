import React, { useState } from 'react';
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
const { Header } = Layout;

export default function TopHeader() {
  const [collapsed, setCollapsed] = useState(false)
  const changeCollapsed = () => {
    setCollapsed(!collapsed)
  }
  let navigate = useNavigate()
  const menu = (
    <Menu>
      <Menu.Item key="1">
          Administration
      </Menu.Item>
      
      <Menu.Item key="2" danger onClick={() => {
        localStorage.removeItem("token")
        navigate('/login')
      }}>
        Sign out
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      
      {
        collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed}/> : <MenuFoldOutlined onClick={changeCollapsed}/>
      }

      <div style={{float : 'right'}}>
        Welcome back admin
        <Dropdown overlay={menu}>
          {/* <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            Hover me <DownOutlined />
          </a> */}
          <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
        </Dropdown>
      </div>
    </Header>
  )
}
