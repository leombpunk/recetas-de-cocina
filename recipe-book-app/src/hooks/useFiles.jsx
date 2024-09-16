import { useState } from "react"
import { useContextNotification } from "../providers/NotificationProvider"
import FilesServices from "../services/Files"

const useFiles = () => {
  const [files, setFiles] = useState(null)
  const { addNotification } = useContextNotification()

  // const getFile = () => {} //este no, porque no hay descarga

  // const getFiles = () => {} //este no, porque no hay descarga

  const uploadFiles = async (idReceta, file) => {
    //no es necesario un retorno de esta función, ya que almacena el resultado en el estado 'files'
    try {
      const result = await FilesServices.uploadFile(idReceta, file)
      console.log(result)
      if (result.status >= 200 & result.status < 300) {
        setFiles(result.data.data.file)
        //retornar un objeto con un message, type, y data para que desde el componente (RecipeForm) se llame al contexto de notificaciones
        addNotification({message:"Archivo subido correctamente.",type:"success"}) //esto no deberia estar acá
        return result.data.data.file
      }
      else {
        //retornar un objeto con un message, type, y data para que desde el componente (RecipeForm) se llame al contexto de notificaciones
        addNotification({message:"Algo a salido mal.",type:"error"}) //esto no deberia estar acá
        return result
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const deleteFiles = async (idReceta, filename) => {
    try {
      const result = await FilesServices.deleteFile(idReceta,filename)
      console.log(result)
      if (result.status >= 200 & result.status < 300) {
        setFiles(null)
        //retornar un objeto con un message, type, y data para que desde el componente (RecipeForm) se llame al contexto de notificaciones
        return {message:"Archivo subido correctamente.",type:"success"}
      }
      else {
        //retornar un objeto con un message, type, y data para que desde el componente (RecipeForm) se llame al contexto de notificaciones
        return {message:"Algo a salido mal.",type:"error"}
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }

  return { files, uploadFiles, deleteFiles }
}

export default useFiles
