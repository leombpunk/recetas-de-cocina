import { check } from 'express-validator'
import { validateResult } from '../helpers/validateResult.js'

const validateAuth = [
    check('usuario')
        .exists()
        .not().isEmpty()
        .isLength({ min:8, max:16 }),
    check('contrasena')
        .exists()
        .not().isEmpty()
        .isLength({ min:8, max:16 }),
    (request, response, next) => {
        validateResult(request, response, next)
    }
] 

const validateRegistro = [
    check('usuario')
        .exists()
        .not().isEmpty()
        .isLength({ min:6, max:16 }),
    check('contrasena')
        .exists()
        .not().isEmpty()
        .isLength({ min:8, max:16 }),
    check('mail')
        .exists()
        .not().isEmpty()
        .isEmail(),
    (request, response, next) => {
        validateResult(request, response, next)
    }
] 

export { validateAuth, validateRegistro }