import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NewsPublish from '../../../components/publish-manage/NewsPublish'

export default function Unpublished() {

  const { username } = JSON.parse(localStorage.getItem("token"))
  const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:5000/news?${username}&publishState=1&_expand=category`).then(res => {
      setDataSource(res.data)
    })
  }, [username])

  return (
    <div>
      {/* Unpublished state = 1 */}
      <NewsPublish dataSource={dataSource}/>
    </div>
  )
}
