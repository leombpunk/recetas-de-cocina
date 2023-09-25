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

export { getToken }