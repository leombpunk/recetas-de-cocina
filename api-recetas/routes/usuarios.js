import { Router } from 'express'
import { getRecetasByUserId } from '../controllers/usuarios.js'

const router = Router()

//buscar usuario (id)
//buscar todas las recetas del usuario (id)
//ver perfil (id)
//editar perfil (id)
//eliminar perfil (id)

router.get('/:id') //ver perfil de un usuario cualquiera
router.get('/perfil/:id') //muestra los datos del perfil (logeado)
router.get('/allRecetas/:id', getRecetasByUserId) //mejorar nombre del endpoint, buscar de caulquier usuario
router.get('/perfil/allRecetas/:id', getRecetasByUserId) //las recetas propias (logeado)
router.patch('/perfil/:id') //actualzia el perfil (logeado)
router.delete('/perfil/:id') //borra el perfil, que pasa con las recetas? (logeado)

export { router }