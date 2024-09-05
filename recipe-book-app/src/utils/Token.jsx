const getToken = () => {
    try {
        const token = localStorage.getItem('RecipeAppToken')
        if (token){
            const user = JSON.parse(token)
            return `Bearer ${user.token}`
        }
    } catch (error) {
        return { errors: error }
    }
}

const setToken = (userToken) => {
    try {
        localStorage.setItem('RecipeAppToken', JSON.stringify(userToken))
        return localStorage.getItem('RecipeAppToken')
    } catch (error) {
        console.log("Error", error)
        return { 'error': error }
    }
}

// const getUserLocalStorage = () => {
//     try {
//         const userLocalData = localStorage.getItem('RecipeAppToken')
//         console.log(userLocalData)
//         if (userLocalData) {
//             const user = JSON.parse(userLocalData)
//             return user
//         }
//         // return JSON.parse(userLocalData)
//     } catch (error) {
//         console.log("Error", error)
//         return { 'error': error }
//     }
// }

const deleteToken = () => {
    try {
        localStorage.removeItem('RecipeAppToken')
        return { 'message': 'ok' }
    } catch (error) {
        console.log("Error", error)
        return { 'error': error }
    }
}

export { getToken, setToken, deleteToken }