const getToken = () => {
    try {
        const token = localStorage.getItem('cookingbookToken')
        if (token){
            const user = JSON.parse(token)
            return `Bearer ${user.token}`
        }
    } catch (error) {
        return { errors: error }
    }
}

const setUserLocalStorage = (user) => {
    try {
        localStorage.setItem('cookingbookToken', JSON.stringify(user))
        return localStorage.getItem('cookingbookToken')
    } catch (error) {
        console.log("Error", error)
        return { 'error': error }
    }
}

const getUserLocalStorage = () => {
    try {
        const userLocalData = localStorage.getItem('cookingbookToken')
        console.log(userLocalData)
        if (userLocalData) {
            const user = JSON.parse(userLocalData)
            return user
        }
        // return JSON.parse(userLocalData)
    } catch (error) {
        console.log("Error", error)
        return { 'error': error }
    }
}

const deleteUserLocalStorage = () => {
    try {
        localStorage.removeItem('cookingbookToken')
        return { 'message': 'ok' }
    } catch (error) {
        console.log("Error", error)
        return { 'error': error }
    }
}

export { getToken, setUserLocalStorage, getUserLocalStorage, deleteUserLocalStorage }