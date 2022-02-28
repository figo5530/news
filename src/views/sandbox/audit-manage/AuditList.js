import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Table, Tag, notification } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function AuditList() {

  let navigate = useNavigate()
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
        const colorList = ['', 'orange', 'green', 'red']
        const auditList = ["Unaudited", "Auditing", "Approved", "Disapproved"]
        return <Tag color={colorList[auditState]}>{auditList[auditState]}</Tag>
      }
    },
    {
      title: 'Operation',
      render: (item) => {
        return (
          <div>
            {
              item.auditState === 1 && <Button type='secondary' onClick={() => handleWithdraw(item)}>Withdraw</Button>
            }
            {
              item.auditState === 2 && <Button type='primary'>&nbsp; Publish &nbsp;</Button>
            }
            {
              item.auditState === 3 && <Button danger onClick={() => handleUpdate(item)}>&nbsp; Update &nbsp;</Button>
            }
          </div>
        )
      }
    }
  ]

  const handleWithdraw = item => {
    setDataSource(dataSource.filter(data => data.id !== item.id))
    axios.patch(`http://localhost:5000/news/${item.id}`, {
      auditState: 0
    }).then(res => {
      notification.info({
        message: "Notification",
        description: `Now you can check your press in Draft Box`,
        placement: "bottomRight"
      })
    })
  }

  const handleUpdate = item => {
    navigate(`/news-manage/news/update/${item.id}`)
  }

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey={item => item.id} pagination={{ pageSize: 5 }}></Table>
    </div>
  )
}
