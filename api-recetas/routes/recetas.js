import { Router } from 'express'
import { validateReceta, validateCreate } from '../validators/recetas.js'
import { getFullRecetaById, getRecetasByUsername, createReceta, updateReceta, deleteReceta } from '../controllers/recetas.js'
import { checkAuth } from '../middlewares/auth.js'
import { checkReceta } from '../middlewares/receta.js'

const router = Router()

router.get('/') //deshabilitar
router.get('/usuario/:nombreUsuario', getRecetasByUsername) //nombreUsuario = usuario -> retorna la lista de recetas de un usuario especifico
router.get('/:nombreReceta') //like '%nombreReceta%' -> retorna una lista de recetas que coincida con el nombre de alguna receta
router.get('/:id', getFullRecetaById) //retorna una receta segun su ID

router.post('/', checkAuth, validateCreate, createReceta)
router.patch('/:id', checkAuth, checkReceta, validateReceta, updateReceta)
router.delete('/:id', checkAuth, checkReceta, deleteReceta)

export { router }