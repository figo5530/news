import { Table, Button, Modal } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

export default function NewsCategory() {

  const { confirm } = Modal
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/categories").then(res => {
      setDataSource(res.data)
    })
  }, [])

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
      title: 'Category',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Operation',
      render: (item) => {
        return (
          <div>
            <Button danger shape='circle' icon={<DeleteOutlined onClick={() => showConfirm(item)} />} style={{ marginLeft: '5px' }} />
          </div>
        )
      }
    },
  ];

  const showConfirm = (item) => {
    confirm({
      title: 'Do you Want to delete this category?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      onOk() {
        deleteMethod(item)
      },
      onCancel() {
      },
    });
  }

  const deleteMethod = (item) => {
      setDataSource(dataSource.filter(data => data.id !== item.id))
      axios.delete(`http://localhost:5000/categories/${item.id}`)
  }

  return (
    <div>
      <Table dataSource={dataSource} rowKey={(item) => item.id} columns={columns} pagination={
        {
          pageSize: 5
        }
      } />;
    </div>
  )
}
