import axios from "axios"
import { getToken } from "../utils/Token"
import { RoutesAPI } from "../utils/RoutesAPI"

//datos -> params idReceta e idUsuario, en el body el archivo
const uploadFile = async (idReceta, file) => {
  const token = getToken()
  console.log({token:token})
  const config = {
    headers: {
      Authorization: token,
    },
  }

  const files = new FormData()
  files.append("file", file)

  const url = `${RoutesAPI.images}/receta/${idReceta}`
  const request = axios.post(url, files, config)
  return request.then((response) => response)
}

//datos nombre del archivo
const deleteFile = async (idReceta, filename) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }

  const url = `${RoutesAPI.images}/receta/${idReceta}/${filename}`
  const request = axios.delete(url, config)
  return request.then((response) => response)
}

const FilesServices = { uploadFile, deleteFile }

export default FilesServices