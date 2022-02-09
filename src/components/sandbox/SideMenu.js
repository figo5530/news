import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd'
import {
  UserOutlined,
  SettingOutlined,
  AuditOutlined,
  FileSearchOutlined,
  HomeOutlined,
  SendOutlined,
  FieldTimeOutlined,
  PaperClipOutlined
} from '@ant-design/icons';
import './SideMenu.css'
import { useNavigate } from 'react-router-dom'
import MenuItem from 'antd/lib/menu/MenuItem';
import axios from 'axios'

const { Sider } = Layout
const { SubMenu } = Menu


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

  const iconList = {
    "/home" : <HomeOutlined />,
    "/user-manage" : <SettingOutlined />,
    "/right-manage" : <SettingOutlined />,
    "/news-manage" : <SettingOutlined />,
    "/audit-manage" : <SettingOutlined />,
    "/publish-manage" : <SettingOutlined />,
    "/user-manage/list" : <UserOutlined />,
    "/right-manage/role/list" : <UserOutlined />,
    "/right-manage/right/list" : <UserOutlined />,
    "/news-manage/news/write" : <SettingOutlined />,
    "/news-manage/news/draft" : <SettingOutlined />,
    "/news-manage/news/category" : <SettingOutlined />,
    "/audit-manage/audit/news" : <FileSearchOutlined />,
    "/audit-manage/audit/list" : <AuditOutlined />,
    "/publish-manage/unpublished" : <FieldTimeOutlined />,
    "/publish-manage/published" : <SendOutlined />,
    "/publish-manage/archived" : <PaperClipOutlined />,
  }

  const renderMenu = (list) => {
    return list.map(item => {
      if(item.children && checkPagePermission(item)) {
        return <SubMenu key={item.key} title={item.title} icon={iconList[item.key]}>
                  {renderMenu(item.children)}
              </SubMenu>
      }else {
        return checkPagePermission(item) && <MenuItem key={item.key} icon={iconList[item.key]} onClick={() => {
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