import { Router } from 'express'
//importar controlladores y middlewares
import { validateReceta } from '../validators/recetas.js'
import { getFullRecetaById } from '../controllers/recetas.js'

const router = Router()

router.get('/')
router.get('/usuario/:nombreUsuario')
router.get('/receta/:nombreReceta')
router.get('/:id', getFullRecetaById)
router.post('/')
router.patch('/:id')
router.delete('/:id')

export { router }