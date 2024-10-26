import { Router } from 'express'
import { getUsuario, getRecetasByUserId, getRecetasVisiblesByUserId, updateUsuario, deleteUsuario, updateUsuarioPass } from '../controllers/usuarios.js'
import { checkAuth, checkCoherence, checkUsername } from '../middlewares/auth.js'
import { validateUsuario, validatePass } from '../validators/usuarios.js'

const router = Router()

//REVISAR QUE ENDPOINTS SE USAN Y CUALES NO, COMPARAR CON EL DE RECETAS Y ARCHIVOS

// retorna solo las recetas visibles de un usuario
//listar recetas de cualquier usuario -> retorna el usuario sin la pass y la lista de recetas 
// router.get('/allRecetas/:id', getRecetasVisiblesByUserId) //al dope, ya esta en la ruta recetas

//muestra los datos del perfil
router.get('/perfil/:usuario', checkUsername, getUsuario) //actualizado, agregar checkauth ya que no se puede ver un perfil?

//retorna todas las recetas del usuario logeado (incluso las no visibles/publicas)
//las recetas propias (logeado)
// router.get('/perfil/allRecetas/:id', checkAuth, checkCoherence, getRecetasByUserId) //al dope, ya esta en la ruta recetas

//actualizar la contraseña
router.put('/perfil/changePass/', checkAuth, validatePass, updateUsuarioPass)

//actualzia el perfil (logeado)
router.put('/perfil/:usuario', checkAuth, validateUsuario, updateUsuario)

//borra el perfil, que pasa con las recetas? (logeado)
router.delete('/perfil/:usuario', checkAuth, deleteUsuario)

export { router }