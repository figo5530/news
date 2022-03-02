import React from 'react'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from '../../../components/publish-manage/usePublish'
import { Button } from 'antd'

export default function Published() {

  const { dataSource, handleArchive } = usePublish(2)

  return (
    <div>
      <NewsPublish
        dataSource={dataSource}
        button={id => {
          return <Button onClick={() => handleArchive(id)}
            danger
            >
            Archive
          </Button>
        }} />
    </div>
  )
}
