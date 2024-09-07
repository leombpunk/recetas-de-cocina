import { useState } from "react"
import { useContextNotification } from "../providers/NotificationProvider"
import FilesServices from "../services/Files"

const useFiles = () => {
  const [files, setFiles] = useState(null)
  const { addNotification } = useContextNotification()

  const getFile = () => {} //este no, porque no hay descarga

  const getFiles = () => {} //este no, porque no hay descarga

  const uploadFiles = async (idReceta, file) => {
    try {
      const result = await FilesServices.uploadFile(idReceta, file)
      console.log(result)
      if (result.status >= 200 & result.status < 300) {
        setFiles(file)
        addNotification({message:"Archivo subido correctamente.",type:"success"})
        return files
      }
      else {
        addNotification({message:"Algo a salido mal.",type:"error"})
        return result
      }
    } catch (error) {
      return error
    }
  }

  const deleteFiles = async (idReceta, idUsuario, filename) => {
    try {
    } catch (error) {}
  }

  return { files, uploadFiles, deleteFiles }
}

export default useFiles
