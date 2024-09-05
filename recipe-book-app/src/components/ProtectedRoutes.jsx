import { Navigate, Outlet } from "react-router-dom"
import { useContextUser } from "../providers/UserProvider"
import NavigationRoutes from "../utils/NavigationRoutes"

const ProtectedRoutes = () => {
  const { user } = useContextUser()

  if (!user) {
    return <Navigate to={NavigationRoutes.Login} replace />
  }

  return <Outlet />
}

export default ProtectedRoutes
