import { useNavigate } from 'react-router-dom'
import { signIn } from "../services/Login"
import { useContextUser } from "../providers/UserProvider"
import NavigationRoutes from '../utils/NavigationRoutes'

const useLogin = () => {
    const navigate = useNavigate()
    const { handleLogin } = useContextUser()

    const login = async({ user, pass }) => {
        try {
            const response = await signIn({username: user, password: pass})
            if (response.status === 200){
                const userData = response.data.data
                handleLogin(userData)
                navigate(NavigationRoutes.Home)
            }
            // return userData
        } catch (error) {
            console.log(error)
            // return error
        }
    }
    
    return {
        login
    }
}

export default useLogin