import { Router } from 'express'
import { upload } from '../middlewares/almacenamiento.js'
import { uploadProfileImg, uploadRecetaImg, deleteProfileImg, deleteRecetaImg, publicFolder } from '../controllers/imagenes.js'
import { checkAuth, checkCoherence } from '../middlewares/auth.js'

const router = Router()

//para recetas
router.use('/public', publicFolder) //TESTEADO

router.post('/receta/:idReceta/:idUsuario', checkAuth, upload.single('file'), uploadRecetaImg) //TESTEAR
router.delete('/receta/:idReceta/:idUsuario', checkAuth, deleteRecetaImg) //TESTEAR

//para perfil de usuario
router.post('/usuario/:id', checkAuth, upload.single('file'), uploadProfileImg) //TESTEAR
router.delete('/usuario/:id', checkAuth, deleteProfileImg) //TESTEAR

export { router }