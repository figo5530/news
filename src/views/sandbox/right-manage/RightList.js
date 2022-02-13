import { Table, Tag, Button, Modal, Popover, Switch } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons'

export default function RightList() {

  const { confirm } = Modal
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then(res => {
      let list = res.data
      list.forEach(l => {
        if(l.children.length === 0) l.children = ''
      })
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
      render: (item) => {
        return (
          <div>
            <Popover content={<div style={{textAlign: "center"}}>
              <Switch></Switch>
            </div>} title="Configuration" trigger={item.pagepermission === undefined ? "" : "click"}>
              <Button type='primary' shape='circle' icon={<EditOutlined />} disabled={item.pagepermission === undefined}/>
            </Popover>
            <Button danger  shape='circle' icon={<DeleteOutlined onClick={() => showConfirm(item)}/>}/>
          </div>
        )
      }
    },
  ];

  const showConfirm = (item) => {
    confirm({
      title: 'Do you Want to delete this right?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      onOk() {
        // console.log('OK');
        deleteMethod(item)
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }

  const deleteMethod = (item) => {
    if(item.grade === 1) {
      setDataSource(dataSource.filter(data => data.id !== item.id))
      axios.delete(`http://localhost:5000/rights/${item.id}`)
    } else {
      let list = dataSource.filter(data => data.id === item.rightId)
      list[0].children = list[0].children.filter(data => data.id !== item.id)
      setDataSource([...dataSource])
      axios.delete(`http://localhost:5000/children/${item.id}`)
    }
    
  }

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
