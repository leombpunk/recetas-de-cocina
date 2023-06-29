import { check } from 'express-validator'
import { validateResult } from '../helpers/validateResult.js'

const validateReceta = [
    check('nombre')
        .exists()
        .isLength({ max: 50 })
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
    check('ingredientes.*.nombre')
        .exists()
        .isLength({ max: 50 })
        .not().isEmpty(),
    check('ingredientes.*.cantidad')
        .exists()
        .isDecimal({ decimal_digits: 3 })
        .isLength({ max: 8 })
        .not().isEmpty(),
    check('ingredientes.*.detalle')
        .exists()
        .isLength({ max: 255 }),
    check('ingredientes.*.imagen')
        .exists()
        .isLength({ max: 100 }),
    check('ingredientes.*.idUnidadMedida')
        .exists()
        .isNumeric()
        .isLength({ max: 11 })
        .not().isEmpty(),
    (request, response, next) => {
        validateResult(request, response, next)
    }
]

export { validateReceta }