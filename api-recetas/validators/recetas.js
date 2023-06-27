import { check } from 'express-validator'
import { validateResult } from '../helpers/validateResult.js'

const validateReceta = [
    check(),
    (request, response, next) => {
        validateResult(request, response, next)
    }
]

export { validateReceta }