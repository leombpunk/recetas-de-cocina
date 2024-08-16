import { check } from 'express-validator'
import { validateResult } from '../helpers/validateResult.js'

const validateReceta = [
    check('titulo')
        .exists()
        .isLength({ max: 50 })
        .not().isEmpty(),
    check('comensales')
        .exists()
        .isLength({ max: 20 })
        .not().isEmpty(),
    check('duracion')
        .exists()
        .isLength({ max: 20 })
        .not().isEmpty(),
    check('detalle')
        .exists()
        .isLength({ max: 500 })
        .not().isEmpty(),
    check('idUsuario')
        .exists()
        .isNumeric()
        .isLength({ max:11 })
        .not().isEmpty(),
    check('imagen')
        .exists()
        .isLength({ max: 100 }),
    check('visibilidad')
        .exists()
        .not().isEmpty()
        .isNumeric()
        .isLength({ max: 1 }),
    check('ingredientes.*.ingrediente')
        .exists()
        .isLength({ max: 50 })
        .not().isEmpty(),
    check('ingredientes.*.cantidad')
        .exists()
        .isLength({ max: 20 })
        .not().isEmpty(),
    check('ingredientes.*.orden')
        .exists()
        .isNumeric()
        .isLength({ max: 2 }),
    check('pasos.*.orden')
        .exists()
        .isNumeric()
        .isLength({ max: 2 }),
    check('pasos.*.paso')
        .exists()
        .isLength({ max: 500 })
        .not().isEmpty(),
    check('pasos.*.imagen') //esto es opcional, mover al endpoint de imagenes
        .optional(),
    (request, response, next) => {
        validateResult(request, response, next)
    }
]

export { validateReceta }