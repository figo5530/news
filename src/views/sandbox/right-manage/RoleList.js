import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios'

export default function RoleList() {

  const [dataSource, setDataSource] = useState([])
  const columns = []
  useEffect(() => {
    axios.get("http://localhost:5000/roles").then(res => {
      console.log(res.data)
    })
  }, [])

  return (
    <div>
      <Table dataSource={dataSource} columns={columns}></Table>
    </div>
  )
}
