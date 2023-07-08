import { Router } from 'express'
import { getUsuario, getRecetasByUserId, getRecetasVisiblesByUserId } from '../controllers/usuarios.js'
import { checkAuth, checkCoherence } from '../middlewares/auth.js'

const router = Router()

//buscar usuario (id)
//buscar todas las recetas del usuario (id)
//ver perfil (id)
//editar perfil (id)
//eliminar perfil (id)

// retorna solo las recetas visibles de un usuario
router.get('/allRecetas/:id', getRecetasVisiblesByUserId) //listar recetas de cualquier usuario -> retorna el usuario sin la pass y la lista de recetas

router.get('/perfil/:id', getUsuario) //muestra los datos del perfil (logeado) -> es redundante

//retorna todas las recetas del usuario logeado (incluso las no visibles/publicas)
router.get('/perfil/allRecetas/:id', checkAuth, checkCoherence, getRecetasByUserId) //las recetas propias (logeado) -> es redundante
router.patch('/perfil/:id', checkAuth, checkCoherence) //actualzia el perfil (logeado)
router.patch('perfil/changePass/', checkAuth, checkCoherence) //actualizar la contraseña
router.delete('/perfil/:id', checkAuth, checkCoherence) //borra el perfil, que pasa con las recetas? (logeado)

export { router }