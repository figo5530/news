import React from 'react';
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
const { Header } = Layout;

function TopHeader(props) {
  const changeCollapsed = () => {
    props.changeCollapsed()
  }
  let navigate = useNavigate()
  const { role: { roleName }, username } = JSON.parse(localStorage.getItem("token"))
  const menu = (
    <Menu>
      <Menu.Item key="1">
        {roleName}
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
        props.isCollapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />
      }

      <div style={{ float: 'right' }}>
        <span>Welcome back, <span style={{ color: "#1890ff" }}> {username} </span></span>
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

const mapStateToProps = ({CollapsedReducer: {isCollapsed}}) => {
  return {
    isCollapsed
  }
}

const mapDispatchToProps = {
  changeCollapsed() {
    return {
      type: "change_collapsed",
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader)