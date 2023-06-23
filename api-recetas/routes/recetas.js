import { Router } from 'express'
//importar controlladores y middlewares

const router = Router()

router.get('/')
router.get('/usuario/:nombreUsuario')
router.get('/receta/:nombreReceta')
router.get('/:id')
router.post('/')
router.patch('/:id')
router.delete('/:id')

export { router }