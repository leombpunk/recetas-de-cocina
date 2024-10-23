import { Router } from 'express'
// import { upload } from '../middlewares/almacenamiento.js'
import { uploadProfileImg, uploadRecetaImg, deleteProfileImg, deleteRecetaImg, publicFolder } from '../controllers/imagenes.js'
import { checkAuth, checkCoherence } from '../middlewares/auth.js'
import { checkReceta } from '../middlewares/receta.js'

const router = Router()

//para recetas
router.use('/public', publicFolder)
router.post('/receta/:idReceta', checkAuth, checkReceta, /*upload.single('file'),*/ uploadRecetaImg)
router.delete('/receta/:idReceta/:filename', checkAuth, checkReceta, deleteRecetaImg)

//para pasos de las recetas

//para perfil de usuario
//NOTA: cambiar id --> username
router.post('/usuario/:username', checkAuth, /*upload.single('file'),*/ uploadProfileImg) //modificar a username
router.delete('/usuario/:username', checkAuth, deleteProfileImg) //modificar a username

export { router }