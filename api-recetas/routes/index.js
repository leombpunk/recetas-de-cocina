import express from 'express'
import { router as recetasRouter } from './recetas.js'
import { router as usuariosRouter } from './usuarios.js'
import { router as unidadesMedidasRouter } from './unidadesMedidas.js'

const router = express.Router()

router.use('/recetas', recetasRouter)
router.use('/usuarios', usuariosRouter)
router.use('/unidadesMedidas', unidadesMedidasRouter)

router.get('*', (request, response) => {
    response.status(404)
    response.send({ error: 'Ruta no encontrada' })
})

export default router