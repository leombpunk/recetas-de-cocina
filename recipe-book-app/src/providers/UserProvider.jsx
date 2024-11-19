import { createContext, useContext, useState } from "react"
import { getToken, deleteToken, setToken } from "../utils/Token"
import AuthServices from "../services/Auth"

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  // console.log({ provider: user })

  const handleInitUserProvider = async () => {
    if (user) {
      return { type: "success", message: "Sesión correcta" }
    }
    else {
      const userToken = getToken() //contiene el token de sesion
      if (userToken) {
        const result = await AuthServices.verifyToken(userToken)
        if ((result?.status >= 200) & (result?.status < 300)) {
          setToken(result.data.data.token)
          setUser(result.data.data)
          return { type: "success", message: "Sesión correcta" }
        } else {
          return { type: "error", message: "Tu sesión a expirado" }
        }
      } else {
        return { type: "info", message: "No hay token" }
      }
    }
  }

  const handleLogin = (userData) => {
    setToken(userData.token)
    setUser(userData)
  }

  const handleLogout = () => {
    deleteToken()
    setUser(null)
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, handleInitUserProvider, handleLogin, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  )
}

const useContextUser = () => {
  return useContext(UserContext)
}

export { useContextUser, UserProvider }
