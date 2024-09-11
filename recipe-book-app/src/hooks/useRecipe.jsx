import { useState } from "react"
import RecipesServices from "../services/Recipes"

const useRecipe = () => {
  const [errors, setErrors] = useState([])
  const [recipe, setRecipe] = useState(null)

  const getRecipe = async (id) => {
    try {
      const result = await RecipesServices.getRecipe(id)
      // console.log(result)
      setRecipe(result.data.data)
    } catch (error) {
      console.log(error)
      setErrors([error])
    }
  }

  const createRecipe = async (recipe) => {
    try {
      const result = await RecipesServices.createRecipe(recipe)
      // console.log(result)
      setRecipe(result.data.data)
    } catch (error) {
      console.log(error)
      setErrors([error])
    }
  }

  const updateRecipe = async (recipe) => {}

  const deleteRecipe = async (id) => {}

  return {
    recipe,
    errors,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  }
}

export default useRecipe
