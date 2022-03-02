import React from 'react'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from '../../../components/publish-manage/usePublish'
import { Button } from 'antd'

export default function Archived() {

  const { dataSource, handleDelete } = usePublish(3)

  return (
    <div>
      <NewsPublish
        dataSource={dataSource}
        button={id => {
          return <Button onClick={() => handleDelete(id)}
            danger
          >
            Delete
          </Button>
        }} />
    </div>
  )
}
