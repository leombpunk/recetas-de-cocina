import axios from "axios"
import { RoutesAPI } from "../utils/RoutesAPI"
import { getToken } from "../utils/Token"

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
  postSaveRecipe,
  deleteSaveRecipe,
}

export default SaveRecipeServices
