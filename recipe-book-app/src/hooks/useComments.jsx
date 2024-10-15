import { useEffect, useState } from "react"
import CommentsServices from "../services/Comments"
import { useContextUser } from "../providers/UserProvider"

const useComments = (recipeId) => {
  const { user } = useContextUser()
  const [loading, setLoading] = useState(true)
  // const [loadingReplys, setLoadingReplys] = useState(false)
  const [loadingComment, setLoadingComment] = useState(false)
  const [errorsComment, setErrorsComment] = useState([])
  const [errors, setErrors] = useState([])
  const [comments, setComments] = useState([])
  // const [replys, setReplys] = useState([])
  // const [errorsReplys, setErrorsReply] = useState([])

  const fetchComments = async () => {
    try {
      setLoading(true)
      const result = await CommentsServices.getComments(recipeId)
      if (result.status === 200) {
        console.log(result)
        setComments(result.data.data)
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

  const getComments = async () => {
    try {
      setLoading(true)
      const result = await CommentsServices.getComments(recipeId)
      if (result.status === 200) {
        console.log(result)
        setComments(result.data.data)
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

  // const getReplys = async (commentId) => {
  //   try {
  //     setLoadingReplys(true)
  //     const result = await CommentsServices.getReplys(commentId)
  //     if (result.status === 200) {
  //       console.log(result)
  //       setReplys(result.data.data)
  //     } else {
  //       setErrorsReply([result])
  //     }
  //     setLoadingReplys(false)
  //   } catch (error) {
  //     setErrorsReply([error])
  //     setLoadingReplys(false)
  //   } finally {
  //     setLoadingReplys(false)
  //   }
  // }

  const createComment = async (comment) => {
    try {
      console.log(comment)
      setLoadingComment(true)
      const result = await CommentsServices.createComment(recipeId, comment)
      if (result.status === 200) {
        console.log(result.data)
        let newComment = result.data.data
        newComment.usuario = {
          nombres: user.nombres,
          apellidos: user.apellidos,
          imagen: user.imagen,
          usuario: user.usuario,
        }
        console.log({ newComment: newComment })
        setComments([newComment, ...comments]) //agrega el nuevo comentario para no hacer una petición al backend de nuevo
      } else {
        setErrorsComment([result])
      }
      setLoadingComment(false)
    } catch (error) {
      setErrorsComment([error])
      setLoadingComment(false)
    } finally {
      setLoadingComment(false)
    }
  }

  const deleteComment = async (commentId) => {
    try {
      setLoadingComment(true)
      const result = await CommentsServices.deleteComment(commentId)
      if (result) {
        setComments(comments.filter(comment => comment.id !== commentId))
      } else {
        setErrorsComment([result])
      }
      setLoadingComment(false)
    } catch (error) {
      setErrorsComment([error])
      setLoadingComment(false)
    } finally {
      setLoadingComment(false)
    }
  }

  useEffect(() => {
    fetchComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeId])

  return {
    loading,
    errors,
    comments,
    // loadingReplys,
    // errorsReplys,
    // replys,
    // getReplys,
    getComments, //para el infinity scroll
    createComment,
    deleteComment,
  }
}

export default useComments
