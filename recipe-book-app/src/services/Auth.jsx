import axios from "axios"
import { RoutesAPI } from "../utils/RoutesAPI"

const signIn = async (userData) => {
  try {
    const { username, password } = userData
    const response = await axios.post(`${RoutesAPI.auth}/login`, {
      usuario: username,
      contrasena: password,
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

const signOut = () => {
  //borra el localStorage donde almacena el token
}

const verifyToken = async (token) => {
  try {
    const config = {
      headers: {
          Authorization: token
      }
    }
    const request = await axios.post(`${RoutesAPI.auth}/verifyToken`, null, config)
    return request
  } catch (error) {
    console.log(error)
  }
}

const register = async (data) => {
  const url = `${RoutesAPI.auth}/registro`
  const { username: usuario, password: contrasena, mail } = data
  const request = axios.post(url, { usuario, contrasena, mail })
  return request.then((response) => response)
}

const googleOAuth = async () => {
  const url = `${RoutesAPI.auth}/google`
  const request = axios.get(url)
  return request.then((response) => { console.log(response); return response})
}

const AuthServices = { register, googleOAuth, signIn, signOut, verifyToken }

export default AuthServices
