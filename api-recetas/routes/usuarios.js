import { Router } from 'express'
import { getRecetasByUserId } from '../controllers/usuarios.js'

const router = Router()

router.get('/')
router.get('/allRecetas/:id', getRecetasByUserId) //mejorar nombre del endpoint
router.post('/')
router.delete('/:id')

export { router }