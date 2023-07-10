import { Router } from 'express'
import { validateAuth, validateRegistro } from '../validators/auth.js'
import { login, registro, logout } from '../controllers/auth.js'

const router = Router()

router.post('/login', validateAuth, login) //TESTEADO
router.post('/registro', validateRegistro, registro) //TESTEAR ENDPOINT
// router.post('/logout') //ELIMINAR

export { router }