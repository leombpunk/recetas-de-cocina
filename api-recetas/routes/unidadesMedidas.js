import { Router } from 'express'
import { validateCreate } from '../validators/unidadesMedidas.js'
import { createUnidadMedida } from '../controllers/unidadesMedidas.js'

const router = Router()

router.get('/')
router.post('/', validateCreate, createUnidadMedida)
router.delete('/:id')

export { router }