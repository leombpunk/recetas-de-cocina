import { useState, useEffect } from "react"
import ProfileServices from "../services/Profile"

const useProfile = (username) => {
  const [profile, setProfile] = useState({})
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState([])
  const [photo, setPhoto] = useState("")
  const [loadPhoto, setLoadPhoto] = useState(false)

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const result = await ProfileServices.getPerfil(username)
      console.log({fetchResult:result})
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
  }
}

export default useProfile
