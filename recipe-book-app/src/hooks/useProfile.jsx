import { useState, useEffect } from "react"
import ProfileServices from "../services/Profile"
import { useContextUser } from "../providers/UserProvider"
import NavigationRoutes from "../utils/NavigationRoutes"
import { useNavigate } from "react-router-dom"

const useProfile = (username) => {
  const { user, setUser, handleLogout } = useContextUser()
  const navigate = useNavigate()
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
      console.log({ fetchResult: result })
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
        setNotifyUpload({
          message: "Imagen de perfil actualizada",
          type: "success",
        })
        setProfile({ ...profile, imagen: result.data.data.file.filename, urlPublica: result.data.data.url })
        setUser({ ...user, imagen: result.data.data.file.filename, urlPublica: result.data.data.url })
      } else {
        setNotifyUpload({ message: "Apa!! ¿que pasó?", type: "info" })
      }
    } catch (error) {
      console.log(error)
      setNotifyUpload({
        message: "Algo ha salido muy mal! Vuelve a intentarlo!",
        type: "error",
      })
      setLoadPhoto(false)
    } finally {
      setLoadPhoto(false)
      // setNotifyUpload({})
    }
  }

  const deletePhoto = async (username) => {
    try {
      setLoadPhoto(true)
      const result = await ProfileServices.deletePhoto(username)
      console.log(result)
      if (result.status === 200) {
        setNotifyUpload({
          message: "Imagen de perfil eliminada",
          type: "success",
        })
        setProfile({ ...profile, imagen: null, urlPublica: null })
        setUser({ ...user, imagen: null, urlPublica: null })
      } else {
        setNotifyUpload({ message: "Apa!! ¿que pasó?", type: "info" })
      }
    } catch (error) {
      console.log(error)
      setNotifyUpload({
        message: "Algo ha salido muy mal! Vuelve a intentarlo!",
        type: "error",
      })
      setLoadPhoto(false)
    } finally {
      setLoadPhoto(false)
      // setNotifyUpload({})
    }
  }

  const updateProfile = async (username, data) => {
    try {
      setLoading(true)
      const result = await ProfileServices.updatePerfil(username, data)
      console.log(result)
      if (result.status === 200) {
        setProfile({
          ...profile,
          nombres: data.nombres,
          apellidos: data.apellidos,
          mail: data.mail,
        })
        setUser({
          ...user,
          nombres: data.nombres,
          apellidos: data.apellidos,
          mail: data.mail,
        })
        setNotifyUpload({
          message: result.data.message,
          type: "success",
        })
      } else {
        setErrors([result])
        setNotifyUpload({ message: "Apa!! ¿que pasó?", type: "info" })
      }
    } catch (error) {
      setErrors([error])
      setLoading(false)
      setNotifyUpload({
        message: "Algo ha salido muy mal! Vuelve a intentarlo!",
        type: "error",
      })
    } finally {
      setLoading(false)
      // setNotifyUpload({})
    }
  }

  const updatePassword = async (data) => {
    try {
      setLoading(true)
      const result = await ProfileServices.updatePassword(data)
      console.log(result)
      if (result.status === 200) {
        //la password se actualizo
        setNotifyUpload({ message: "Contraseña actualizada", type: "success" })
      } else {
        //informar el error
        setNotifyUpload({
          message: result?.response?.data?.message,
          type: "error",
        })
      }
    } catch (error) {
      setErrors([error])
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const deleteProfile = async (username, deleteAll) => {
    try {
      setLoading(true)
      const result = await ProfileServices.deletePerfil(username, deleteAll)
      console.log(result)
      if (result.status === 200) {
        //ejecutar el logout y volver a la home
        handleLogout()
        navigate(NavigationRoutes.Home)
      } else {
        //informar que weas pasó
        setNotifyUpload({
          message: result?.response?.data?.message,
          type: "error",
        })
      }
    } catch (error) {
      setErrors([error])
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const linkGoogleAccount = async (googleId) => {
    try {
      setLoading(true)
      const result = await ProfileServices.linkGoogleAccount(googleId)
      console.log(result)
      if (result.status === 200) {
        //la password se actualizo
        setNotifyUpload({ message: "Cuenta de google vinculada", type: "success" })
        setProfile({
          ...profile,
          googleId
        })
        setUser({
          ...user,
          googleId
        })
      } else {
        //informar el error
        setNotifyUpload({
          message: result?.response?.data?.message,
          type: "error",
        })
      }
    } catch (error) {
      setErrors([error])
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const unlinkGoogleAccount = async (googleId) => {
    try {
      setLoading(true)
      const result = await ProfileServices.unlinkGoogleAccount(googleId)
      console.log(result)
      if (result.status === 200) {
        //la password se actualizo
        setNotifyUpload({ message: "Cuenta de google desvinculada", type: "success" })
        setProfile({
          ...profile,
          googleId: null
        })
        setUser({
          ...user,
          googleId: null
        })
      } else {
        //informar el error
        setNotifyUpload({
          message: result?.response?.data?.message,
          type: "error",
        })
      }
    } catch (error) {
      setErrors([error])
      setLoading(false)
    } finally {
      setLoading(false)
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
    updateProfile,
    updatePassword,
    deleteProfile,
    linkGoogleAccount,
    unlinkGoogleAccount,
  }
}

export default useProfile
