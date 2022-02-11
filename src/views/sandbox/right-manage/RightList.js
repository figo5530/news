import { Table, Tag, Button } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'

export default function RightList() {

  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then(res => {
      let list = res.data
      list[0].children = ''
      setDataSource(list)
    })
  },[])

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
      title: 'Right Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Right Path',
      dataIndex: 'key',
      key: 'key',
      render: key => {
        return <Tag color="green">{key}</Tag>
      }
    },
    {
      title: 'Operation',
      render: () => {
        return (
          <div>
            <Button type='primary' shape='circle' icon={<EditOutlined />}/>
            <Button danger  shape='circle' icon={<DeleteOutlined />}/>
          </div>
        )
      }
    },
  ];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={
        {
          pageSize: 5
        }
      } />;
    </div>
  )
}
