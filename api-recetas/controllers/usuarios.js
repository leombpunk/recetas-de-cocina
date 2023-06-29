import Usuario from '../models/usuario.js'
import { matchedData } from 'express-validator'
import { httpError } from '../helpers/handleErrors.js'

const getRecetasByUserId = async (req, res) => {
    try {
        const id = req.params.id
        const recetas = await Usuario.getRecetasByUserId(id)
        res.send(recetas)
    } catch (error) {
        httpError(res, error)
    }
}

export { getRecetasByUserId }