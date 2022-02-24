import { Table, Button, Modal, Tree } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {UnorderedListOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons'

export default function RoleList() {

  const [dataSource, setDataSource] = useState([])
  const [rightList, setRightList] = useState([])
  const [currentRights, setCurrentRights] = useState([])
  const [currentId, setCurrentId] = useState(0)
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
            <Button type='primary' shape='circle' icon={<UnorderedListOutlined />} style={{marginRight: '5px'}} onClick={() => {
              setIsModalVisible(true)
              setCurrentRights(item.rights)
              setCurrentId(item.id)
            }}/>
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
  
  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then(res => {
      setRightList(res.data)
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
    setIsModalVisible(false)
    //update current right
    setDataSource(dataSource.map(item => {
      if(item.id === currentId) {
        return {
          ...item,
          rights: currentRights
        }
      }
      return item
    }))
    //patch
    axios.patch(`http://localhost:5000/roles/${currentId}`, {
      rights: currentRights
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleCheck = (checkKeys) => {
    setCurrentRights(checkKeys.checked)
  }

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey={item => item.id}></Table>

      <Modal title="Role" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Tree checkable treeData={rightList} checkedKeys={currentRights} onCheck={handleCheck} checkStrictly={true}/>
      </Modal>
      
    </div>
  )
}
