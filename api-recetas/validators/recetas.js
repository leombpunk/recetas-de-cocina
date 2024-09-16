import { check } from "express-validator"
import { validateResult } from "../helpers/validateResult.js"

const validateCreate = [
  check("titulo")
    .exists()
    .isLength({ max: 50 })
    .isString()
    .optional(),
  check("comensales")
    .exists()
    .isLength({ max: 20 })
    .optional(),
  check("duracion")
    .exists()
    .isLength({ max: 20 })
    .optional(),
  check("detalle")
    .exists()
    .isLength({ max: 500 })
    .optional(),
  check("idUsuario")
    .exists()
    .isNumeric()
    .isLength({ max: 11 })
    .optional(),
  check("imagen")
    .exists()
    .isLength({ max: 100 })
    .optional(),
  check("visibilidad")
    .exists()
    .isNumeric()
    .isLength({ max: 1 })
    .optional(),
  check("ingredientes.*.name")
    .exists()
    .isLength({ max: 50 })
    .optional(),
  check("pasos.*.paso")
    .exists()
    .isLength({ max: 500 })
    .optional(),
  check("pasos.*.imagen")
    .exists()
    .isLength({ max: 100 })
    .optional(),
  (request, response, next) => {
    validateResult(request, response, next)
  },
]

const validateReceta = [
  check("titulo")
    .exists().isLength({ max: 50 }).not().isEmpty(),
  check("comensales")
    .exists().isLength({ max: 20 }).not().isEmpty(),
  check("duracion")
    .exists().isLength({ max: 20 }).not().isEmpty(),
  check("detalle")
    .exists().isLength({ max: 500 }).not().isEmpty(),
  check("idUsuario")
    .exists().isNumeric().isLength({ max: 11 }).not().isEmpty(),
  check("imagen")
    .exists().isLength({ max: 100 }).not().isEmpty(),
  check("visibilidad")
    .exists()
    .not()
    .isEmpty()
    .isNumeric()
    .isLength({ max: 1 }),
  check("ingredientes.*.name")
    .exists()
    .isLength({ max: 50 })
    .not()
    .isEmpty(),
  check("pasos.*.paso")
    .exists().isLength({ max: 500 }).not().isEmpty(),
  check("pasos.*.imagen")
    .optional(),
  (request, response, next) => {
    validateResult(request, response, next)
  },
]

export { validateCreate, validateReceta }
