import { useForm } from "react-hook-form"
import RecipesServices from "../services/Recipes"
import { useState } from "react"

const useRecipesShare = () => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState({})
  const [errors, setErrors] = useState([])
  const { register, setValue, getValues, reset } = useForm({
    defaultValues: {
      recetas: [{ id: 0, visibilidad: false }],
    },
  })

  const updateRecipesShare = async () => {
    try {
      console.log({ form: getValues() })
      setLoading(true)
      const result = await RecipesServices.sharedRecipes(getValues())
      console.log({ resultado: result })
      setLoading(false)
      setResponse(result)
    } catch (error) {
      setErrors([error])
      setLoading(false)
    }
  }

  return {
    loading,
    errors,
    response,
    formShared: {
      register,
      setValue,
      getValues,
      reset,
    },
    updateRecipesShare,
  }
}

export default useRecipesShare
