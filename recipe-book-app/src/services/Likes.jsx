import axios from "axios"
import { RoutesAPI } from "../utils/RoutesAPI"
import { getToken } from "../utils/Token"

const getLikes = async (id) => {
  const url = `${RoutesAPI.likes}/${id}`
  const request = axios.get(url)
  return request.then((response) => response)
}

const getLikesDetails = async (id) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const url = `${RoutesAPI.likes}/details/${id}`
  const request = axios.get(url, config)
  return request.then((response) => response)
}

const postLike = async (id) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const url = `${RoutesAPI.likes}/${id}`
  const request = axios.post(url, {}, config)
  return request.then((response) => response)
}

const deleteLike = async (id) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const url = `${RoutesAPI.likes}/${id}`
  const request = axios.delete(url, config)
  return request.then((response) => response)
}

const LikeServices = { getLikes, getLikesDetails, postLike, deleteLike }

export default LikeServices
