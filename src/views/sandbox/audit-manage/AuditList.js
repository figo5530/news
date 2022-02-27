import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'antd'

export default function AuditList() {

  const { username } = JSON.parse(localStorage.getItem("token"))
  const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:5000/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`).then(res => {
      setDataSource(res.data)
    })
  }, [username])

  const columns = [
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
      title: 'Audit State',
      dataIndex: 'auditState',
      key: 'auditState',
      render: auditState => {
        return <div>{auditState}</div>
      }
    },
    {
      title: 'Operation',
      render: (item) => {
        return (
          <div>
            <Button type='primary'>Publish</Button>
          </div>
        )
      }
    }
  ]
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey={item => item.id} pagination={{ pageSize: 5 }}></Table>
    </div>
  )
}
