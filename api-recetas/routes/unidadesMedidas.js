import { Router } from 'express'
import { validateCreate } from '../validators/unidadesMedidas.js'
import { checkAuth } from '../middlewares/auth.js'
import { getAll, createUnidadMedida, deleteUnidadMedida } from '../controllers/unidadesMedidas.js'

const router = Router()

router.get('/', checkAuth, getAll) //testear
router.post('/', checkAuth, validateCreate, createUnidadMedida) //testeado, a medias
router.delete('/:id', checkAuth, deleteUnidadMedida) //testear

export { router }