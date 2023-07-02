import { Router } from 'express'
import { upload } from '../middlewares/almacenamiento.js'

const router = Router()

//para recetas
router.get('/receta/') //desabilitar el getAll
router.get('/receta/:id') //renombrear a receta/public/:id
router.post('/receta/:id', upload.single('file'))
router.delete('/receta/:id')

//para perfil de usuario
router.get('/usuario/') //desabilitar el getAll
router.get('/usuario/:id') //renombrear a usuario/public/:id o este quizar no
router.post('/usuario/:id', upload.single('file'))
router.delete('/usuario/:id')

export { router }