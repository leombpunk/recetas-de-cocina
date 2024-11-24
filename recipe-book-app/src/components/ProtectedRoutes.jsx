import { useEffect, /*useState*/ } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useContextUser } from "../providers/UserProvider"
import { useContextNotification } from "../providers/NotificationProvider"
import NavigationRoutes from "../utils/NavigationRoutes"

const protectedLocations = [
  NavigationRoutes.Favorites,
  NavigationRoutes.Profile,
  NavigationRoutes.Recipe,
  NavigationRoutes.Recipes,
]

const ProtectedRoutes = () => {
  // const [count, setCoutn] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()
  const { handleInitUserProvider } = useContextUser()
  const { addNotification } = useContextNotification()
  
  // console.log({count})
  
  useEffect(() => {
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
        if (protectedLocations.includes(location.pathname) && !result.user) {
          navigate(NavigationRoutes.Home)
        }
      }
    }
    
    check()
    // setCoutn(count => count + 1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Outlet />
}

export default ProtectedRoutes
