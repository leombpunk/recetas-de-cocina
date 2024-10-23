import { useState, useEffect } from "react"
import ProfileServices from "../services/Profile"
import { useContextUser } from "../providers/UserProvider"

const useProfile = (username) => {
  const {user, setUser} = useContextUser()
  const [profile, setProfile] = useState({})
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState([])
  const [photo, setPhoto] = useState("") //este estado sobra
  const [loadPhoto, setLoadPhoto] = useState(false)
  const [notifyUpload, setNotifyUpload] = useState({})
  // console.log(user, profile)

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const result = await ProfileServices.getPerfil(username)
      // console.log({fetchResult:result})
      if (result.status === 200) {
        setProfile(result.data.data)
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

  const uploadPhoto = async (username, file) => {
    try {
      setLoadPhoto(true)
      const result = await ProfileServices.updatePhoto(username, file)
      console.log(result)
      if (result.status === 200) {
        setNotifyUpload({message:"Imagen de perfil actualizada", type:"success"})
        setProfile({...profile, imagen: result.data.data.file.filename})
        setUser({...user, imagen: result.data.data.file.filename})
      } else {
        setNotifyUpload({message:"Apa!! ¿que pasó?", type:"info"})
        // console.log(result)
      }
    } catch (error) {
      console.log(error)
      setNotifyUpload({message:"Algo ha salido muy mal! Vuelve a intentarlo!", type:"error"})
      setLoadPhoto(false)
    } finally {
      setLoadPhoto(false)
    }
  }

  const deletePhoto = async (username) => {
    try {
      
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchProfile()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username])

  return {
    profile,
    loading,
    errors,
    photo,
    loadPhoto,
    notifyUpload,
    uploadPhoto,
    deletePhoto,
  }
}

export default useProfile
