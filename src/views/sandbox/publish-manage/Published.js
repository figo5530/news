import React from 'react'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from '../../../components/publish-manage/usePublish'
import { Button } from 'antd'

export default function Published() {

  const {dataSource} = usePublish(2)

  return (
    <div>
      <NewsPublish dataSource={dataSource} button={<Button danger>Archive</Button>}/>
    </div>
  )
}
