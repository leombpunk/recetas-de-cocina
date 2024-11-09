import axios from "axios"
import { RoutesAPI } from "../utils/RoutesAPI"
import { getToken } from "../utils/Token"

const getAllSavesRecipes = async (search, page, order) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const url = `${RoutesAPI.saves}/?search=${search}&page=${page}&order=${order}`
  const result = axios.get(url, config)
  return result.then((response) => response)
}

const postSaveRecipe = async (id) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const url = `${RoutesAPI.saves}/${id}`
  const result = axios.post(url, {}, config)
  return result.then((response) => response)
}

const deleteSaveRecipe = async (id) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const url = `${RoutesAPI.saves}/${id}`
  const result = axios.delete(url, config)
  return result.then((response) => response)
}

const SaveRecipeServices = {
  getAllSavesRecipes,
  postSaveRecipe,
  deleteSaveRecipe,
}

export default SaveRecipeServices
