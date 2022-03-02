import { useEffect, useState } from 'react'
import axios from 'axios'
import { notification } from 'antd'

function usePublish(type) {
    const { username } = JSON.parse(localStorage.getItem("token"))
    const [dataSource, setDataSource] = useState([])

    const handlePublish = id => {
      setDataSource(dataSource.filter(data => data.id !== id))
      axios.patch(`http://localhost:5000/news/${id}`, {
        publishState: 2,
        publishTime: Date.now()
      }).then(res => {
        notification.info({
          message: "Notification",
          description: "Your press has been published now!",
          placement: "bottomRight"
        })
      })
    }

    const handleArchive = id => {
      setDataSource(dataSource.filter(data => data.id !== id))
      axios.patch(`http://localhost:5000/news/${id}`, {
        publishState: 3,
      }).then(res => {
        notification.info({
          message: "Notification",
          description: "Your press has been archived now!",
          placement: "bottomRight"
        })
      })
    }

    const handleDelete = id => {
      setDataSource(dataSource.filter(data => data.id !== id))
      axios.delete(`http://localhost:5000/news/${id}`).then(res => {
        notification.info({
          message: "Notification",
          description: "Your press has been deleted now!",
          placement: "bottomRight"
        })
      })
    }

    useEffect(() => {
      axios.get(`http://localhost:5000/news?${username}&publishState=${type}&_expand=category`).then(res => {
        setDataSource(res.data)
      })
    }, [username,type])
    return {
        dataSource,
        handlePublish,
        handleArchive,
        handleDelete
    }
}

export default usePublish