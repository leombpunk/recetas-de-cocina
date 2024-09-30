import { useEffect, useState } from "react"
import RecipesServices from "../services/Recipes"

const useRecipeSearch = (id) => {
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState([])
  const [recipe, setRecipe] = useState({})

  const fetchRecipe = async () => {
    try {
      setLoading(true)
      const response = await RecipesServices.getRecipePublic(id)
      // console.log({res:response})
      if (response.status === 200) {
        setRecipe(response.data.data)
      } else if (response === 204) {
        setErrors([{message:'Esa receta no existe o es privada!'}])
      } else {
        setErrors([{message: 'algo malio sal', res: response}])
      }
      setLoading(false)
    } catch (error) {
      setErrors([error])
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecipe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return {
    recipe,
    errors,
    loading,
  }
}

export default useRecipeSearch
