import { Table, Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {UnorderedListOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons'

export default function RoleList() {

  const [dataSource, setDataSource] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { confirm } = Modal
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: id => {
        return <b>{id}</b>
      }
    },
    {
      title: 'Role Name',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: 'Operation',
      render: (item) => {
        return (
          <div>
            <Button type='primary' shape='circle' icon={<UnorderedListOutlined />} style={{marginRight: '5px'}} onClick={() => setIsModalVisible(true)}/>
            <Button danger  shape='circle' icon={<DeleteOutlined />} onClick={() => showConfirm(item)} style={{marginLeft: '5px'}}/>
          </div>
        )}
    }
  ]

  useEffect(() => {
    axios.get("http://localhost:5000/roles").then(res => {
      setDataSource(res.data)
    })
  }, [])

  const showConfirm = (item) => {
    confirm({
      title: 'Do you Want to delete this role?',
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
    axios.delete(`http://localhost:5000/roles/${item.id}`)
  }

  const handleOk = () => {

  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey={item => item.id}></Table>

      <Modal title="Role" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      
    </div>
  )
}
