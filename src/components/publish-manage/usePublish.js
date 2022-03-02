import { useEffect, useState } from 'react'
import axios from 'axios'

function usePublish(type) {
    const { username } = JSON.parse(localStorage.getItem("token"))
    const [dataSource, setDataSource] = useState([])

    const handlePublish = id => {
      console.log(id)
    }

    const handleArchive = id => {
      console.log(id)
    }

    const handleDelete = id => {
      console.log(id)
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