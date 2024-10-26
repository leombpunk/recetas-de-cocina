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
  return request.then((response) => response).catch((error) => error)
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
  return request.then((response) => response).catch((error) => error)
}

const deletePerfil = async (username) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const url = `${RoutesAPI.profile}/${username}`
  const request = axios.delete(url, config)
  return request.then((response) => response).catch((error) => error)
}

const updatePhoto = async (username, image) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const formData = new FormData()
  formData.append("file",image)

  const url = `${RoutesAPI.images}/usuario/${username}`
  const request = axios.post(url, formData, config)
  return request.then((response) => response).catch((error) => error)
}

const deletePhoto = async (username) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const url = `${RoutesAPI.images}/usuario/${username}`
  const request = axios.delete(url, config)
  return request.then((response) => response).catch((error) => error)
}

const updatePassword = async (data) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const url = `${RoutesAPI.profile}/perfil/changePass/`
  const request = axios.put(url, data, config)
  console.log(request)
  return request.then((response) => response).catch((error) => error)
}

const ProfileServices = {
  getPerfil,
  updatePerfil,
  deletePerfil,
  updatePhoto,
  deletePhoto,
  updatePassword,
}

export default ProfileServices
