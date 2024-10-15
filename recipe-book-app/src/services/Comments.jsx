import axios from "axios"
import { RoutesAPI } from "../utils/RoutesAPI"
import { getToken } from "../utils/Token"

const getComments = async (recetaId) => {
  const url = `${RoutesAPI.coments}/${recetaId}`
  const request = axios.get(url)
  return request.then((response) => response)
}

const getReplys = async (commentId) => {
  const token = getToken()
  const config = {
    headers: {
      authorization: token
    }
  }
  const url = `${RoutesAPI.coments}/respuesta/${commentId}`
  const request = axios.get(url, config)
  return request.then((response) => response)
}

const createComment = async (recetaId, comment) => {
  const token = getToken()
  const config = {
    headers: {
      authorization: token
    }
  }
  const url = `${RoutesAPI.coments}/${recetaId}`
  const request = axios.post(url, comment, config)
  return request.then((response) => response)
}

const createReply = async (commentId, reply) => {
  const token = getToken()
  const config = {
    headers: {
      authorization: token
    }
  }
  const url = `${RoutesAPI.coments}/respuesta/${commentId}`
  const request = axios.post(url, reply,  config)
  return request.then((response) => response)
}

const deleteComment = async (commentId) => {
  const token = getToken()
  const config = {
    headers: {
      authorization: token
    }
  }
  const url = `${RoutesAPI.coments}/${commentId}`
  const request = axios.delete(url, config)
  return request.then((response) => response)
}

const deleteReply = async (replyId) => {
  const token = getToken()
  const config = {
    headers: {
      authorization: token
    }
  }
  const url = `${RoutesAPI.coments}/respuesta/${replyId}`
  const request = axios.delete(url, config)
  return request.then((response) => response)
}

const CommentsServices = {
  getComments,
  getReplys,
  createComment,
  createReply,
  deleteComment,
  deleteReply,
}

export default CommentsServices
