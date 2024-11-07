import axios from "axios"
import { RoutesAPI } from "../utils/RoutesAPI"

const register = async (data) => {
  const url = `${RoutesAPI.auth}/registro`
  const { username: usuario, password: contrasena, mail } = data
  const request = axios.post(url, { usuario, contrasena, mail })
  return request.then((response) => response)
}

const registerWithGoogle = async () => {
  const url = `${RoutesAPI.auth}/mamadas`
  const request = axios.post(url, "")
  return request.then((response) => response)
}

const RegisterServices = { register, registerWithGoogle }

export default RegisterServices
