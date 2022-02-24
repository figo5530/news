import { Table, Button } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DeleteOutlined, ToTopOutlined, EditOutlined } from '@ant-design/icons'

export default function NewsDraft() {
  const [dataSource, setDataSource] = useState([])
  const { username } = JSON.parse(localStorage.getItem("token"))

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
            <Button type='secondary' shape='circle' icon={<EditOutlined />} style={{ marginRight: '5px' }} />
            <Button danger shape='circle' icon={<DeleteOutlined />} style={{ marginLeft: '5px', marginRight: '5px' }} />
            <Button type='primary' shape='circle' icon={<ToTopOutlined />} style={{ marginLeft: '5px', marginRight: '5px' }} />
          </div>
        )
      }
    }
  ]

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey={item => item.id} pagination={{pageSize: 5}}></Table>
    </div>
  )
}
