import React from 'react'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from '../../../components/publish-manage/usePublish'

export default function Archived() {

  const {dataSource} = usePublish(3)

  return (
    <div>
      <NewsPublish dataSource={dataSource}/>
    </div>
  )
}
