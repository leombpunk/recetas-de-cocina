//mover aquí la logica sobre respuestas a comentarios del hook s
import { useState } from "react"
import CommentsServices from "../services/Comments"
import { useContextUser } from "../providers/UserProvider"
import { useContextNotification } from "../providers/NotificationProvider"

//estructura de datos para fucionar los hooks de comentarios y respuestas
//deberia probar a ver que resulta
//chatgpt me recomendo usar useReducer para el manejo de los estado cuando son muy complejos
//https://es.react.dev/reference/react/useReducer
export const data = {
  fetch: {
    loading: true,
    errors: [],
    data: [],
  },
  create: {
    errors: [],
    loading: true,
    result: {},
  },
  delete: {
    errors: [],
    loading: true,
    result: {},
  },
}

//Nota: no hace infinity scroll
const useReplys = () => {
  const { user } = useContextUser() //diria que esta al pepe
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState([])
  const [replys, setReplys] = useState([])
  const [lastReply, setLastReply] = useState({})
  const { addNotification } = useContextNotification()

  console.log({ replys: replys })

  const getLastReply = async (commentId) => {
    try {
      setLoading(true)
      const result = await CommentsServices.getLastReply(commentId)
      if (result.status === 200) {
        console.log(result)
        setLastReply(result.data.data)
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

  const createReply = async (commentId, reply) => {
    try {
      setLoading(true)
      const result = await CommentsServices.createReply(commentId, reply)
      console.log(result)
      if (result.status === 200) {
        addNotification({
          message: "Gracias por comentar! ❤️",
          type: "success",
        })
        let newReply = {
          id: result.data.data.id,
          idComentario: result.data.data.idComentario,
          respuesta: result.data.data.respuesta,
          createAt: result.data.data.createAt,
          usuario: {
            usuario: user.usuario,
            imagen: user.imagen,
            nombres: user.nombres,
            apellidos: user.apellidos,
          },
          mension: { usuario: reply.mension },
        }
        console.log({newReply: newReply})
        // agregar a última respuesta en ves de a la lista de respuestas?
        setReplys([newReply, ...replys])
      } else {
        setErrors([result])
      }
    } catch (error) {
      setErrors([error])
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const deleteReply = async (replyId) => {
    try {
      setLoading(true)
      const result = await CommentsServices.deleteReply(replyId)
      if (result.status === 200) {
        console.log(result)
        setReplys(replys.filter((reply) => reply.id !== replyId))
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
    lastReply,
    errors,
    loading,
    getReplys,
    getLastReply,
    createReply,
    deleteReply,
  }
}

export default useReplys
