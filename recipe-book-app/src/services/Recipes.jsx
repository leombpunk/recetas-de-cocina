import axios from "axios"
import { RoutesAPI } from "../utils/RoutesAPI"
import { getToken } from "../utils/Token"

//servicios publicos -> sin auth
const getRecipesPublic = async (search, page, order, username) => {
  const url = `${RoutesAPI.recipesPublic}?search=${search}&page=${page}&order=${order}&username=${username}`
  const request = axios.get(url)
  return request.then((response) => response)
}

const getRecipePublic = async (id) => {
  const token = getToken()
  const config = {
    ...(token && {
      headers: {
        Authorization: token,
      },
    }),
  }
  const url = `${RoutesAPI.recipesPublic}/${id}`
  const request = axios.get(url, config)
  return request.then((response) => response)
}

//servicios privados -> con auth
const getRecipes = async (search, page, order) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const url = `${RoutesAPI.recipes}/?search=${search}&page=${page}&order=${order}`
  const request = axios.get(url, config)
  return request.then((response) => response)
}

const getRecipesByUser = async (username) => {
  //testear -> ya funciona
  const url = `${RoutesAPI.recipes}/usuario/${username}`
  const request = axios.get(url)
  return request //.then(response => response)
}

const getRecipe = async (id) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const url = `${RoutesAPI.recipes}/${id}`
  const request = axios.get(url, config)
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

const patchRecipe = async (id, data) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  console.log({data})
  const url = `${RoutesAPI.recipes}/${id}`
  const request = axios.patch(url, data, config)
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
  const request = axios.put(url, recipe, config)
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

const sharedRecipes = async (recipes) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const url = `${RoutesAPI.recipes}/compartir/`
  const request = axios.patch(url, recipes, config)
  return request.then((response) => response)
}

const RecipesServices = {
  //privados
  getRecipes,
  getRecipesByUser,
  getRecipe,
  createRecipe,
  patchRecipe,
  updateRecipe,
  deleteRecipe,
  sharedRecipes,
  //publicos
  getRecipesPublic,
  getRecipePublic,
}

export default RecipesServices
