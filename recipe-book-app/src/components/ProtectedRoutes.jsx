import { useEffect } from "react"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useContextUser } from "../providers/UserProvider"
import NavigationRoutes from "../utils/NavigationRoutes"
import { useContextNotification } from "../providers/NotificationProvider"
import Loader from "./loader/Loader"

const protectedLocations = [
  NavigationRoutes.Profile,
  NavigationRoutes.Recipe,
  NavigationRoutes.Recipes,
]

const ProtectedRoutes = () => {
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
      addNotification({ message: result.message, type: result.type })
      navigate(NavigationRoutes.Home)
    }
    else {
      if (protectedLocations.includes(location.pathname) & !user) {
        //revisar porque usuario es null
        console.log({ protected: user })
        navigate(NavigationRoutes.Home)
        // return <Navigate to={NavigationRoutes.Home} replace />
      }
    }
  }

  useEffect(() => {
    check()
  }, [])

  //no se si se arregló
  return <Outlet />
}

export default ProtectedRoutes
