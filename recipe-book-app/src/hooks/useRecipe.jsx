import { useEffect, useState } from "react"
import RecipesServices from "../services/Recipes"
import {
  saveRecipeLocal,
  getRecipeLocal,
  recipeStruct,
} from "../utils/RecipeLocal"

const useRecipe = ({ idRecipe = null }) => {
  const [errors, setErrors] = useState([])
  const [recipe, setRecipe] = useState(null)
  const recipeLocal = getRecipeLocal()

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
      //comprobar cual es el resultado y si existe la receta guardar
      console.log({ create: result })
      setRecipe(result.data.data)
    } catch (error) {
      console.log(error)
      setErrors([error])
    }
  }

  const updateRecipe = async (recipe) => {}

  const deleteRecipe = async (id) => {}

  useEffect(() => {
    if (!recipeLocal) {
      createRecipe()
    } else {
      console.log({ local: recipeLocal })
      // getRecipe(idRecipe || recipeLocal.id) //esto sobreescribe la receta guardada en localStorage
      setRecipe(recipeLocal)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    saveRecipeLocal(recipe)
  }, [recipe])

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
