import { useState } from "react"
import RecipesServices from "../services/Recipes"

const useRecipe = () => {
  const [recipeData, setRecipeData] = useState(null)
  const getRecipe = async (id) => {}
  const createRecipe = async (recipe) => {}
  const updateRecipe = async (recipe) => {}
  const deleteRecipe = async (id) => {}

  return {
    recipeData,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  }
}

export default useRecipe
