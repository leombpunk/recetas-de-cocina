import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useContextUser } from "../providers/UserProvider"
import { useContextNotification } from "../providers/NotificationProvider"
import AuthServices from "../services/Auth"
import NavigationRoutes from "../utils/NavigationRoutes"

const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {addNotification} = useContextNotification()
  const { handleLogin } = useContextUser()

  const login = async ({ user, pass }) => {
    try {
      setLoading(true)
      const response = await AuthServices.signIn({ username: user, password: pass })
      if (response.status === 200) {
        const userData = response.data.data
        handleLogin(userData)
        addNotification({
          message: `Bienvenido/a ${user}!`,
          type: "success",
        })
        navigate(NavigationRoutes.Home)
      }
      // return userData
    } catch (error) {
      console.log(error)
      setLoading(false)
      addNotification({
        message: `El usuario o la contraseña son incorrectas`,
        type: "error",
      })
      // return error
    } finally {
      setLoading(false)
    }
  }

  const googleLogin = async () => {
    await AuthServices.googleOAuth()
  }

  return {
    loading,
    login,
    googleLogin,
  }
}

export default useLogin
