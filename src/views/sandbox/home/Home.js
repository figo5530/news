import React, { useEffect, useState } from 'react';
import { Card, Col, Row, List, Avatar, Drawer } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import Charts from './Charts';
import Pie from './Pie';
import axios from 'axios'
const { Meta } = Card

export default function Home() {
  const [viewList, setViewList] = useState([])
  const [starList, setStarList] = useState([])
  const [visible, setVisible] = useState(false)
  const { username, role: { roleName }, region } = JSON.parse(localStorage.getItem("token"))
  useEffect(() => {
    axios.get("http://localhost:5000/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6").then(res => {
      setViewList(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:5000/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6").then(res => {
      setStarList(res.data)
    })
  }, [])
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Most Viewed" bordered={true}>
            <List
              size="small"
              dataSource={viewList}
              renderItem={item => {
                return (
                  <List.Item>
                    <a href={`#/news-manage/news/preview/${item.id}`}>{item.title}</a>
                  </List.Item>
                )
              }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Most Liked" bordered={true}>
            <List
              size="small"
              dataSource={starList}
              renderItem={item => {
                return (
                  <List.Item>
                    <a href={`#/news-manage/news/preview/${item.id}`}>{item.title}</a>
                  </List.Item>
                )
              }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            cover={
              <img
                alt="bg"
                // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                src={process.env.PUBLIC_URL + '/bg.jpg'}

              />
            }
            actions={[
              <SettingOutlined key="setting" onClick={() => setVisible(true)} />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={username}
              description={
                <div>
                  <b>{region ? region : "Global"}</b>

                  <span style={{ paddingLeft: "30px" }}>{roleName}</span>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>
      <Drawer
        width="500px"
        title={`${username}'s category`}
        placement='right'
        closable={true}
        onClose={() => {
          setVisible(false)
        }}
        visible={visible}
      >
        <Pie username={username}/>
      </Drawer>
      <Charts />
    </div>
  )
}
