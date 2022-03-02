import React from 'react'
import { Table } from 'antd'


export default function NewsPublish(props) {
    const { dataSource, button } = props
    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            render: (title, item) => {
                return <a href={`#/news-manage/news/preview/${item.id}`}>{title}</a>
            }
        },
        {
            title: "Author",
            dataIndex: "author",
        },
        {
            title: "Category",
            dataIndex: "category",
            render: category => {
                return <div>{category.title}</div>
            }
        },
        {
            title: "Operation",
            render: (item) => {
                return (
                    <div>
                        {button(item.id)}
                    </div>
                )
            }
        },
    ]

    return (
        <div>
            <Table
                dataSource={dataSource}
                columns={columns}
                rowKey={item => item.id}
                pagination={{
                    pageSize: 5
                }}
            >

            </Table>
        </div>
    )
}
