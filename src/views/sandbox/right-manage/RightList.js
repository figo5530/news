import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function RightList() {

  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/rights").then(res => {
      setDataSource(res.data)
    })
  },[])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
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
    },
    // {
    //   title: 'Operation',
    //   dataIndex: 'address',
    //   key: 'address',
    // },
  ];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  )
}
