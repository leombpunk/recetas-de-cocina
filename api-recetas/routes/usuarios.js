import { Router } from 'express'
import { getUsuario, getRecetasByUserId, getRecetasVisiblesByUserId, updateUsuario, deleteUsuario, updateUsuarioPass } from '../controllers/usuarios.js'
import { checkAuth, checkCoherence, checkUsername } from '../middlewares/auth.js'
import { validateUsuario, validatePass } from '../validators/usuarios.js'

const router = Router()

//REVISAR QUE ENDPOINTS SE USAN Y CUALES NO, COMPARAR CON EL DE RECETAS Y ARCHIVOS

// retorna solo las recetas visibles de un usuario
//listar recetas de cualquier usuario -> retorna el usuario sin la pass y la lista de recetas 
router.get('/allRecetas/:id', getRecetasVisiblesByUserId)

//muestra los datos del perfil
router.get('/perfil/:usuario', checkUsername, getUsuario) //actualizado, agregar checkauth ya que no se puede ver un perfil?

//retorna todas las recetas del usuario logeado (incluso las no visibles/publicas)
//las recetas propias (logeado)
router.get('/perfil/allRecetas/:id', checkAuth, checkCoherence, getRecetasByUserId)

//actualzia el perfil (logeado)
router.patch('/perfil/:id', checkAuth, checkCoherence, validateUsuario, updateUsuario)

//actualizar la contraseña
router.patch('/perfil/changePass/', checkAuth, checkCoherence, validatePass, updateUsuarioPass)

//borra el perfil, que pasa con las recetas? (logeado)
router.delete('/perfil/:id', checkAuth, checkCoherence, deleteUsuario)

export { router }