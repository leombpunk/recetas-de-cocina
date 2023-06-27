import { Router } from 'express'
import { validateCreate } from '../validators/unidadesMedidas.js'
import { getAll, createUnidadMedida, deleteUnidadMedida } from '../controllers/unidadesMedidas.js'

const router = Router()

router.get('/', getAll) //testear
router.post('/', validateCreate, createUnidadMedida) //testeado, a medias
router.delete('/:id', deleteUnidadMedida) //testear

export { router }