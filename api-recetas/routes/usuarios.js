import { Router } from 'express'
import { getUsuario, getRecetasByUserId, getRecetasVisiblesByUserId, updateUsuario, deleteUsuario, updateUsuarioPass } from '../controllers/usuarios.js'
import { checkAuth, checkCoherence } from '../middlewares/auth.js'
import { validateUsuario, validatePass } from '../validators/usuarios.js'

const router = Router()

// retorna solo las recetas visibles de un usuario
//listar recetas de cualquier usuario -> retorna el usuario sin la pass y la lista de recetas 
router.get('/allRecetas/:id', getRecetasVisiblesByUserId) //TESTEADO

//muestra los datos del perfil
router.get('/perfil/:id', getUsuario) //TESTEADO

//retorna todas las recetas del usuario logeado (incluso las no visibles/publicas)
//las recetas propias (logeado)
router.get('/perfil/allRecetas/:id', checkAuth, checkCoherence, getRecetasByUserId) //TESTEADO

//actualzia el perfil (logeado)
router.patch('/perfil/:id', checkAuth, checkCoherence, validateUsuario, updateUsuario) //TESTEADO

//actualizar la contraseña
router.patch('/perfil/changePass/', checkAuth, checkCoherence, validatePass, updateUsuarioPass) //TESTEAR ENDPOINT

//borra el perfil, que pasa con las recetas? (logeado)
router.delete('/perfil/:id', checkAuth, checkCoherence, deleteUsuario) //TESTEAR ENDPOINT

export { router }