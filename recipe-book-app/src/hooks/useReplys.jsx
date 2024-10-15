//mover aquí la logica sobre respuestas a comentarios del hook comments
import { useState } from "react"
import CommentsServices from "../services/Comments"
import { useContextUser } from "../providers/UserProvider"

const useReplys = () => {
  const { user } = useContextUser()
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState([])
  const [replys, setReplys] = useState([])

  const getReplys = async (commentId) => {
    try {
      setLoading(true)
      const result = await CommentsServices.getReplys(commentId)
      if (result.status === 200) {
        console.log(result)
        setReplys(result.data.data)
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

  return {
    replys,
    errors,
    loading,
    getReplys,
  }
}

export default useReplys
