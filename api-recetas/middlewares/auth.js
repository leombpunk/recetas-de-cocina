import { verifyToken } from "../helpers/generateToken.js"

const checkAuth = async (request, response, next) => {
    try {
        // console.log(request.headers.authorization)
        const token = request.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        console.log(tokenData)
        if(tokenData.usuario) {
            next()
        } else{
            console.log('/* checkAuth middleware */')
            console.log(error)
            response.status(401)
            response.send({ error: 'No posees permisos suficientes para realizar esta operacion' })
        }
    } catch (error) {
        console.log('/* checkAuth middleware (catch) */')
        console.log(error)
        response.status(401)
        response.send({ message: 'No posees permisos suficientes para realizar esta operacion', error: error })
    }
}

// me gustaria hacerlo de otra manera
const checkCoherence = async (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        const data = request.body
        if (tokenData.id === data.id) {
            next()
        } else {
            response.status(401)
            response.send({ error: 'No posees permisos suficientes para realizar esta operacion' })
        }
    } catch (error) {
        console.log('/* checkCoherence middleware (catch) */')
        console.log(error)
        response.status(401)
        response.send({ message: 'No posees permisos suficientes para realizar esta operacion', error: error })
    }
}


export { checkAuth, checkCoherence }