import { Router } from 'express'
import { uploadProfileImg, uploadRecetaImg, deleteProfileImg, deleteRecetaImg } from '../controllers/imagenes.js'
import { checkAuth } from '../middlewares/auth.js'
import { checkReceta } from '../middlewares/receta.js'

const router = Router()

//para recetas
router.post('/receta/:idReceta', checkAuth, checkReceta, uploadRecetaImg)
router.delete('/receta/:idReceta/:filename', checkAuth, checkReceta, deleteRecetaImg)

//para perfil de usuario
router.post('/usuario/:username', checkAuth, uploadProfileImg) //modificar a username
router.delete('/usuario/:username', checkAuth, deleteProfileImg) //modificar a username

export { router }