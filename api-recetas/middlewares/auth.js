import { verifyToken } from "../helpers/generateToken.js"

const checkAuth = async (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        if(tokenData.usuario) {
            next()
        } else{
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
        // const data = request.body
        const id = request.params.id || request.body.idUsuario || request.body.id //testear esto
        // console.log({ id: id })
        if (tokenData.id == id) {
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