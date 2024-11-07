import { useState } from "react"
import RegisterServices from "../services/Register"
import { useContextUser } from "../providers/UserProvider"

const useRegister = () => {
  const { handleLogin } = useContextUser()
  const [loading, setLoading] = useState(false)
  const [notify, setNotify] = useState({})
  const [response, setResponse] = useState(null) //no se, para testear supongo, luego lo quitaré
  const [errors, setErrors] = useState([])

  //probar que me devuelva un token y probar si con eso hace el login solito
  const userRegister = async (data) => {
    try {
      setLoading(true)
      const result = await RegisterServices.register(data)
      console.log({ result })
      if (result.status) {
        setResponse(result)
        handleLogin(result.data.data)
        setNotify({
          message: "Te has registrado correctamente",
          type: "success",
        })
      } else {
        setResponse(result)
      }
    } catch (error) {
      setNotify({
        message: "Se ha producido un error en la operación",
        type: "error",
      })
      setErrors([error])
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    notify,
    response,
    errors,
    userRegister,
  }
}

export default useRegister
