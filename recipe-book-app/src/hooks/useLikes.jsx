import { useEffect, useState } from "react"
import LikeServices from "../services/Likes"

const useLikes = (id) => {
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)
  const [likes, setLikes] = useState({})
  const [errors, setErrors] = useState([])
  const [update, setUpdate] = useState(false)
  const [liked, setLiked] = useState(false)

  const fetchLikes = async () => {
    try {
      setLoading(true)
      const result = await LikeServices.getLikes(id)
      if (result.status === 200) {
        setCount(result.data.data.total_likes)
      } else {
        setErrors([result])
      }
      setLoading(false)
    } catch (error) {
      setErrors([error])
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLikes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, update])

  const getLikesDetails = async () => {
    try {
      setLoading(true)
      const result = await LikeServices.getLikesDetails(id)
      if (result.status === 200) {
        setLikes(result.data.data)
      } else {
        setErrors([result])
      }
      setLoading(false)
    } catch (error) {
      setErrors([error])
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const handleClickLike = () => {
    liked ? deleteLike() : postLike()
    console.log({ like: liked })
  }

  const postLike = async () => {
    try {
      setLoading(true)
      const result = await LikeServices.postLike(id)
      if (result.status === 200) {
        setCount(count + 1)
        setLiked(true)
        setUpdate(!update)
      } else {
        setErrors([result])
      }
      setLoading(false)
    } catch (error) {
      setErrors([error])
      setLoading(false)
      setLiked(false)
    } finally {
      setLoading(false)
    }
  }

  const deleteLike = async () => {
    try {
      setLoading(true)
      const result = await LikeServices.deleteLike(id)
      if (result.status === 200) {
        setCount(count - 1)
        setLiked(false)
        setUpdate(!update)
      } else {
        setErrors([result])
      }
      setLoading(false)
    } catch (error) {
      setErrors([error])
      setLoading(false)
      setLiked(false)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    count,
    likes,
    errors,
    liked,
    setLiked,
    handleClickLike,
    getLikesDetails,
  }
}

export default useLikes
