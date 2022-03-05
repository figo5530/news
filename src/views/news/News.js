import { PageHeader, Card, Col, Row, List } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import _ from 'lodash'

function News() {

    const [list, setList] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/news?publishState=2&_expand=category").then(res => {
            const data = Object.entries(_.groupBy(res.data, item => item.category.title))
            setList(data)
        })
    }, [])

    return (
        <div style={{ width: "95%", margin: "0 auto" }}>
            <PageHeader
                className='site-page-header'
                title="News Home"
                subTitle="Extra!!"
            />
            <div className="site-card-wrapper">
                <Row gutter={[16, 16]}>
                    {list.map(item => {
                        return (
                            <Col span={8} key={item[0]}>
                                <Card title={item[0]} bordered={true} hoverable={true} >
                                    <List
                                        size="small"
                                        bordered
                                        dataSource={item[1]}
                                        renderItem={news => <List.Item><a href={`#/detail/${news.id}`}>{news.title}</a></List.Item>}
                                        pagination={{ pageSize: 3 }}
                                    />
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </div>
        </div>
    )
}

export default News