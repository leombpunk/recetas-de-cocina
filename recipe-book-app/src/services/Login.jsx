import axios from 'axios'
import { RoutesAPI } from '../utils/RoutesAPI'

const signIn = async (userData) => {
    try {
        const { username, password } = userData
        const response = await axios.post(`${RoutesAPI.auth}/login`, {
            usuario: username,
            contrasena: password
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

const signOut = () => {
    //borra el localStorage donde almacena el token
}

export { signIn, signOut }