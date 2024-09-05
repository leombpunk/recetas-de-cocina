import { createContext, useContext, useState } from "react"
import { getToken, deleteToken, setToken } from "../utils/Token"
import { verifyToken } from "../services/Login"

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  // se hace la llamada en el componente mas alto
  const handleInitUserProvider = async () => {
    //si user tiene datos (es distinto de null) salir de esta funcion
    if (user) {
      return
    } 
    //si no 
    //se revisa que exista un token guardado en localStorage
    else {
      const userToken = getToken() //contiene el token de sesion
      //hace una peticion al servidor para verificar el token -> si no expiró
      const result = await verifyToken(userToken)
      console.log(result)
      //analizar el result y
      //retorna los datos del usuario
      //se setea en setUser
      // setUser(result)
      //puede retornar el resultado o un mansaje
      return 
    }
    //lo de abajo fuera de este provider
    //si no expiro -> carga la pagina principal de la app
    //si expiro -> informa con una notificacion y redireccional al login
  }

  const handleLogin = (user) => {
    setToken(user.token)
    setUser(user)
  }

  const handleLogout = () => {
    deleteToken()
    setUser(null)
  }

  // const userLocalData = getToken()

  // if (!user && userLocalData) {
  //   try {
  //     const userData = JSON.parse(userLocalData)
  //     setUser(userData)
  //   } catch (error) {
  //     console.log({ error: error })
  //   }
  // }

  return (
    <UserContext.Provider value={{ user, handleInitUserProvider, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  )
}

const useContextUser = () => {
  return useContext(UserContext)
}

export { useContextUser, UserProvider }
