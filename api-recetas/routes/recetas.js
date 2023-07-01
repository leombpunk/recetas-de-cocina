import { Router } from 'express'
import { validateReceta } from '../validators/recetas.js'
import { getFullRecetaById, createReceta, updateReceta, deleteReceta } from '../controllers/recetas.js'

const router = Router()

router.get('/')
router.get('/usuario/:nombreUsuario')
router.get('/receta/:nombreReceta')
router.get('/:id', getFullRecetaById)
router.post('/', validateReceta, createReceta)
router.patch('/:id',validateReceta, updateReceta)
router.delete('/:id', deleteReceta)

export { router }