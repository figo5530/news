import React, { useEffect, useState } from 'react'
import { PageHeader, Descriptions } from 'antd';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import moment from 'moment'

export default function NewsPreview() {

  let location = useLocation()
  const [newsInfo, setNewsInfo] = useState(null)
  useEffect(() => {
    axios.get(`http://localhost:5000/news/${location.pathname.split("/")[4]}?_expand=category&_expand=role`).then(res => {
      console.log(res.data)
      setNewsInfo(res.data)
    })
  }, [location.pathname])

  const auditList = ["Unaudited", "Audited", "Approved", "Disapproved"]
  const publishList = ["Unpublished", "Waiting", "Published", "Archived"]
  return (
    <div>
      {
        newsInfo && <PageHeader
          onBack={() => window.history.back()}
          title={newsInfo.title}
          subTitle={newsInfo.category.title}
        >
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="Creator">{newsInfo?.author}</Descriptions.Item>
            <Descriptions.Item label="Creation Time">{moment(newsInfo.createTime).format("MM/DD/YYYY HH:mm:ss")}</Descriptions.Item>
            <Descriptions.Item label="Publish Time">{newsInfo.publishTime ? moment(newsInfo.createTime).format("MM/DD/YYYY HH:mm:ss") : "-"}</Descriptions.Item>
            <Descriptions.Item label="Region">{newsInfo.region}</Descriptions.Item>
            <Descriptions.Item label="Audit Status"><span style={{ color: "red" }}>{auditList[newsInfo.auditState]}</span></Descriptions.Item>
            <Descriptions.Item label="Publish Status"><span style={{ color: "red" }}>{publishList[newsInfo.publishState]}</span></Descriptions.Item>
            <Descriptions.Item label="Viewed">{newsInfo.view}</Descriptions.Item>
            <Descriptions.Item label="Stars">{newsInfo.star}</Descriptions.Item>
            <Descriptions.Item label="Comments">0</Descriptions.Item>

          </Descriptions>
        </PageHeader>
      }
    </div>
  )
}
