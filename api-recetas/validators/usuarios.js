import { check } from 'express-validator'
import { validateResult } from '../helpers/validateResult.js'

const validateUsuario = [
  check('nombres')
    .exists()
    .not().isEmpty()
    .isLength({ min:2, max:100 }),
  check('apellidos')
    .exists()
    .not().isEmpty()
    .isLength({ min:2, max:100 }),
  check('mail')
    .exists()
    .not().isEmpty()
    .isLength({ max:50 })
    .isEmail(),
  (request, response, next) => {
    validateResult(request, response, next)
  }
]

const validatePass = [
  check('oldPassword')
    .exists()
    .not().isEmpty()
    .isLength({ min:8, max:16 }),
  check('newPassword')
    .exists()
    .not().isEmpty()
    .isLength({ min:8, max:16 }),
  (request, response, next) => {
    validateResult(request, response, next)
  }
]

const validateDelete = [
  check("borrarTodo")
    .exists()
    .not().isEmpty()
    .isBoolean(),
  (request, response, next) => {
    validateResult(request, response, next)
  }
]

export { validateUsuario, validatePass, validateDelete }