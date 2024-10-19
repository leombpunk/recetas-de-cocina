import axios from "axios"
import { RoutesAPI } from "../utils/RoutesAPI"
import { getToken } from "../utils/Token"

const getPerfil = async (username) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const url = `${RoutesAPI.profile}/perfil/${username}`
  const request = axios.get(url, config)
  return request.then((response) => response)
}

const updatePerfil = async (username, data) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const url = `${RoutesAPI.profile}/perfil/${username}`
  const request = axios.put(url, data, config)
  return request.then((response) => response)
}

const deletePerfil = async (username) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const url = `${RoutesAPI.profile}/${username}`
  const request = axios.get(url, config)
  return request.then((response) => response)
}

const updatePhoto = async (username, data) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const url = `${RoutesAPI.profile}/${username}`
  const request = axios.get(url, config)
  return request.then((response) => response)
}

const deletePhoto = async (username) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const url = `${RoutesAPI.profile}/${username}`
  const request = axios.get(url, config)
  return request.then((response) => response)
}

const ProfileServices = {
  getPerfil,
  updatePerfil,
  deletePerfil,
  updatePhoto,
  deletePhoto,
}

export default ProfileServices
