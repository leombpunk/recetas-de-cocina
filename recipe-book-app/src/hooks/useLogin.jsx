import { useNavigate } from "react-router-dom"
import { signIn } from "../services/Login"
import { useContextUser } from "../providers/UserProvider"
import NavigationRoutes from "../utils/NavigationRoutes"
import { useContextNotification } from "../providers/NotificationProvider"
import { useState } from "react"

const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {addNotification} = useContextNotification()
  const { handleLogin } = useContextUser()

  const login = async ({ user, pass }) => {
    try {
      setLoading(true)
      const response = await signIn({ username: user, password: pass })
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

  return {
    loading,
    login,
  }
}

export default useLogin
