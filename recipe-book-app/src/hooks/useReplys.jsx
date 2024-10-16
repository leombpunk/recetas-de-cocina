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
    errors:[],
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
  }
}

//Nota: no hace infinity scroll
const useReplys = () => {
  const { user } = useContextUser() //diria que esta al pepe
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState([])
  const [replys, setReplys] = useState([])
  const { addNotification } = useContextNotification()

  const getReplys = async (Id) => {
    try {
      setLoading(true)
      const result = await CommentsServices.getReplys(Id)
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

  const createReply = async (Id, reply) => {
    try {
      setLoading(true)
      const result = await CommentsServices.createReply(Id, reply)
      // console.log(result)
      if (result.status === 200) {
        addNotification({message:"Gracias por comentar!", type:"success"})
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
    createReply,
    deleteReply,
  }
}

export default useReplys
