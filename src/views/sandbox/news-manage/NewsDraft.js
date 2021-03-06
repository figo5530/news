import { Table, Button, Modal, notification } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DeleteOutlined, ToTopOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import {useNavigate} from 'react-router-dom'
export default function NewsDraft() {

  const [dataSource, setDataSource] = useState([])
  const { username } = JSON.parse(localStorage.getItem("token"))
  let navigate = useNavigate()
  const { confirm } = Modal

  useEffect(() => {
    axios.get(`http://localhost:5000/news?author=${username}&auditState=0&_expand=category`).then(res => {
      setDataSource(res.data)
    })
  }, [username])

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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title, item) => {
        return <a href={`#/news-manage/news/preview/${item.id}`}>{title}</a>
      }
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Catrgory',
      dataIndex: 'category',
      key: 'categoryId',
      render: category => {
        return category.title
      }
    },
    {
      title: 'Operation',
      render: (item) => {
        return (
          <div>
            <Button type='secondary' shape='circle' icon={<EditOutlined />} style={{ marginRight: '5px' }} onClick={() => navigate(`/news-manage/news/update/${item.id}`)} />
            <Button danger shape='circle' onClick={() => showConfirm(item)} icon={<DeleteOutlined />} style={{ marginLeft: '5px', marginRight: '5px' }} />
            <Button type='primary' shape='circle' icon={<ToTopOutlined />} style={{ marginLeft: '5px', marginRight: '5px' }} onClick={() => handleAudit(item.id)}/>
          </div>
        )
      }
    }
  ]

  const handleAudit = id => {
    axios.patch(`http://localhost:5000/news/${id}`, {
      auditState: 1
    }).then(res => {
      navigate('/audit-manage/audit/list')
      notification.info({
          message: "Notification",
          description: `Now you can check your press in Audit list`,
          placement: "bottomRight"
      })
  })
  }

  const showConfirm = (item) => {
    confirm({
      title: 'Do you Want to delete this news?',
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
    axios.delete(`http://localhost:5000/news/${item.id}`)
  }

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey={item => item.id} pagination={{ pageSize: 5 }}></Table>
    </div>
  )
}
