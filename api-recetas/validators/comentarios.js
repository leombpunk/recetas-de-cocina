import { check } from "express-validator"
import { validateResult } from "../helpers/validateResult.js"

const validateCreateComentario = [
  check("comentario")
    .exists()
    .not().isEmpty()
    .isString()
    .isLength({ max: 1000 }),
  (request, response, next) => {
    validateResult(request, response, next)
  },
]

const validateCreateRespuesta = [
  check("respuesta")
    .exists()
    .not().isEmpty()
    .isString()
    .isLength({ max: 1000 }),
  check("mension") //buscar el Id a traves del username
    .exists()
    .not().isEmpty()
    .isString()
    .isLength({ max: 50 }),
  
  (request, response, next) => {
    validateResult(request, response, next)
  },
]

export { validateCreateComentario, validateCreateRespuesta }
