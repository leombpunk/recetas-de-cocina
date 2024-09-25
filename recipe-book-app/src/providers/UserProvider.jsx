import { createContext, useContext, useState } from "react"
import { getToken, deleteToken, setToken } from "../utils/Token"
import { verifyToken } from "../services/Login"

const UserContext = createContext()

// AGREGAR: guardar la info de sesión del usuario en localstorage (otra vez) -> QUIZAS NO
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  // console.log({ provider: user })

  // se hace la llamada en el componente mas alto
  const handleInitUserProvider = async () => {
    //si user tiene datos (es distinto de null) salir de esta funcion
    if (user) {
      return { type: "success", message: "Sesión correcta" }
    }
    //si no
    //se revisa que exista un token guardado en localStorage
    else {
      const userToken = getToken() //contiene el token de sesion
      // console.log(userToken)
      //hace una peticion al servidor para verificar el token -> si no expiró
      if (userToken) {
        const result = await verifyToken(userToken)
        // console.log(result)
        //analizar el result y
        //retorna los datos del usuario
        //se setea en setUser
        //puede retornar el resultado o un mansaje
        if ((result?.status >= 200) & (result?.status < 300)) {
          // console.log("oh oh")
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
    //lo de abajo fuera de este provider
    //si no expiro -> carga la pagina principal de la app
    //si expiro -> informa con una notificacion y redireccional al login
  }

  const handleLogin = (userData) => {
    // console.log("provider")
    // console.log(userData)
    setToken(userData.token)
    setUser(userData)
  }

  const handleLogout = () => {
    deleteToken()
    setUser(null)
  }

  return (
    <UserContext.Provider
      value={{ user, handleInitUserProvider, handleLogin, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  )
}

const useContextUser = () => {
  return useContext(UserContext)
}

export { useContextUser, UserProvider }
