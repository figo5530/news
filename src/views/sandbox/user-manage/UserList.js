import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Button, Switch, Table, Modal } from 'antd'
import { UnorderedListOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import UserForm from '../../../components/user-manage/UserForm';


export default function UserList() {

  const [dataSource, setDataSource] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [isUpdateVisible, setIsUpdateVisible] = useState(false)
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(false)
  const [roleList, setRoleList] = useState([])
  const [regionList, setRegionList] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const addForm = useRef(null)
  const updateForm = useRef(null)
  const { confirm } = Modal
  const {roleId, region, username} = JSON.parse(localStorage.getItem("token"))

  useEffect(() => {
    axios.get("http://localhost:5000/users?_expand=role").then(res => {
      setDataSource(roleId === 1 ? res.data : [...res.data.filter(item => item.username === username), ...res.data.filter(item => item.region === region && item.roleId === 3)])
    })
  }, [roleId, region, username])

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
      filters: [
        ...regionList.map(item => ({
          text: item.title,
          value: item.value
        })),
        {
          text: "Global",
          value: ""
        }
      ],
      onFilter: (value, item) => item.region === value,
      render: (region) => {
        return <b>{region === "" ? "Global" : region}</b>
      }
    },
    {
      title: 'Role',
      dataIndex: 'role',
      filters: [
        ...roleList.map(item => ({
          text: item.roleName,
          value: item.roleName
        }))
      ],
      onFilter: (value, item) => item.role.roleName === value,
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
        return <Switch checked={roleState} disabled={item.default} onChange={() => handleChange(item)}></Switch>
      }
    },
    {
      title: 'Operation',
      render: (item) => {
        return (
          <div>
            <Button type='primary' shape='circle' icon={<UnorderedListOutlined />} style={{ marginRight: '5px' }} disabled={item.default} onClick={() => handleUpdate(item)}/>
            <Button danger shape='circle' icon={<DeleteOutlined />} style={{ marginLeft: '5px' }} disabled={item.default} onClick={() => showConfirm(item)} />
          </div>
        )
      }
    }
  ]

  const handleUpdate = item => {
    setTimeout(() => {
      setIsUpdateVisible(true)
      if(item.roleId === 1) {
        setIsUpdateDisabled(true)
      }else {
        setIsUpdateDisabled(false)
      }
      updateForm.current.setFieldsValue(item)
    }, 0)
    setCurrentUser(item)
  }

  const handleChange = item => {
    item.roleState = !item.roleState
    setDataSource([...dataSource])

    axios.patch(`http://localhost:5000/users/${item.id}`, {
      roleState: item.roleState
    })
  }

  const showConfirm = (item) => {
    confirm({
      title: 'Do you Want to delete this user?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      onOk() {
        deleteMethod(item)
      },
      onCancel() {
      },
    });
  }

  const deleteMethod = item => {
    setDataSource(dataSource.filter(data => data.id !== item.id))
    axios.delete(`http://localhost:5000/users/${item.id}`)
  }

  const handleAddForm = () => {
    addForm.current.validateFields().then(value => {
      setIsVisible(false)
      addForm.current.resetFields()
      axios.post(`http://localhost:5000/users`, {
        ...value,
        "roleState": true,
        "default": false
      }).then(res => {
        setDataSource([...dataSource, {
          ...res.data,
          role: roleList.filter(item => item.id === value.roleId)[0]
        }])
      })
    }).catch(err => {
      console.log(err)
    })
  }

  const handleUpdateForm = () => {
    updateForm.current.validateFields().then(value => {
      setIsUpdateVisible(false)
      setDataSource(dataSource.map(item => {
        if(item.id === currentUser.id) {
          return {
            ...item,
            ...value,
            role: roleList.filter(data => data.id === value.roleId)[0]
          }
        }
        return item
      }))
      setIsUpdateDisabled(!isUpdateDisabled)

      axios.patch(`http://localhost:5000/users/${currentUser.id}`, value)
    })
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
        onOk={() => handleAddForm()}
      >
        <UserForm regionList={regionList} roleList={roleList} ref={addForm}/>
      </Modal>
      
      <Modal
        visible={isUpdateVisible}
        title="Update User"
        okText="Update"
        cancelText="Cancel"
        onCancel={() => {
          setIsUpdateVisible(false)
          setIsUpdateDisabled(!isUpdateDisabled)
        }}
        onOk={() => handleUpdateForm()}
      >
        <UserForm regionList={regionList} roleList={roleList} ref={updateForm} isUpdate={true} isUpdateDisabled={isUpdateDisabled}/>
      </Modal>
    </div>

  )
}
