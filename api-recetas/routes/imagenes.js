import { Router } from 'express'
import { upload } from '../middlewares/almacenamiento.js'
import { uploadProfileImg, uploadRecetaImg, deleteProfileImg, deleteRecetaImg, publicFolder } from '../controllers/imagenes.js'
import { checkAuth, checkCoherence } from '../middlewares/auth.js'
import { checkReceta } from '../middlewares/receta.js'

const router = Router()

//para recetas
router.use('/public', publicFolder) //TESTEADO
router.post('/receta/:idReceta', checkAuth, checkReceta, upload.single('file'), uploadRecetaImg)
//agregar el nombre del archivo que se desa borrar, cre o que no haria falta ningun id mas que el token
router.delete('/receta/:idReceta/:filename', checkAuth, checkReceta, deleteRecetaImg)

//para pasos de las recetas

//para perfil de usuario
router.post('/usuario/:id', checkAuth, upload.single('file'), uploadProfileImg) //TESTEAR
router.delete('/usuario/:id', checkAuth, deleteProfileImg) //TESTEAR

//establecer una esctructura para almacenar las imagenes en local

export { router }