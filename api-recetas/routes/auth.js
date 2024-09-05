import { Router } from 'express'
import { validateAuth, validateRegistro } from '../validators/auth.js'
import { login, registro, logout, refreshUserData } from '../controllers/auth.js'
import { checkAuth } from '../middlewares/auth.js'

const router = Router()

router.post('/login', validateAuth, login) //TESTEADO
router.post('/registro', validateRegistro, registro) //TESTEAR ENDPOINT
router.post('/verifyToken', checkAuth, refreshUserData) //verficar si el token no expiro y si el usuario existe
// router.post('/logout') //ELIMINAR

export { router }