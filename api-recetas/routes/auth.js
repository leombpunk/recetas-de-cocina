import { Router } from 'express'
import { validateAuth, validateRegistro } from '../validators/auth.js'
import { login, registro, logout, refreshUserData, googleOAuth, callbackGoogleOAuth } from '../controllers/auth.js'
import { checkAuth } from '../middlewares/auth.js'
import passportConfig from '../config/passport.js'

const router = Router()

router.post('/login', validateAuth, login)
router.post('/registro', validateRegistro, registro) //TESTEAR ENDPOINT
router.post('/verifyToken', checkAuth, refreshUserData) //verficar si el token no expiro y si el usuario existe
// router.post('/logout') //ELIMINAR

//cositas con google 0auth
router.get('/login/google') //iniciar sesion con google (este endpoint se va a fusionar con el de abajito)
router.get('/google', passportConfig.authenticate("google", { scope: ["profile", "email"], session: false })) //registro con google
router.get('/google/callback', passportConfig.authenticate("google", { failureRedirect: "http://localhost:3000/login", session: false }), callbackGoogleOAuth) //el callback de la wea de google

export { router }