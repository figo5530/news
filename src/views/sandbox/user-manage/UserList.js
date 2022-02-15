import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Switch, Table, Modal, Form, Input, Select } from 'antd'
import { UnorderedListOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'


export default function UserList() {

  const [dataSource, setDataSource] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [roleList, setRoleList] = useState([])
  const [regionList, setRegionList] = useState([])
  const { confirm } = Modal
  const { Option } = Select

  useEffect(() => {
    axios.get("http://localhost:5000/users?_expand=role").then(res => {
      setDataSource(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:5000/roles").then(res => {
      setRoleList(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:5000/regions").then(res => {
      setRegionList(res.data)
    })
  }, [])

  const columns = [
    {
      title: 'region',
      dataIndex: 'region',
      render: (region) => {
        return <b>{region === "" ? "Global" : region}</b>
      }
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: (role) => {
        return role?.roleName
      }
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'State',
      dataIndex: 'roleState',
      render: (roleState, item) => {
        return <Switch checked={roleState} disabled={item.default}></Switch>
      }
    },
    {
      title: 'Operation',
      render: (item) => {
        return (
          <div>
            <Button type='primary' shape='circle' icon={<UnorderedListOutlined />} style={{ marginRight: '5px' }} disabled={item.default} />
            <Button danger shape='circle' icon={<DeleteOutlined />} style={{ marginLeft: '5px' }} disabled={item.default} onClick={() => showConfirm(item)} />
          </div>
        )
      }
    }
  ]

  const showConfirm = (item) => {
    confirm({
      title: 'Do you Want to delete this user?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      onOk() {
        // deleteMethod(item)
      },
      onCancel() {
      },
    });
  }

  return (
    <div>
      <Button type='primary' style={{ marginBottom: '10px' }} onClick={() => setIsVisible(true)}>Create User</Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={item => item.id}
        pagination={{
          pageSize: 5
        }}
      >
      </Table>

      <Modal
        visible={isVisible}
        title="Create User"
        okText="Create"
        cancelText="Cancel"
        onCancel={() => setIsVisible(false)}
        onOk={() => {
          console.log("add")
        }}
      >
        <Form
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input the username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input the password!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="reigon"
            label="Reigon"
            rules={[{ required: true, message: 'Please select the reigon!' }]}
          >
            <Select>
              {regionList.map(item => <Option value={item.value} key={item.id}>{item.title}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item
            name="roleId"
            label="Role"
            rules={[{ required: true, message: 'Please select the role!' }]}
          >
            <Select>
              {roleList.map(item => <Option value={item.id} key={item.id}>{item.roleName}</Option>)}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>

  )
}
