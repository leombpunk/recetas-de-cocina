import axios from 'axios'
import { RoutesAPI } from '../utils/RoutesAPI'
import { getToken } from '../utils/Token'

const getRecipes = (search, page, order) => {
    //ejemplo con fetch
    // fetch

    //ejemplo con axios
    const url = `${RoutesAPI.recipes}/`
    const request = axios.get(url)

    return request.then(response => response)
}

const getRecipesByUser = (username) => {
    //testear -> ya funciona
    const url = `${RoutesAPI.recipes}/usuario/${username}`
    const request = axios.get(url)
    return request//.then(response => response)
}

const getRecipe = (id) => {
    const url = `${RoutesAPI.recipes}/${id}`
    const request = axios.get(url)
    return request.then(response => response)
}

const createRecipe = (recipe) => {
    const token = getToken()
    const config = {
        headers: {
            Authorization: token
        }
    }
    const request = axios.post(RoutesAPI.recipes, recipe, config)
    return request.then(response => response)
}

const updateRecipe = (id, recipe) => {
    const token = getToken()
    const config = {
        headers: {
            Authorization: token
        }
    }
    const url = `${RoutesAPI.recipes}/${id}`
    const request = axios.put(url, recipe ,config)
    return request.then(response => response)
}

const deleteRecipe = (id) => {
    const token = getToken()
    const config = {
        headers: {
            Authorization: token
        }
    }
    const url = `${RoutesAPI.recipes}/${id}`
    const request = axios.delete(url, config)
    return request.then(response => response)
}

const RecipesServices = { getRecipes, getRecipesByUser, getRecipe, createRecipe, updateRecipe, deleteRecipe }

export default RecipesServices