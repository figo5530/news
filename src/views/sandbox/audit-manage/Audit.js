import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, notification, Table } from 'antd'

export default function Audit() {

  const [dataSource, setDataSource] = useState([])
  const { roleId, region, username } = JSON.parse(localStorage.getItem("token"))
  useEffect(() => {
    axios.get("http://localhost:5000/news?auditState=1&_expand=category").then(res => {
      const list = res.data
      setDataSource(roleId === 1 ? list : [
        ...list.filter(item => item.author === username),
        ...list.filter(item => item.region === region && item.roleId === 3)
      ])
    })
  }, [region, roleId, username])

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
      title: 'Operation',
      render: (item) => {
        return (
          <div>
            <Button onClick={() => handleAudit(item)}>Approve</Button>
            <Button onClick={() => handleReject(item)}>Reject</Button>
          </div>
        )
      }
    }
  ]

  const handleAudit = item => {
    setDataSource(dataSource.filter(data => data.id !== item.id))
    axios.patch(`http://localhost:5000/news/${item.id}`, {
      auditState: 2,
      publishState: 1
    }).then(res => {
      notification.info({
        message: "Notification",
        description: `Now you can check your press in News`,
        placement: "bottomRight"
      })
    })
  }
  
  const handleReject = item => {
    setDataSource(dataSource.filter(data => data.id !== item.id))
    axios.patch(`http://localhost:5000/news/${item.id}`, {
      auditState: 3,
      publishState: 0
    }).then(res => {
      notification.info({
        message: "Notification",
        description: `Now you can check your press in Draft Box`,
        placement: "bottomRight"
      })
    })
  }

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey={item => item.id} pagination={{ pageSize: 5 }}></Table>
    </div>
  )
}
