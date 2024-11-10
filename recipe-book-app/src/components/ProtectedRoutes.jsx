import { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useContextUser } from "../providers/UserProvider"
import { useContextNotification } from "../providers/NotificationProvider"
import NavigationRoutes from "../utils/NavigationRoutes"
// import Loader from "./loader/Loader"

const protectedLocations = [
  NavigationRoutes.Profile,
  NavigationRoutes.Recipe,
  NavigationRoutes.Recipes,
]

const ProtectedRoutes = () => {
  const [count, setCoutn] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, handleInitUserProvider } = useContextUser()
  const { addNotification } = useContextNotification()

  //comprobar si el token guardado está firmado y no ha expirado
  //si no es valido, informar al usuario
  const check = async () => {
    const result = await handleInitUserProvider()
    if (result.type === "error") {
      addNotification({ message: result.message, type: result.type })
    } 
    else if (result.type === "info") {
      addNotification({ message: "Registrate o Inicia sesión 🥰", type: result.type })
      if(protectedLocations.includes(location.pathname)) {
        navigate(NavigationRoutes.Home)
      }
    }
    else {
      //crear otreo useEffect y mover esta lógica
      //cada vez que la location cambie que verifique
      //que no sea una ruta protegida o login/registro
      //y le niege el acceso dependiendo de si el estado
      //usuario tiene algo guardado
      if (protectedLocations.includes(location.pathname) && !user) {
        //revisar porque usuario es null
        // console.log({ protected: user })
        navigate(NavigationRoutes.Home)
        // return <Navigate to={NavigationRoutes.Home} replace />
      }
    }
  }

  // console.log({count})
  
  useEffect(() => {
    check()
    setCoutn(count => count +1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //no se si se arregló
  return <Outlet />
}

export default ProtectedRoutes
