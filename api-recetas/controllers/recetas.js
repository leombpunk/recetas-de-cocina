import Receta from '../models/receta.js'
import { matchedData } from 'express-validator'
import { httpError } from '../helpers/handleErrors.js'

const getFullRecetaById = async (req, res) => {
    try {
        const id = req.params.id
        const receta = await Receta.getFullRecetaById(id)
        res.send(receta)
    } catch (error) {
        httpError(res, error)
    }
}

export { getFullRecetaById }