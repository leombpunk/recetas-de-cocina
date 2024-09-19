import axios from "axios"
import { RoutesAPI } from "../utils/RoutesAPI"
import { getToken } from "../utils/Token"

const getRecipes = async (search, page, order) => {
  const url = `${RoutesAPI.recipes}/`
  const request = axios.get(url)
  return request.then((response) => response)
}

const getRecipesByUser = async (username) => {
  //testear -> ya funciona
  const url = `${RoutesAPI.recipes}/usuario/${username}`
  const request = axios.get(url)
  return request //.then(response => response)
}

const getRecipe = async (id) => {
  const url = `${RoutesAPI.recipes}/${id}`
  const request = axios.get(url)
  return request.then((response) => response)
}

const createRecipe = async (recipe) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const request = axios.post(RoutesAPI.recipes, recipe, config)
  return request.then((response) => response)
}

const updateRecipe = async (id, recipe) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const url = `${RoutesAPI.recipes}/${id}`
  const request = axios.patch(url, recipe, config)
  return request.then((response) => response)
}

const deleteRecipe = async (id) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const url = `${RoutesAPI.recipes}/${id}`
  const request = axios.delete(url, config)
  return request.then((response) => response)
}

const RecipesServices = {
  getRecipes,
  getRecipesByUser,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
}

export default RecipesServices
