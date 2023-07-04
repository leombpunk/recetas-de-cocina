import { verifyToken } from "../helpers/generateToken.js"

const checkAuth = async (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)

        if(tokenData.username) {
            next()
        } else{
            console.log('/* checkAuth middleware */')
            console.log(error)
            response.status(401)
            response.send({ error: 'You do not have permissions to perform this operation' })
        }
    } catch (error) {
        console.log('/* checkAuth middleware */')
        console.log(error)
        response.status(401)
        response.send({ error: 'You do not have permissions to perform this operation' })
    }
}

const checkCoherence = async (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        const data = request.body

        if (tokenData.id === data.id) {
            next()
        } else {
            response.status(401)
            response.send({ error: 'You do not have permissions to perform this operation' })
        }
    } catch (error) {
        console.log('/* checkCoherence middleware */')
        console.log(error)
        response.status(401)
        response.send({ error: 'You do not have permissions to perform this operation' })
    }
}


export { checkAuth, checkCoherence }