import { useEffect, useState } from "react"
import RecipesServices from "../services/Recipes"
import {
  saveRecipeLocal,
  getRecipeLocal,
  // recipeStruct,
} from "../utils/RecipeLocal"

const useRecipe = ({ idRecipe = null }) => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const [recipe, setRecipe] = useState(null)
  const recipeLocal = getRecipeLocal()

  const getRecipe = async (id) => {
    try {
      setLoading(true)
      const result = await RecipesServices.getRecipe(id)
      // console.log(result)
      setRecipe(result.data.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setErrors([error])
      setLoading(false)
    }
  }

  const createRecipe = async (recipe) => {
    try {
      setLoading(true)
      const result = await RecipesServices.createRecipe(recipe)
      //comprobar cual es el resultado y si existe la receta guardar
      // console.log({ create: result })
      setRecipe(result.data.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setErrors([error])
      setLoading(false)
    }
  }

  const updateRecipe = async (recipe) => {
    try {
      setLoading(true)
      const result = await RecipesServices.updateRecipe(recipe.id, recipe)
      // console.log(result)
      if (result){
        setRecipe(recipe)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setErrors([error])
      setLoading(false)
    }
  }

  const deleteRecipe = async (id) => {}

  useEffect(() => {
    if (!recipeLocal) {
      createRecipe()
    } else {
      // console.log({ local: recipeLocal })
      // getRecipe(idRecipe || recipeLocal.id) //esto sobreescribe la receta guardada en localStorage
      setRecipe(recipeLocal)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //actualiza el localStorage al cambiar recipe
  useEffect(() => {
    saveRecipeLocal(recipe)
  }, [recipe])

  return {
    recipe,
    errors,
    loading,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  }
}

export default useRecipe
