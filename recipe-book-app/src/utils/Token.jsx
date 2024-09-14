const getToken = () => {
  try {
    const token = localStorage.getItem("RecipeAppToken")
    if (token) {
      // const user = JSON.parse(token)
      // return `Bearer ${user.token}`
      return `Bearer ${token}`
    }
  } catch (error) {
    return { errors: error }
  }
}

const setToken = (userToken) => {
  try {
    // localStorage.setItem('RecipeAppToken', JSON.stringify(userToken))
    localStorage.setItem("RecipeAppToken", userToken)
    return localStorage.getItem("RecipeAppToken")
  } catch (error) {
    console.log("Error", error)
    return { error: error }
  }
}

const deleteToken = () => {
  try {
    localStorage.removeItem("RecipeAppToken")
    return { message: "ok" }
  } catch (error) {
    console.log("Error", error)
    return { error: error }
  }
}

export { getToken, setToken, deleteToken }
