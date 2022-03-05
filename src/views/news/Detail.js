import React, { useEffect, useState } from 'react'
import { PageHeader, Descriptions } from 'antd';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import moment from 'moment'
import { HeartTwoTone } from '@ant-design/icons'

export default function Detail() {

    let location = useLocation()
    const [newsInfo, setNewsInfo] = useState(null)
    useEffect(() => {
        axios.get(`http://localhost:5000/news/${location.pathname.split("/")[2]}?_expand=category&_expand=role`).then(res => {
            setNewsInfo({
                ...res.data,
                view: res.data.view + 1
            })
            return res.data
        }).then(res => {
            axios.patch(`http://localhost:5000/news/${location.pathname.split("/")[2]}`, {
                view: res.view + 1
            })
        })
    }, [location.pathname])

    const handleLike = () => {
        setNewsInfo({
            ...newsInfo,
            star: newsInfo.star + 1
        })
        axios.patch(`http://localhost:5000/news/${location.pathname.split("/")[2]}`, {
            star: newsInfo.star + 1
        })
    }

    return (
        <div>
            {
                newsInfo && <PageHeader
                    onBack={() => window.history.back()}
                    title={newsInfo.title}
                    subTitle={<div>
                        {newsInfo.category.title}
                        <span style={{ paddingLeft: "5px" }}><HeartTwoTone twoToneColor="#eb2f96" onClick={() => handleLike()} /></span>
                    </div>}
                >
                    <Descriptions size="small" column={3}>
                        <Descriptions.Item label="Creator">{newsInfo?.author}</Descriptions.Item>
                        <Descriptions.Item label="Publish Time">{newsInfo.publishTime ? moment(newsInfo.createTime).format("MM/DD/YYYY HH:mm:ss") : "-"}</Descriptions.Item>
                        <Descriptions.Item label="Region">{newsInfo.region}</Descriptions.Item>
                        <Descriptions.Item label="Viewed">{newsInfo.view}</Descriptions.Item>
                        <Descriptions.Item label="Stars">{newsInfo.star}</Descriptions.Item>
                        <Descriptions.Item label="Comments">0</Descriptions.Item>
                    </Descriptions>
                </PageHeader>
            }
            {
                newsInfo && <div style={{
                    margin: "0 24px"

                }} dangerouslySetInnerHTML={{
                    __html: newsInfo.content
                }}>

                </div>
            }

        </div>
    )
}
