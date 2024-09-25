import { useEffect, useState } from "react"
import RecipesServices from "../services/Recipes"
import {
  saveRecipeLocal,
  getRecipeLocal,
  // recipeStruct,
} from "../utils/RecipeLocal"

const useRecipe = (recetaId) => {
  console.log({ recetaid: recetaId })
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState([])
  const [recipe, setRecipe] = useState(null)
  const recipeLocal = getRecipeLocal()

  const getRecipe = async (id) => {
    try {
      setLoading(true)
      const result = await RecipesServices.getRecipe(id)
      console.log({ get: result })
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
      console.log({ create: result })
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
      if (result) {
        setRecipe(recipe)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setErrors([error])
      setLoading(false)
    }
  }

  const deleteRecipe = async (id) => {
    try {
      setLoading(true)
      const result = await RecipesServices.deleteRecipe(id)
      // console.log(result)
      if (result) {
        setRecipe(null)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setErrors([error])
      setLoading(false)
    }
  }

  useEffect(() => {
    if (recetaId) {
      console.log("1er hook")
      getRecipe(recetaId)
    }
  }, [recetaId])

  useEffect(() => {
    console.log("2do hook")
    if (!recipeLocal) {
      console.log("primer if")
      createRecipe()
    } else if (!recetaId) {
      console.log("segundo if")
      // console.log({ local: recipeLocal })
      // getRecipe(idRecipe || recipeLocal.id) //esto sobreescribe la receta guardada en localStorage
      setRecipe(recipeLocal)
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recetaId])

  //actualiza el localStorage al cambiar recipe
  useEffect(() => {
    console.log("3er hook")
    //si !recetaId guardo la receta
    if (!recetaId) {
      console.log("if saverecipelocal", recipe)
      saveRecipeLocal(recipe)
      // setLoading(false)
    }
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
