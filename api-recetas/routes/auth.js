import { Router } from 'express'
import { validateAuth, validateRegistro } from '../validators/auth.js'
import { login, registro, logout } from '../controllers/auth.js'

const router = Router()

router.post('/login', validateAuth, login)
router.post('/registro', validateRegistro, registro)
router.post('/logout')

export { router }