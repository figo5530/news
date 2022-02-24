import React, { useEffect, useState } from 'react'
import { PageHeader, Descriptions } from 'antd';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


export default function NewsPreview() {

  let location = useLocation()
  const [newsInfo, setNewsInfo] = useState(null)
  useEffect(() => {
    axios.get(`http://localhost:5000/news/${location.pathname.split("/")[4]}?_expand=category&_expand=role`).then(res => {
      setNewsInfo(res.data)
    })
  }, [location.pathname])

  return (
    <div>
      <PageHeader
        onBack={() => window.history.back()}
        title="Title"
        subTitle="This is a subtitle"
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Creator">Lili Qu</Descriptions.Item>
          <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
          <Descriptions.Item label="Publish Time">2017-10-10</Descriptions.Item>
          <Descriptions.Item label="Region">2017-10-10</Descriptions.Item>
          <Descriptions.Item label="Audit Status">2017-10-10</Descriptions.Item>
          <Descriptions.Item label="Publish Status">2017-10-10</Descriptions.Item>
          <Descriptions.Item label="Viewd">2017-10-10</Descriptions.Item>
          <Descriptions.Item label="Stars">2017-10-10</Descriptions.Item>
          <Descriptions.Item label="Comments">2017-10-10</Descriptions.Item>
          
        </Descriptions>
      </PageHeader>
    </div>
  )
}
