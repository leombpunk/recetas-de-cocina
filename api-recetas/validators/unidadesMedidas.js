import { check } from 'express-validator'
import { validateResult } from '../helpers/validateResult.js'

const validateCreate = [
    check('nombre')
        .exists()
        .not().isEmpty()
        .isLength({ max: 30}),
    (request, response, next) => {
        validateResult(request, response, next)
    }
]

export { validateCreate }